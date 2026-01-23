import axios from "axios";
import appcfg from "@/utils/appcfg.js"
import { crypt } from "@/utils/app_helper.js";

export default defineEventHandler(async (event) => {
  try {
    // let head = getHeaders(event);
    // let sess = JSON.parse(crypt(atob(head[appcfg.realm])));
    // let body = await readBody(event);
    // let path = event.path.replace('/api','');
    // if('_id' in body){ delete body._id; }
    // const options = {
    //   method: 'POST',
    //   url: appcfg.apiUrl + path,
    //   auth: { username:sess.username, password:sess.password },
    //   headers: { 'Content-Type': 'application/json' },
    //   timeout: 10000,
    //   data: body
    // };
    // let req = await axios.request(options);
    // let res = req.data;
    // return res;
    
    const nodeRequestObject = event.node.req;
    const body = await readBody( event );
    console.log(body);
    return { ok: true };
  } catch (error) {
    return { status: { code:500, message: error.message } };
  }
});

function nodeRequest(req){
  return new Promise((resolve, reject) => {
    /** @type {any[]} */
    const chunks = [];
    req.on('data', (data) => {
      chunks.push(data);
    });
    req.on('end', () => {
      const payload = Buffer.concat(chunks).toString()
      resolve(payload);
    });
    req.on('error', reject);
  });
};