import prismaClient from '../../prisma/index';

interface ListCategoryProductsServiceProps {
    category_id: string;
}

class ListCategoryProductsService {
    async execute({ category_id }: ListCategoryProductsServiceProps) {
        try {

            const category = await prismaClient.category.findUnique({

                where: {

                    id: category_id
                },
            });

            if (!category) {

                throw new Error("Categoria não encontrada");
            }

            
            const products = await prismaClient.product.findMany({

                where: {

                    category_id: category_id,
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
                        }
                    }

                },
                orderBy: {

                    createdAt: 'desc'
                }
            })

            return products;

        } catch (err) {
            
            if(err instanceof Error) {

                throw new Error(err.message);

            }

            throw new Error("Falha ao buscar produtos da categoria")
        }
    }
}

export { ListCategoryProductsService };
