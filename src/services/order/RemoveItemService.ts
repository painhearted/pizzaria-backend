import prismaClient from "../../prisma";

interface RemoveItemServiceProps {
    item_id: string;
}

class RemoveItemService {
    async execute({ item_id }: RemoveItemServiceProps) {

            try {

                //Verificar se o item existe
                const itemExists = await prismaClient.item.findFirst({
                    where: {
                        id: item_id,
                    },
                });

                if (!itemExists) {
                    throw new Error("Item não encontrado!");
                }


                //Deletar o item
                await prismaClient.item.delete({

                    where: {
                    id: item_id,
                    },
                });

                //Verificando erro
                console.log(itemExists)
                return { message: "Item removido do pedido com sucesso!" };

            } catch(err) {

            throw new Error("Falha ao remover item do pedido")
            }
    }
}

export { RemoveItemService };
