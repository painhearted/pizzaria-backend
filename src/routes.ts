import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAdmin } from './middlewares/isAdmin';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { createUserSchema, authUserSchema } from './schemas/userSchema';
import { validateSchema } from './middlewares/validateSchema';
import { createCategorySchema } from './schemas/categorySchema';
import { CreateProductController } from './controllers/products/CreateProductController';

const router = Router();
const upload = multer(uploadConfig);

//Rotas user
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

//Rota category
router.get("/category", isAuthenticated, new ListCategoryController().handle);
router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CreateCategoryController().handle);

//Rota products
router.post("/product", isAuthenticated, isAdmin, upload.single('file'), new CreateProductController().handle);


export { router };
