import crud from "../../model/crud.mjs";
import bcrypt from "bcrypt";

export default (app) => {
  const collection = 'c_user';

  app.post("/main/login", async (req, res)=>{
    let data = req.body;
    let d = await crud.getAll(collection,{username:data.username});

    // Surface any internal error from crud instead of hiding it as "Username not found"
    if(d.status.code === 500){
      return res.send({status:{code:500, message: d.status.message}});
    }

    let resp;
    if(d.data.totalDocs == 1){
      let user = d.data.docs[0];
      const match = await bcrypt.compare(data.password, user.password);
      if(match){
        resp = {data:d.data.docs[0],status:{code:200,message:'OK'}};
      }else{
        resp = {status:{code:401,message:'Please check your password'}};
      }
    }else{
      resp = {status:{code:401,message:'Username not found'}};
    }
    res.send(resp);
  });

}