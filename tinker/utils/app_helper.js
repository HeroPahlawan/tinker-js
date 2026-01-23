import axios from "axios"
import dayjs from "dayjs"

export function cryptSess(){
  let d = localStorage.getItem('xsss');
  return d;
}

export function crypt(plaintext){
  const _0x2ff2e6=_0x4316;(function(_0x68baf1,_0x4f84bb){const _0x1c77b1=_0x4316,_0x4830e6=_0x68baf1();while(!![]){try{const _0x4c666e=-parseInt(_0x1c77b1(0x1e9))/0x1*(parseInt(_0x1c77b1(0x1ec))/0x2)+-parseInt(_0x1c77b1(0x1e3))/0x3+-parseInt(_0x1c77b1(0x1e5))/0x4+parseInt(_0x1c77b1(0x1e6))/0x5+parseInt(_0x1c77b1(0x1ea))/0x6+parseInt(_0x1c77b1(0x1e4))/0x7+parseInt(_0x1c77b1(0x1e7))/0x8*(parseInt(_0x1c77b1(0x1ed))/0x9);if(_0x4c666e===_0x4f84bb)break;else _0x4830e6['push'](_0x4830e6['shift']());}catch(_0x1fa9f8){_0x4830e6['push'](_0x4830e6['shift']());}}}(_0x3529,0xce9d8));let encryptedText='',key='5ysT3wS3cR3t';for(let i=0x0;i<plaintext[_0x2ff2e6(0x1e8)];i++){let encryptedCharCode=plaintext[_0x2ff2e6(0x1eb)](i)^key[_0x2ff2e6(0x1eb)](i%key[_0x2ff2e6(0x1e8)]);encryptedText+=String['fromCharCode'](encryptedCharCode);}function _0x3529(){const _0xdb8160=['1154075sNHVUT','16fHRfti','length','23572XBZsZL','8441112kPrYcF','charCodeAt','44MZKCFw','1281627NmxuZi','1795377UjkHsQ','6907670CgcicI','3783776bJrwbt'];_0x3529=function(){return _0xdb8160;};return _0x3529();}function _0x4316(_0x24a747,_0x5b9f99){const _0x352991=_0x3529();return _0x4316=function(_0x431626,_0x15c846){_0x431626=_0x431626-0x1e3;let _0x1fc2a5=_0x352991[_0x431626];return _0x1fc2a5;},_0x4316(_0x24a747,_0x5b9f99);}return encryptedText;
}

export function getSess(){
  let d = localStorage.getItem('xsss');
  if(d!=null){
    let enc = crypt(d);
    return JSON.parse(enc);
  }else{
    return d;
  }
}

export function setSess(item){
  let dec = crypt(JSON.stringify(item));
  // let dec = JSON.stringify(item);
  localStorage.setItem('xsss', dec);
}

export function delSess(){
  localStorage.removeItem("xsss"); // session
  localStorage.removeItem("xdump"); // master data
}

export function dataForm(el) {
  return Object.fromEntries(new URLSearchParams(new FormData(document.getElementById(el))));
}

export function loading(isShow, text = false) {
  let el = document.getElementById('loading-overlay');
  if (isShow) {
    if(text){
      document.getElementById('loading-text').textContent = text;
    }else{
      document.getElementById('loading-text').textContent = 'Loading ...';
    }
    el.style.display = "block"
  } else {
    setTimeout(() => {
      el.style.display = "none"
    }, 500);
  }
}

export const localData = () => {
  return localStorage.getItem('xdump')==null?{}:JSON.parse(localStorage.getItem('xdump'))
};

export const dataStorage = (whichData, keyToUse, valueToUse) => {
  let d = localData()[whichData];
  let obj = {};
  d.forEach(x => {
    let cfg = appcfg.localData[whichData];
    if(keyToUse && valueToUse){
      obj[x[keyToUse]] = x[valueToUse];
    }else{
      obj[x[cfg.key]] = x[cfg.value];
    }
  });
  return obj;
};

export function print_modal(uri){
  let ne = document.createElement('div');
  ne.setAttribute('id','ivi');
  document.querySelector('body').append(ne);

  let ivi=document.querySelector("#ivi"); ivi.style="width:95vw;height:85vh;position:fixed;top:50%;left:50%;z-index:1050;transform:translate(-50%,-50%);box-shadow: -5px 4px 10px grey;";
  let civi=document.createElement("div");
  civi.style="position:relative;width:100%;height:100%;text-align:center;";
  ivi.append(civi);

  // remove button
  let clobut=document.createElement("button");
  clobut.classList='btn-danger-sm px-2 py-1 mr-2';
  clobut.style="position:fixed;top:40px;right:15px;";
  let cloico=document.createElement("i");
  cloico.classList='fa fa-times-circle pr-1';
  clobut.append(cloico);
  clobut.append("Close");
  civi.append(clobut);clobut.addEventListener('click',()=>{document.getElementById("ivi").remove()});

  let el=document.createElement("iframe"); el.src=uri;
  el.width="100%";el.height="100%"
  civi.append(el);
}

export function curr(val){
  if (typeof val !== "number") {
    return val;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR'
  });
  return formatter.format(val);
}

export function calcgrtotal(){
  if (localStorage.getItem('cart')!=undefined) {
    let arr=JSON.parse(localStorage.getItem('cart'));
    let grtotal=0;
    arr.forEach((x,i) => {
        grtotal += x.item.subtotal;
    });
    return grtotal;
  }
}

// export function getbranch(){
//   let br='';let res='';
//   try{
//   const route = useRoute();
//   br=route.query.branch;
//   res = call.getwoauth(`/api/master/branches?code=${br}`);
//   this.branch = res.data['docs'][0];
//   } catch (error) {
//     this.branch = error;
//   }
// }

export async function getTrannbr(branch){
  let countTran = await call.getprmwoauth(appcfg.apiUrl + `/transaction/checkout/?createDate=`+dayjs().format('YYYY-MM-DD')+`*` );
  let counter = countTran.data.docs.length;
  let regnum =(counter+1).toString().padStart(7, '0');
  let dt = dayjs().format('YYMMDD')
  let trannbr = branch+dt+regnum;
  return trannbr;
}

export async function getCategories(){
  let ctgdata = await call.getwoauth(appcfg.apiUrl + `/master/categories` );
  let data = ctgdata.data.docs;
  return data;
}

export async function getBu(id){
  let budata = await call.getwoauth(appcfg.apiUrl + `/master/branches/?_id=` + id );
  let data = budata.data.docs;
  return data;
}

function construct(){}

export default construct;