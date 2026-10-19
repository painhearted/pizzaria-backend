import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        table: z.number().int().positive({ message: "Mesa precisa ser um número inteiro positivo" }),
        name: z.string().min(1, { message: "Nome do cliente é obrigatório" }),
    }),
});
