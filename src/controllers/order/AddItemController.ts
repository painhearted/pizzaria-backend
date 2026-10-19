import { Request, Response } from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";


class AddItemController {

    async handle(req: Request, res: Response) {

        const { amount, order_id, product_id } = req.body;

        const addItem = new AddItemOrderService();

        const newItem = await addItem.execute({

            order_id: order_id,
            product_id: product_id,
            amount: amount,
        });

        res.status(201).json(newItem);
    }
}

export { AddItemController }