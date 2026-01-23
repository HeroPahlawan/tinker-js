import axios from "axios";
import appcfg from "@/utils/appcfg.js";
import { crypt } from "@/utils/app_helper.js";

export default defineEventHandler(async (event) => {
  try {
    let head = getHeaders(event);
    let sess = JSON.parse(crypt(atob(head[appcfg.realm])));
    let auth = { auth: { username:sess.username, password:sess.password } };
    let path = event.path.replace('/api','');
    let req = await axios.delete(appcfg.apiUrl + path, auth);
    let res = req.data;
    return res; 
  } catch (error) {
    return { status: { code:500, message: error.message } };
  }
})