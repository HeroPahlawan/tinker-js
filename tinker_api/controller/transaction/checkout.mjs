import { Router } from "express";
import crud from "../../model/crud.mjs";
import auth from "../../helper/auth_helper.mjs";
import mail from "../../helper/mail_helper.mjs";
const route = Router();

export default (app) => {
  app.use('/transaction/checkout', route);
  const collection = 't_transaction';
  const inventory = 't_inventory';
  const branches = 'm_branches';

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
  route.post("/", async (req, res)=>{
    let data = req.body;
    let m = {};let det='';
    if (data.trstatus=='1') {
      let br = await crud.getOne(branches,data.branch);
      m.to=br.data.email;
      m.subj='InShopper Notification for ShopperAdmin';
      m.text='<p>Hi, pesanan baru telah masuk dengan detail sebagai berikut, mohon agar diproses dan selesaikan status :</p>';
      m.data=data;
      mail(m);
    }
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