import axios from "axios";
import appcfg from "@/utils/appcfg.js";

export default defineEventHandler(async (event) => {
  try {
    let body = await readBody(event);
    let path = event.path.replace('/api','');
    const options = {
      method: 'POST',
      url: appcfg.apiUrl + path,
      headers: {
        'Content-Type': 'application/json'
      },
      data: body
    };
    let req = await axios.request(options);
    let res = req.data;
    return res;
  } catch (error) {
    return {status:{code:500,message:error.message || 'Connection error'}};
  }
})