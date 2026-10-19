import { z } from 'zod';

export const listCategoryProductsSchema = z.object({
    query: z.object({
        category_id: z.string().min(1, { message: 'O id da categoria é obrigatório' }),
    }),
});
