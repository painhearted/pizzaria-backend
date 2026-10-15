import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { validateSchema } from './middlewares/validateSchema';
import { createUserSchema, authUserSchema } from './schemas/userSchema';
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAdmin } from './middlewares/isAdmin';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';

const router = Router();

//Rotas usuários
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

//Rota category
router.post("/category", isAuthenticated, isAdmin, new CreateCategoryController().handle);


export { router };

