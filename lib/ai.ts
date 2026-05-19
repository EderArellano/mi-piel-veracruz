/**
 * AI Integration Module — Architecture prepared for future implementation
 *
 * Ready to integrate:
 * - Dermatological AI chatbot
 * - Skin analysis with computer vision
 * - Automatic treatment recommendations
 * - Skin concern classification
 */

export interface SkinAnalysisResult {
  skinType: string;
  concerns: string[];
  recommendations: string[];
  confidence: number;
  rawResponse?: Record<string, unknown>;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  requiresConsultation?: boolean;
}

const DERMATOLOGY_SYSTEM_PROMPT = `Eres un asistente especializado en dermatología estética y depilación láser
de la clínica Mi Piel Veracruz. Tu rol es:
- Responder preguntas sobre depilación láser, cuidado de la piel y tratamientos
- Dar información general sobre los servicios de la clínica
- Recomendar agendar una consulta para casos complejos
- Nunca diagnosticar condiciones médicas graves
- Siempre recomendar consulta presencial para casos específicos
Responde siempre en español de manera amable, profesional y empática.`;

// Placeholder — will be implemented with Anthropic SDK when AI feature is activated
export async function analyzeSkin(
  _imageUrl: string,
  _userId?: string
): Promise<SkinAnalysisResult> {
  throw new Error("AI skin analysis not yet implemented. Architecture ready.");
}

export async function chatWithDermatologyBot(
  _messages: ChatMessage[],
  _userId?: string
): Promise<ChatResponse> {
  throw new Error("AI chatbot not yet implemented. Architecture ready.");
}

export { DERMATOLOGY_SYSTEM_PROMPT };
