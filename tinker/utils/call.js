import axios from "axios"
import dayjs from "dayjs"

const call = {
  timeout: 10000,
  authorize: async(url, require)=>{
    let grantAccess = false;
    let myLevel = 0;
    const data = localData();
    const session = getSess();
    if(data && session && data.role){
      for(const [k,v] of Object.entries(localData().role)){
        if(getSess().role == v.code){
          for(const [x,y] of Object.entries(v.option)){
            if(url.toLowerCase().includes(x.toLowerCase()) && (x != '/') ){
              switch (y) {
                case 'N': myLevel = 0; break;
                case 'R': myLevel = 1; break;
                case 'W': myLevel = 2; break;
                default: myLevel = 0; break;
              }
              grantAccess = myLevel >= require;
            }
          }
        }
      }
    }
    if(require == 1){
      for(const [k,v] of Object.entries(appcfg.localData)){
        if(url.toLowerCase().includes(v.url.toLowerCase())){
          grantAccess = true;
        }
      }
    }
    appcfg.freeMenu.forEach(x=>{
      if(url.toLowerCase().includes(x)){ grantAccess = true; }
    });
    return grantAccess;
  },
  get: async(url)=>{
    try {
      let grantAccess = await call.authorize(url,1);
      if( grantAccess ){
        let res = await axios.request({
          method: 'get',
          url: url,
          headers: { [appcfg.realm]: btoa(cryptSess()) },
          timeout: call.timeout,
        });
        return res.data
      }else{
        return { status: { code: 401, message: 'Unauthorized' } };
      }
    } catch (error) {
      return error.message;
    }
  },
  getbyparams: async(url, data)=>{
    try {
      let grantAccess = await call.authorize(url,1);
      if( grantAccess ){
        let res = await axios.request({
          method: 'get',
          url: url,
          params: data,
          headers: { [appcfg.realm]: btoa(cryptSess()) },
          timeout: call.timeout,
        });
        return res.data
      }else{
        return { status: { code: 401, message: 'Unauthorized' } };
      }
    } catch (error) {
      return error.message;
    }
  },
  post: async(url, data)=>{
    try {
      let grantAccess = await call.authorize(url,2);
      if( grantAccess ){
        data.createBy = getSess().username;
        data.createDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
        let res = await axios.request({
          method: 'post',
          url: url,
          headers: { [appcfg.realm]: btoa(cryptSess()), 'role': dataStorage('role') },
          timeout: call.timeout,
          data: data,
        });
        return res.data
      }else{
        return { status: { code: 401, message: 'Unauthorized' } };
      }
    } catch (error) {
      return error.message;
    }
  },
  patch: async(url, data)=>{
    try {
      let grantAccess = await call.authorize(url,2);
      if( grantAccess ){
        data.editBy = getSess().username;
        data.editDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
        let res = await axios.request({
          method: 'patch',
          url: url,
          headers: { [appcfg.realm]: btoa(cryptSess()), 'role': dataStorage('role') },
          timeout: call.timeout,
          data: data,
        });
        return res.data
      }else{
        return { status: { code: 401, message: 'Unauthorized' } };
      }
    } catch (error) {
      return error.message;
    }
  },
  put: async(url, data)=>{
    try {
      let grantAccess = await call.authorize(url,2);
      if( grantAccess ){
        let res = await axios.request({
          method: 'put',
          url: url,
          headers: { [appcfg.realm]: btoa(cryptSess()), "Access-Control-Allow-Origin": "*", 'Content-Type': 'multipart/form-data', 'role': dataStorage('role') },
          timeout: call.timeout,
          data: data,
        });
        return res.data
      }else{
        return { status: { code: 401, message: 'Unauthorized' } };
      }
    } catch (error) {
      return error.message;
    }
  },
  putfile: async(url, data)=>{
    try {
      let res = await axios.put(url, data);
      return res.data;
    } catch (error) {
      return error.message;
    }
  },
  delete: async(url)=>{
    try {
      let grantAccess = await call.authorize(url,2);
      if( grantAccess ){
        let res = await axios.request({
          method: 'delete',
          url: url,
          headers: { [appcfg.realm]: btoa(cryptSess()), 'role': dataStorage('role') },
          timeout: call.timeout,
        });
        return res.data
      }else{
        return { status: { code: 401, message: 'Unauthorized' } };
      }
    } catch (error) {
      return error.message;
    }
  },
  getwoauth: async(url)=>{
    try{
        let res = await axios.request({
          method: 'get',
          url: url,
          headers: { [appcfg.realm]: btoa(cryptSess()) },
          timeout: call.timeout,
        });
        return res.data
    } catch (error) {
      return error.message;
    }
  },
  getprmwoauth: async(url, data)=>{
    try {
      let res = await axios.request({
        method: 'get',
        url: url,
        params: data,
        headers: { [appcfg.realm]: btoa(cryptSess()) },
        timeout: call.timeout,
      });
      return res.data
    } catch (error) {
      return error.message;
    }
  },
  postwoauth: async(url, data)=>{
    try {
      let res = await axios.request({
        method: 'post',
        url: url,
        headers: { [appcfg.realm]: btoa(cryptSess()),'Content-Type': 'application/json' },
        timeout: call.timeout,
        data: data,
      });
      return res.data
    } catch (error) {
      return error.message;
    }
  }
}

export default call;