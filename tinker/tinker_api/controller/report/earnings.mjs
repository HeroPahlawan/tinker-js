import { Router } from "express";
import crud from "../../model/crud.mjs";
import auth from "../../helper/auth_helper.mjs";
import mail from "../../helper/mail_helper.mjs";
const route = Router();

export default (app) => {
  app.use('/transaction/booking', route);
  const collection = 't_booking';
  const company = 'm_company';

  /* Get One */
  route.get("/:id", auth(), async (req, res)=>{
    let d = await crud.getOne(collection,req.params.id);
    res.send(d);
  });

  /* Get All */
  route.get("/", auth(), async (req, res)=>{
    let d = await crud.getAll(collection,req.query);
    res.send(d);
  });
}