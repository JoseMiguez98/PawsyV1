import { z } from "zod";

export const reportFormSchema = z.object({
  type: z.enum(["lost", "found", "adoption"]),
  species: z.enum(["dog", "cat", "other"]),
  breed: z.string().optional(),
  color: z.string().min(2, { message: "El color es obligatorio" }),
  size: z.enum(["small", "medium", "large"]),
  address: z.string().min(5, { message: "La ubicación es obligatoria" }),
  date: z.string().min(5, { message: "La fecha es obligatoria" }),
  time: z.string().min(4, { message: "La hora es obligatoria" }),
  description: z.string().optional(),
});

export type ReportFormValues = z.infer<typeof reportFormSchema>;
