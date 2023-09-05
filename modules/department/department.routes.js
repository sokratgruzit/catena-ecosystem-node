import { Router } from "express";
import * as departmentController from "./department.controller.js";

const router = Router();

router.route("/create").post(departmentController.create);
router.route("/get-all-department").get(departmentController.getAllDepartment);
router.route("/update-active-status").put(departmentController.updateActiveStatus);
router.route("/get-active-departments").get(departmentController.getDepartmentWithActiveStatus);
router.route("/delete").put(departmentController.deleteOne);
router.route("/update-department").post(departmentController.updateDepartment);
router.route("/get-one-department").post(departmentController.getOneDepartment);

export default router;