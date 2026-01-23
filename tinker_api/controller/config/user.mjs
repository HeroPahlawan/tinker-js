import { Router } from "express";
import crud from "../../model/crud.mjs";
import auth from "../../helper/auth_helper.mjs";
import bcrypt from "bcrypt";
const route = Router();

export default (app) => {
  app.use('/config/user', route);
  const collection = 'c_user';

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

  /* Insert */
  route.post("/", auth(), async (req, res)=>{
    let data = req.body;
    data['password'] = bcrypt.hashSync(data['username'], 1);
    // data['active'] = true;
    let d = await crud.insert(collection,data);
    res.send(d);
  });

  /* Update */
  route.patch("/:id", auth(), async (req, res)=>{
    let data = req.body;
    let d = await crud.update(collection,data,req.params.id);
    res.send(d);
  });

  /* Delete */
  route.delete("/:id", auth(), async (req, res)=>{
    let d = await crud.delete(collection,req.params.id);
    res.send(d);
  });
  
  app.post("/setting/chgpass", auth(), async (req, res)=>{
    try {
      let data = req.body;
      let response;
      let get = await crud.getOne(collection,data._id);
      if(get.status.code == 200){
        const match = await bcrypt.compare(data.oldpass, get.data.password);
        if(match){
          if(data.newpass == data.repass){
            let d = await crud.update(collection, { password: bcrypt.hashSync(data.newpass, 1) }, data._id);
            response = d;
          }else{
            response = { status: { code: 400, message: 'Re-enter password not matched!' } };
          }
        }else{
          response = { status: { code: 400, message: 'Old password not match' } };
        }
      }else{
        response = { status: { code: 404, message: 'User not found' } };
      }
      res.send(response); 
    } catch (error) {
      res.send( { status: { code: 500, message: error.message + ' ' + collection + ' API' } } );
    }
  });

}