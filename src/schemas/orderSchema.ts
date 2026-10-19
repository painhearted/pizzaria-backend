import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        table: z.number().int().positive({ message: "Mesa precisa ser um número inteiro positivo" }),
        name: z.string().min(1, { message: "Nome do cliente é obrigatório" }),
    }),
});


export const addItemSchema = z.object({

    body: z.object({

        amount: z.number().int().positive({ message: "A quantidade deve ser um número inteiro e positivo"}),
        order_id: z.string().min(1, { message: "Ordem deve ser uma string e no mínimo 1 caractere"}),
        product_id: z.string().min(1, { message: "Id do produto deve ser uma string e no minimo 1 caractere"}),
    })

});
