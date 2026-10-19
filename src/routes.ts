import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { ListCategoryProductsController } from './controllers/category/ListCategoryProductsController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateProductController } from './controllers/products/CreateProductController';
import { ListProductController } from './controllers/products/ListProductController';
import { isAdmin } from './middlewares/isAdmin';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { createUserSchema, authUserSchema } from './schemas/userSchema';
import { validateSchema } from './middlewares/validateSchema';
import { createCategorySchema } from './schemas/categorySchema';
import { createProductSchema } from './schemas/productSchema';
import { listProductSchema } from './schemas/listProductSchema';
import { listCategoryProductsSchema } from './schemas/listCategoryProductsSchema';
import { DeleteProductController } from './controllers/products/DeleteProductController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { createOrderSchema } from './schemas/orderSchema';
import { ListOrdersController } from './controllers/order/ListOrdersController';

const router = Router();
const upload = multer(uploadConfig);

//Rotas user
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

//Rota category
router.get("/category", isAuthenticated, new ListCategoryController().handle);
router.get("/category/product", isAuthenticated, validateSchema(listCategoryProductsSchema), new ListCategoryProductsController().handle);
router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CreateCategoryController().handle);

//Rota products
router.get("/products", isAuthenticated, validateSchema(listProductSchema), new ListProductController().handle);
router.post("/product", isAuthenticated, isAdmin, upload.single('file'), validateSchema(createProductSchema), new CreateProductController().handle);


//Rota deletar
router.delete("/product", isAuthenticated, isAdmin, new DeleteProductController().handle);

//Rota order
router.post("/order", isAuthenticated, validateSchema(createOrderSchema), new CreateOrderController().handle);
router.get("/orders", isAuthenticated, new ListOrdersController().handle);
export { router };
