import bAuth from "express-basic-auth";
import crud from "../model/crud.mjs";
import bcrypt from "bcrypt";

export default () => {
  async function myAuthorizer(uname, pass, callback) {
    let d = await crud.getAll('c_user', {username: uname});
    if(d.data.totalDocs == 1){
      const match = await bcrypt.compare(pass, d.data.docs[0].password);
      callback(null, match);
    }else{
      callback(null, false);
    }
  }
  function getUnauthorizedResponse(req) {
    if(req.auth){
      return {status:{code:401, message:'Re-check your credential'}}
    }else{
      return {status:{code:401, message:'No credentials provided'}}
    }
  }
  const authorize = bAuth({
    authorizer: myAuthorizer,
    unauthorizedResponse: getUnauthorizedResponse,
    authorizeAsync: true,
    challenge: true,
    realm: 'th15is145r34lm',
  });
  return authorize;
}