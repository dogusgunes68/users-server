import { Router } from "express";
import { validateBody } from "../middleware/validate-request";
import {
  userCreateValidation,
  userUpdateValidation,
} from "../validation/validate-use-req";
import { UserController } from "../controller/user-controller";

const router = Router();

const userController = new UserController();

router.get("/", userController.search);
router.get("/:id", userController.getById);
router.post("/save", validateBody(userCreateValidation), userController.create);
router.put(
  "/:id",
  validateBody(userUpdateValidation),
  userController.updateById
);

export { router as userRouter };
