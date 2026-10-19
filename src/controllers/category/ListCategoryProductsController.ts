import { Request, Response } from 'express';
import { ListCategoryProductsService } from '../../services/products/ListCategoryProductsService';

class ListCategoryProductsController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string
        const listCategoryProducts = new ListCategoryProductsService();
        const products = await listCategoryProducts.execute({

            category_id: category_id,
        });

        return res.status(200).json(products);
    }
}

export { ListCategoryProductsController };
