import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, fmt = "d 'de' MMMM, yyyy") {
  return format(new Date(date), fmt, { locale: es });
}

export function formatTime(date: Date | string) {
  return format(new Date(date), "HH:mm", { locale: es });
}

export function formatDateTime(date: Date | string) {
  return format(new Date(date), "d MMM yyyy, HH:mm", { locale: es });
}

export function formatRelative(date: Date | string) {
  return formatDistanceToNow(new Date(date), { locale: es, addSuffix: true });
}

export function formatCurrency(amount: number, currency = "MXN") {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function generateReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export const APPOINTMENT_STATUSES = {
  PENDING: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { label: "Confirmada", color: "bg-blue-100 text-blue-800" },
  IN_PROGRESS: { label: "En progreso", color: "bg-purple-100 text-purple-800" },
  COMPLETED: { label: "Completada", color: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Cancelada", color: "bg-red-100 text-red-800" },
  NO_SHOW: { label: "No se presentó", color: "bg-gray-100 text-gray-800" },
  RESCHEDULED: { label: "Reagendada", color: "bg-orange-100 text-orange-800" },
} as const;

export const SERVICE_CATEGORIES = {
  FACIAL: "Facial",
  LEGS: "Piernas",
  ARMPITS: "Axilas",
  BIKINI: "Bikini",
  FULL_BODY: "Cuerpo completo",
  MENS: "Hombres",
  PACKAGE: "Paquete",
  OTHER: "Otro",
} as const;
