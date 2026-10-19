import prismaClient from "../../prisma";

interface DetailOrderServiceProps {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailOrderServiceProps) {
        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id,
            },
            select: {
                id: true,
                table: true,
                name: true,
                status: true,
                draft: true,
                createdAt: true,
                updateAt: true,
                items: {
                    select: {
                        id: true,
                        amount: true,
                        createdAt: true,
                        updateAt: true,
                        order_id: true,
                        product_id: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                description: true,
                                banner: true,
                                disabled: true,
                                category_id: true,
                            },
                        },
                    },
                },
            },
        });

        if (!order) {
            throw new Error("Pedido não encontrado!");
        }

        return order;
    }
}

export { DetailOrderService };
