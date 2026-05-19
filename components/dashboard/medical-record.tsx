"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Loader2, Bot, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { MedicalRecord, SkinPhoto, TreatmentLog } from "@prisma/client";

type RecordWithTreatments = (MedicalRecord & { treatments: TreatmentLog[] }) | null;

interface MedicalRecordViewProps {
  record: RecordWithTreatments;
  photos: SkinPhoto[];
  userId: string;
}

const PHOTO_CATEGORIES = [
  { value: "BEFORE", label: "Antes", color: "bg-blue-100 text-blue-700" },
  { value: "AFTER", label: "Después", color: "bg-emerald-100 text-emerald-700" },
  { value: "PROGRESS", label: "Progreso", color: "bg-violet-100 text-violet-700" },
  { value: "SKIN_CONCERN", label: "Zona a tratar", color: "bg-amber-100 text-amber-700" },
  { value: "GENERAL", label: "General", color: "bg-gray-100 text-gray-700" },
];

export function MedicalRecordView({ record, photos, userId }: MedicalRecordViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("GENERAL");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredPhotos = activeFilter
    ? photos.filter((p) => p.category === activeFilter)
    : photos;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", selectedCategory);

    const res = await fetch("/api/skin-photos", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      toast({ variant: "destructive", title: "Error al subir la imagen" });
    } else {
      toast({ title: "Foto guardada en tu expediente" });
    }

    setIsUploading(false);
    e.target.value = "";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi Expediente Médico</h1>
        <p className="text-muted-foreground mt-1">
          Historial fotográfico y seguimiento de tu tratamiento
        </p>
      </div>

      {/* Record info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card-premium p-6">
          <div className="text-3xl font-bold text-primary mb-1">{record?.totalSessions || 0}</div>
          <div className="text-sm text-muted-foreground">Sesiones realizadas</div>
        </div>
        <div className="card-premium p-6">
          <div className="text-3xl font-bold text-amber-500 mb-1">{photos.length}</div>
          <div className="text-sm text-muted-foreground">Fotos en tu expediente</div>
        </div>
        <div className="card-premium p-6">
          <div className="text-3xl font-bold text-emerald-500 mb-1">
            {record?.skinType?.replace("TYPE_", "Tipo ") || "–"}
          </div>
          <div className="text-sm text-muted-foreground">Fototipo de piel</div>
        </div>
      </div>

      {/* Photo upload section */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-foreground">Fotografías</h2>
            <p className="text-sm text-muted-foreground">
              Sube fotos de seguimiento para documentar tu progreso
            </p>
          </div>

          {/* Upload button */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
            <Button variant="premium" size="sm" asChild>
              <span>
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Subir foto
              </span>
            </Button>
          </label>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium text-muted-foreground self-center">
            Categoría:
          </span>
          {PHOTO_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                selectedCategory === cat.value
                  ? cat.color + " ring-2 ring-offset-1 ring-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-border/50">
          <Button
            variant={activeFilter === null ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter(null)}
          >
            Todas ({photos.length})
          </Button>
          {PHOTO_CATEGORIES.map((cat) => {
            const count = photos.filter((p) => p.category === cat.value).length;
            if (count === 0) return null;
            return (
              <Button
                key={cat.value}
                variant={activeFilter === cat.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(cat.value)}
              >
                {cat.label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Photos grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Sin fotografías</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Sube fotos para documentar tu progreso y compartirlas con tu especialista
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, i) => {
              const catInfo = PHOTO_CATEGORIES.find((c) => c.value === photo.category);
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative rounded-2xl overflow-hidden aspect-square bg-muted group cursor-pointer"
                >
                  <Image
                    src={photo.url}
                    alt={photo.notes || "Foto de piel"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                    <Badge className={`text-xs ${catInfo?.color}`}>
                      {catInfo?.label}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Analysis - future */}
      <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-3">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">Análisis de piel con IA</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Próximamente podrás obtener análisis automático de tu piel, recomendaciones personalizadas
          y seguimiento inteligente de tu progreso.
        </p>
        <Badge variant="default" className="mt-3">Próximamente</Badge>
      </div>

      {/* Treatment log */}
      {record?.treatments && record.treatments.length > 0 && (
        <div className="card-premium p-6">
          <h2 className="font-bold text-foreground mb-5">Registro de tratamientos</h2>
          <div className="space-y-3">
            {record.treatments.map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">#{t.sessionNumber}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">{t.zone}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(t.performedAt).toLocaleDateString("es-MX", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </div>
                </div>
                {t.observations && (
                  <p className="text-xs text-muted-foreground max-w-xs hidden md:block">
                    {t.observations}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
