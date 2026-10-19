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

export const removeItemSchema = z.object({
    query: z.object({
        item_id: z.string().min(1, { message: "Id do item é obrigatório e no minimo 1" }),
    }),
});

//Schema detalhes da order
export const detailOrderSchema = z.object({
    query: z.object({
        order_id: z.string().min(1, { message: "Id do pedido é obrigatório" }),
    }),
});


//Schema atualizar order
export const sendOrderSchema = z.object({

    body: z.object({

        order_id: z.string({ message: "ID do pedido precisa ser uma string"}),
        name: z.string({ message: "O nome precisa ser um texto"}),
    })
});

//Schema finalizar pedido
export const finishOrderSchema = z.object({

    body: z.object({

        order_id: z.string({ message: "ID do pedido precisa ser uma string"}),
    })
});

//Schema deletar pedido
export const deleteOrderSchema = z.object({

    query: z.object({

        order_id: z.string({ message: "ID do pedido precisa ser uma string"}),
    }),
});