import { Router } from "express";
import crud from "../../model/crud.mjs";
import auth from "../../helper/auth_helper.mjs";
const route = Router();

export default (app) => {
  app.use('/master/categories', route);
  const collection = 'm_categories';

  /* Get One */
  route.get("/:id", async (req, res)=>{
    let d = await crud.getOne(collection,req.params.id);
    res.send(d);
  });

  /* Get All */
  route.get("/", async (req, res)=>{
    let d = await crud.getAll(collection,req.query);
    res.send(d);
  });

  /* Insert */
  route.post("/", auth(), async (req, res)=>{
    let data = req.body;
    let d = await crud.insert(collection,data);
    res.send(d);
  });

  /* Update */
  route.patch("/:id", auth(), async (req, res)=>{
    let data = req.body;
    let d = await crud.update(collection,data,req.params.id);
    res.send(d);
  });

  /* Push */
  route.put("/:id", auth(), async (req, res)=>{
    let data = req.body;
    let d = await crud.put(collection,data,req.params.id);
    res.send(d);
  });

  /* Delete */
  route.delete("/:id", auth(), async (req, res)=>{
    let d = await crud.delete(collection,req.params.id);
    res.send(d);
  });

}