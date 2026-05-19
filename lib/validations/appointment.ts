import { z } from "zod";

export const createAppointmentSchema = z.object({
  serviceId: z.string().min(1, "Selecciona un servicio"),
  employeeId: z.string().optional(),
  startTime: z.string().datetime(),
  notes: z.string().max(500).optional(),
});

export const updateAppointmentSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW", "RESCHEDULED"]).optional(),
  startTime: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
  internalNotes: z.string().max(1000).optional(),
  employeeId: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
