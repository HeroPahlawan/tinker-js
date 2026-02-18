export function is_param_exists(data, field){
  let param = [];
  if(Object.entries(data).length != 0){
    field.forEach((x)=>{
      if(!(x in data)){ param.push(x); }
    });
    if(param.length == 0){
      return true;
    }else{
      return {status:{code:400, message:`No parameter '${param.join()}' provided!`}};
    }
  }else{
    return {status:{code:400, message:'No parameter provided!'}};
  }
}

export default () => {

}