import { Router } from "express";
import { UsuarioRoutes } from "./Usuario";
import { CuentaRoutes } from "./Cuenta";
import { RolRoutes } from "./Rol";
import { config } from "@/utils";

const mainRouter = Router();
config.Constants.ROUTES;
mainRouter.use(config.Constants.ROUTES.USUARIO, UsuarioRoutes);
mainRouter.use(config.Constants.ROUTES.CUENTA, CuentaRoutes);
mainRouter.use(config.Constants.ROUTES.ROL, RolRoutes);

export { mainRouter as MainRoutes };
