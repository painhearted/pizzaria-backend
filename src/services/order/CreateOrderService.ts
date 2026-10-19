import prismaClient from '../../prisma/index';

interface CreateOrderServiceProps {
    table: number;
    name: string;
}

class CreateOrderService {
    async execute({ table, name }: CreateOrderServiceProps) {

        try {
            return await prismaClient.order.create({
                data: {
                    table: table,
                    name: name ?? ""
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    status: true,
                    draft: true,
                    createdAt: true,
                },
            });
            
        } catch (error) {
            throw new Error('Falha ao criar pedido');
        }
    }
}

export { CreateOrderService };
