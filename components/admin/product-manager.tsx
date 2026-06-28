"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, Star, Package, Eye, EyeOff,
  Search, X, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import type { Product, ProductCategory } from "@prisma/client";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "SKINCARE", label: "Skincare" },
  { value: "COSMETICOS", label: "Cosméticos" },
  { value: "SUPLEMENTOS", label: "Suplementos" },
  { value: "KITS", label: "Kits" },
  { value: "ACCESORIOS", label: "Accesorios" },
];

const catLabel = (c: ProductCategory) => CATEGORIES.find((x) => x.value === c)?.label ?? c;

const catColor: Record<string, string> = {
  SKINCARE: "#5F7C71",
  COSMETICOS: "#C8A96A",
  SUPLEMENTOS: "#4F83CC",
  KITS: "#9B7B5B",
  ACCESORIOS: "#7C3AED",
};

const emptyForm = {
  name: "",
  slug: "",
  shortDesc: "",
  description: "",
  price: "",
  comparePrice: "",
  category: "SKINCARE" as ProductCategory,
  brand: "",
  stock: "0",
  isActive: true,
  isFeatured: false,
  tags: "",
  benefits: "",
  ingredients: "",
  howToUse: "",
  images: "",
};

type FormData = typeof emptyForm;

function slugify(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

interface Props { initialProducts: Product[] }

export function ProductManager({ initialProducts }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<ProductCategory | "">("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.brand ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      slug: p.slug,
      shortDesc: p.shortDesc ?? "",
      description: p.description ?? "",
      price: String(p.price),
      comparePrice: p.comparePrice ? String(p.comparePrice) : "",
      category: p.category,
      brand: p.brand ?? "",
      stock: String(p.stock),
      isActive: p.isActive,
      isFeatured: p.isFeatured,
      tags: p.tags.join(", "),
      benefits: p.benefits.join("\n"),
      ingredients: p.ingredients ?? "",
      howToUse: p.howToUse ?? "",
      images: p.images.join("\n"),
    });
    setShowModal(true);
  };

  const handleField = (key: keyof FormData, val: string | boolean) => {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === "name" && !editing) next.slug = slugify(String(val));
      return next;
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.price) return;
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      shortDesc: form.shortDesc.trim() || undefined,
      description: form.description.trim() || undefined,
      price: parseFloat(form.price),
      comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : null,
      category: form.category,
      brand: form.brand.trim() || undefined,
      stock: parseInt(form.stock) || 0,
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      benefits: form.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
      ingredients: form.ingredients.trim() || undefined,
      howToUse: form.howToUse.trim() || undefined,
      images: form.images.split("\n").map((i) => i.trim()).filter(Boolean),
    };

    try {
      const url = editing ? `/api/products/${editing.id}` : "/api/products";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

      if (!res.ok) {
        const err = await res.json();
        showToast(err.error ?? "Error al guardar", false);
        return;
      }

      const saved: Product = await res.json();
      setProducts((prev) => editing ? prev.map((p) => p.id === saved.id ? saved : p) : [saved, ...prev]);
      setShowModal(false);
      showToast(editing ? "Producto actualizado" : "Producto creado");
      startTransition(() => router.refresh());
    } catch {
      showToast("Error de conexión", false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Producto eliminado");
      startTransition(() => router.refresh());
    } catch {
      showToast("Error al eliminar", false);
    } finally {
      setDeleting(null);
    }
  };

  const toggleActive = async (p: Product) => {
    const res = await fetch(`/api/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !p.isActive }),
    });
    if (res.ok) {
      const updated: Product = await res.json();
      setProducts((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    }
  };

  const toggleFeatured = async (p: Product) => {
    const res = await fetch(`/api/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !p.isFeatured }),
    });
    if (res.ok) {
      const updated: Product = await res.json();
      setProducts((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium"
          style={{ background: toast.ok ? "#5F7C71" : "#D9534F", color: "white" }}
        >
          {toast.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Productos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{products.length} productos registrados</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[18px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "#5F7C71", boxShadow: "0 8px 20px rgba(95,124,113,.2)" }}
        >
          <Plus className="w-4 h-4" />
          Nuevo producto
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:border-[#5F7C71] focus:ring-2 focus:ring-[#5F7C71]/15 transition-all"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value as ProductCategory | "")}
          className="h-11 px-4 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:border-[#5F7C71] transition-all"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {/* Products list */}
      {filtered.length === 0 ? (
        <div className="card-premium p-16 text-center">
          <Package className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No hay productos que coincidan</p>
          <button onClick={openCreate} className="mt-4 text-sm font-semibold text-[#5F7C71] hover:underline">Crear el primero</button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className="card-premium p-4 flex items-center gap-4">
              {/* Image or placeholder */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-xl overflow-hidden"
                style={{ background: `${catColor[p.category]}15`, border: `1px solid ${catColor[p.category]}25` }}
              >
                {p.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Package className="w-6 h-6" style={{ color: catColor[p.category] }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-foreground text-sm truncate">{p.name}</p>
                  {p.isFeatured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#C8A96A20", color: "#A07840", border: "1px solid #C8A96A40" }}>⭐ Destacado</span>}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${catColor[p.category]}15`, color: catColor[p.category] }}>
                    {catLabel(p.category)}
                  </span>
                  {p.brand && <span className="text-xs text-muted-foreground">{p.brand}</span>}
                  <span className="text-xs text-muted-foreground">Stock: {p.stock}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0 hidden sm:block">
                <div className="font-bold text-foreground text-sm">${p.price.toLocaleString("es-MX")}</div>
                {p.comparePrice && (
                  <div className="text-xs text-muted-foreground line-through">${p.comparePrice.toLocaleString("es-MX")}</div>
                )}
                <div className="text-[10px] text-muted-foreground">MXN</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => toggleFeatured(p)} title="Destacar" className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-amber-50">
                  <Star className={`w-4 h-4 ${p.isFeatured ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`} />
                </button>
                <button onClick={() => toggleActive(p)} title={p.isActive ? "Desactivar" : "Activar"} className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-muted">
                  {p.isActive ? <Eye className="w-4 h-4 text-[#5F7C71]" /> : <EyeOff className="w-4 h-4 text-muted-foreground/40" />}
                </button>
                <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-primary/8">
                  <Pencil className="w-4 h-4 text-[#5F7C71]" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-red-50"
                >
                  {deleting === p.id ? <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /> : <Trash2 className="w-4 h-4 text-red-400" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(43,43,43,.45)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-border sticky top-0 bg-white rounded-t-3xl z-10">
              <h2 className="font-display text-xl font-bold text-foreground">
                {editing ? "Editar producto" : "Nuevo producto"}
              </h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-7 space-y-5">
              {/* Name + Slug */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Nombre *</label>
                  <input value={form.name} onChange={(e) => handleField("name", e.target.value)} placeholder="Sérum Vitamina C" className="mp-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Slug *</label>
                  <input value={form.slug} onChange={(e) => handleField("slug", e.target.value)} placeholder="serum-vitamina-c" className="mp-input font-mono text-xs" />
                </div>
              </div>

              {/* Category + Brand */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Categoría *</label>
                  <select value={form.category} onChange={(e) => handleField("category", e.target.value as ProductCategory)} className="mp-input">
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Marca</label>
                  <input value={form.brand} onChange={(e) => handleField("brand", e.target.value)} placeholder="MiPiel Lab" className="mp-input" />
                </div>
              </div>

              {/* Price + Compare + Stock */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Precio * (MXN)</label>
                  <input type="number" value={form.price} onChange={(e) => handleField("price", e.target.value)} placeholder="450" className="mp-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Precio antes</label>
                  <input type="number" value={form.comparePrice} onChange={(e) => handleField("comparePrice", e.target.value)} placeholder="600" className="mp-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Stock</label>
                  <input type="number" value={form.stock} onChange={(e) => handleField("stock", e.target.value)} placeholder="10" className="mp-input" />
                </div>
              </div>

              {/* Short desc */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Descripción corta</label>
                <input value={form.shortDesc} onChange={(e) => handleField("shortDesc", e.target.value)} placeholder="Hidratación profunda con vitamina C estabilizada" className="mp-input" maxLength={200} />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Descripción completa</label>
                <textarea value={form.description} onChange={(e) => handleField("description", e.target.value)} placeholder="Descripción detallada del producto..." rows={3} className="mp-input resize-none" />
              </div>

              {/* Benefits */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Beneficios (uno por línea)</label>
                <textarea value={form.benefits} onChange={(e) => handleField("benefits", e.target.value)} placeholder={"Hidrata en profundidad\nReduce manchas\nProtege la barrera cutánea"} rows={3} className="mp-input resize-none" />
              </div>

              {/* Images */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">URLs de imágenes (una por línea)</label>
                <textarea value={form.images} onChange={(e) => handleField("images", e.target.value)} placeholder={"https://ejemplo.com/imagen1.jpg\nhttps://ejemplo.com/imagen2.jpg"} rows={2} className="mp-input resize-none font-mono text-xs" />
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Tags (separados por coma)</label>
                <input value={form.tags} onChange={(e) => handleField("tags", e.target.value)} placeholder="vitamina-c, hidratación, antiedad" className="mp-input" />
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => handleField("isActive", !form.isActive)}
                    className="w-10 h-6 rounded-full relative transition-colors duration-200"
                    style={{ background: form.isActive ? "#5F7C71" : "#E7E3DC" }}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.isActive ? "left-5" : "left-1"}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Activo</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => handleField("isFeatured", !form.isFeatured)}
                    className="w-10 h-6 rounded-full relative transition-colors duration-200"
                    style={{ background: form.isFeatured ? "#C8A96A" : "#E7E3DC" }}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.isFeatured ? "left-5" : "left-1"}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Destacado en inicio</span>
                </label>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-7 pb-7 pt-4 border-t border-border">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-[18px] text-sm font-semibold border border-border text-muted-foreground hover:bg-muted transition-all">
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.slug || !form.price}
                className="flex items-center gap-2 px-6 py-2.5 rounded-[18px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#5F7C71" }}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear producto"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mp-input {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 14px;
          border: 1px solid #E7E3DC;
          background: #FAFAF8;
          font-size: 14px;
          color: #2B2B2B;
          transition: all 180ms ease-out;
          outline: none;
          display: block;
        }
        textarea.mp-input {
          height: auto;
          padding: 12px 14px;
        }
        select.mp-input {
          appearance: auto;
        }
        .mp-input:focus {
          border-color: #5F7C71;
          box-shadow: 0 0 0 4px rgba(95,124,113,.15);
          background: white;
        }
        .mp-input::placeholder {
          color: #9A9A9A;
        }
      `}</style>
    </div>
  );
}
