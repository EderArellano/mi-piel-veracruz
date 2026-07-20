"use client";

import { useState } from "react";
import { Gift, Copy, Check, Share2, MessageCircle, Users, Banknote } from "lucide-react";

interface Props {
  userName: string;
  referralCode: string;
  referralLink: string;
  waLink: string;
  referralCount: number;
  totalReward: number;
}

export function ReferidosClient({ referralCode, referralLink, waLink, referralCount, totalReward }: Props) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const copy = async (text: string, which: "code" | "link") => {
    await navigator.clipboard.writeText(text);
    if (which === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const share = async () => {
    const data = {
      title: "Mi Piel — Depilación Láser Veracruz",
      text: `¡Hola! Te recomiendo Mi Piel Centro Dermocosmético para depilación láser. Usa mi código ${referralCode} y ambas ganamos $150 MXN de descuento.`,
      url: referralLink,
    };
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await copy(referralLink, "link");
    }
  };

  const steps = [
    "Comparte tu código o enlace con una amiga, hermana o conocida.",
    "Ella agenda y completa su primera cita en Mi Piel.",
    "¡Ambas reciben $150 MXN de descuento en su próxima sesión!",
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
          style={{ background: "linear-gradient(135deg, #5F7C71, #4a6158)" }}
        >
          <Gift className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "#2B2B2B" }}>
          Programa de Referidos
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6F6F6F" }}>
          Recomienda Mi Piel y gana $150 MXN por cada amiga que venga
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="rounded-2xl p-5 text-center"
          style={{ background: "#F4F7F5", border: "1px solid #E0EAE6" }}
        >
          <Users className="w-5 h-5 mx-auto mb-2" style={{ color: "#5F7C71" }} />
          <p className="text-3xl font-black" style={{ color: "#5F7C71" }}>{referralCount}</p>
          <p className="text-xs mt-1" style={{ color: "#6F6F6F" }}>Referidas</p>
        </div>
        <div
          className="rounded-2xl p-5 text-center"
          style={{ background: "#FBF7EE", border: "1px solid #EAE0CA" }}
        >
          <Banknote className="w-5 h-5 mx-auto mb-2" style={{ color: "#C8A96A" }} />
          <p className="text-3xl font-black" style={{ color: "#C8A96A" }}>
            ${totalReward.toLocaleString("es-MX")}
          </p>
          <p className="text-xs mt-1" style={{ color: "#6F6F6F" }}>Recompensas MXN</p>
        </div>
      </div>

      {/* Referral code */}
      <div
        className="rounded-2xl p-5 space-y-3"
        style={{ background: "white", border: "1px solid #E7E3DC", boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9A9A9A" }}>Tu código</p>
        <div className="flex items-center gap-3">
          <div
            className="flex-1 text-center py-3 px-4 rounded-xl font-mono text-xl font-black tracking-widest"
            style={{ background: "#F4F7F5", color: "#5F7C71", border: "1.5px dashed #C4D4CF" }}
          >
            {referralCode}
          </div>
          <button
            onClick={() => copy(referralCode, "code")}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all"
            style={{
              background: copiedCode ? "#5F7C71" : "#EAF0ED",
              color: copiedCode ? "white" : "#5F7C71",
            }}
          >
            {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedCode ? "¡Copiado!" : "Copiar"}
          </button>
        </div>

        <div
          className="flex items-center gap-2 p-3 rounded-xl text-xs truncate"
          style={{ background: "#FAFAF8", border: "1px solid #E7E3DC", color: "#9A9A9A" }}
        >
          <span className="truncate flex-1">{referralLink}</span>
          <button
            onClick={() => copy(referralLink, "link")}
            className="shrink-0 transition-colors"
            style={{ color: copiedLink ? "#5F7C71" : "#BDBDBD" }}
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={share}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5"
          style={{ background: "#5F7C71", color: "white", boxShadow: "0 4px 16px rgba(95,124,113,.25)" }}
        >
          <Share2 className="w-4 h-4" />
          Compartir enlace
        </button>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5"
          style={{ background: "#22c55e", color: "white", boxShadow: "0 4px 16px rgba(34,197,94,.25)" }}
        >
          <MessageCircle className="w-4 h-4" />
          Invitar por WhatsApp
        </a>
      </div>

      {/* How it works */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid #E7E3DC" }}
      >
        <p className="text-sm font-semibold mb-4" style={{ color: "#2B2B2B" }}>¿Cómo funciona?</p>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: "#5F7C71", color: "white" }}
              >
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Terms note */}
      <p className="text-center text-xs" style={{ color: "#BDBDBD" }}>
        Descuento aplicable en la siguiente sesión tras completar la primera cita de la referida.
        <br />Sin fecha de expiración · Acumulable · Solo nuevas pacientes.
      </p>
    </div>
  );
}
