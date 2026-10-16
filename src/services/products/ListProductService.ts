import prismaClient from '../../prisma/index';

interface ListProductServiceProps {
    disabled?: string;
}

class ListProductService {
    async execute({ disabled }: ListProductServiceProps) {
        try {
            return await prismaClient.product.findMany({
                where: {
                    disabled: disabled === "true" ? true : false,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    category_id: true,
                    banner: true,
                    disabled: true,
                    createdAt: true,
                    category: {
                        
                        select: {

                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } catch (error) {
            throw new Error('Falha ao buscar produtos');
        }
    }
}

export { ListProductService };
