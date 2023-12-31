import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "../shared/router/router";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  // Declarated all routes from user entity
  routes(): void {
    this.router.get("/user", (req, res) => this.controller.getUsers(req, res));
  }
}
