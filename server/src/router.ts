import { Router } from "express";
import { settingValidators, validate } from "./modules/validators";
import {
  updateSettings,
  createSettings,
  getSettings,
} from "./handlers/settings";
// import { body } from "express-validator";

const router = Router();

/* 
    Settings
*/
router.get("/settings", getSettings);
router.post("/settings", settingValidators, validate, createSettings);
router.put("/settings/:id", settingValidators, validate, updateSettings);

export default router;
