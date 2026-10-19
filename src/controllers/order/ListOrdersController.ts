import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrderService'


class ListOrdersController {

    async handle(req: Request, res: Response ){

        const draft = typeof req.query?.draft === "string" ? req.query.draft : undefined;


        const listOrders = new ListOrdersService();

        const orders = await listOrders.execute({
            
            draft: draft,
        });

        res.json(orders)
    }


}

export { ListOrdersController }