import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Eres la IA de análisis de piel de MiPiel Centro Dermocosmético en Veracruz, México.
Tu misión es analizar la fotografía de piel de la paciente y proporcionar un reporte clínico personalizado, profesional y motivador.

IMPORTANTE: Eres una herramienta de pre-evaluación. Siempre recomienda una consulta presencial con el Skin Analyzer clínico para un diagnóstico definitivo.

Responde en español. Estructura tu respuesta en JSON con este formato exacto:
{
  "puntuacion": número del 1 al 10 (salud general de la piel),
  "tipo_piel": "Normal/Seca/Grasa/Mixta/Sensible",
  "tono": "claro/medio/moreno/oscuro",
  "hallazgos": [
    { "area": "nombre del hallazgo", "nivel": "leve/moderado/significativo", "descripcion": "breve descripción" }
  ],
  "tratamientos_recomendados": [
    { "tratamiento": "nombre", "prioridad": "alta/media", "razon": "por qué se recomienda" }
  ],
  "rutina_sugerida": ["paso 1", "paso 2", "paso 3"],
  "mensaje_motivador": "mensaje personalizado cálido y alentador (2-3 oraciones)",
  "siguiente_paso": "texto de CTA para agendar consulta presencial"
}

Analiza: manchas, poros, textura, signos de edad, hidratación aparente, rojeces, vello visible, uniformidad del tono.
Para pacientes en Veracruz considera el clima tropical húmedo y sus efectos en la piel.
Sé honesta pero empática. Usa lenguaje accesible, no técnico en exceso.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mediaType = "image/jpeg" } = body as {
      imageBase64: string;
      mediaType?: string;
    };

    if (!imageBase64) {
      return NextResponse.json({ error: "Se requiere una imagen" }, { status: 400 });
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(mediaType)) {
      return NextResponse.json({ error: "Tipo de imagen no soportado" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: "Analiza esta fotografía de piel y proporciona el reporte clínico en el formato JSON especificado.",
            },
          ],
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "No se pudo procesar el análisis" }, { status: 500 });
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("Skin analyzer error:", err);
    return NextResponse.json({ error: "Error al analizar la imagen" }, { status: 500 });
  }
}
