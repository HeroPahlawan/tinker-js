import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const crud = {
  model: (table)=>{
    const dataSchema = new mongoose.Schema({}, {strict:false});
    dataSchema.plugin(paginate);
    let model = mongoose.models[`${table}-model`] || mongoose.model(`${table}-model`, dataSchema, table);
    return model
  },
  getOne:async(table,id)=>{
    /* id either string or object */
    try {
      let mdl = crud.model(table);
      let res = await mdl.findById(id);
      if(!res){
        return {data:res, status:{code:404, message:`Not found id ${id}`}};
      }else{
        return {data:res, status:{code:200, message:'OK'}};
      }
    } catch (e) {
      return {data:'error', status:{code:500, message:e.message || `Error get data with id ${id}`}};
    }
  },
  getAll:async(table,param)=>{
    /**
     * new RegExp(var+'$') => LIKE '%text'
     * new RegExp('^'+var) => LIKE 'text%' faster (use index)
     * new RegExp(var) => LIKE '%text%'
    */
   try {
      let mdl = crud.model(table);
      let options = {};
      if( ('page' in param) && ('limit' in param) ){
        const { page, limit } = param;
        options.page = page;
        options.limit = limit;
      }else{
        options.pagination = false;
      }
      if('sort' in param){
        const { sort } = param;
        options.sort = sort;
      }else {
        // Default to sorting by createDate in descending order if no sort parameter is provided
        options.sort = { createDate: -1 };
      }
      delete param.page;
      delete param.limit;
      delete param.sort;
      for (const [k, v] of Object.entries(param)) {
        if (v.startsWith('*') && v.endsWith('*')) {
          param[k] = new RegExp(v.replace(/\*/g, ''));
        } else if (v.startsWith('*')) {
          param[k] = new RegExp(v.replace('*', '') + '$');
        } else if (v.endsWith('*')) {
          param[k] = new RegExp('^' + v.replace('*', ''));
        }
      }

      // param['createDate'] = {'$gte': new Date('2023-11-21')};

      let res = await mdl.paginate(param, options);
      if(!res){
        return {data:'', status:{code:400, message:res}};
      }else{
        return {data:res, status:{code:200, message:'OK'}};
      }
    } catch (e) {
      return {data:'error', status:{code:500, message:e.message || `Error get data`}};
    }
  },
  insert:async(table,data)=>{
    try {
      let mdl = crud.model(table);
      // data['createBy'] = '';
      // data['createDate'] = new Date();
      // data['editBy'] = '';
      // data['editDate'] = '';
      const obj = new mdl(data);
      let res = await obj.save();
      if(!res){
        return {data:'', status:{code:400, message:`Cannot insert data. Maybe data was not found!`}};
      }else{
        return {data:res, status:{code:200, message:'OK'}};
      }
    } catch (e) {
      return {data:'error', status:{code:500, message:e.message || `Error insert data`}};
    }
  },
  update:async(table,data,param)=>{
    try {
      let mdl = crud.model(table);
      // data['editBy'] = '';
      // data['editDate'] = new Date();
      let res = await mdl.findByIdAndUpdate(param, data);
      if(!res){
        return {data:'', status:{code:400, message:`Cannot update data. Maybe data was not found!`}};
      }else{
        return {data:res, status:{code:200, message:'OK'}};
      }
    } catch (e) {
      return {data:'error', status:{code:500, message:e.message || `Error update data`}};
    }
  },
  put:async(table,data,param)=>{
    try {
      let mdl = crud.model(table);
      // data['editBy'] = '';
      // data['editDate'] = new Date();
      let res = await mdl.findByIdAndUpdate(param, { $push:  data  });
      if(!res){
        return {data:'', status:{code:400, message:`Cannot update data. Maybe data was not found!`}};
      }else{
        return {data:res, status:{code:200, message:'OK'}};
      }
    } catch (e) {
      return {data:'error', status:{code:500, message:e.message || `Error update data`}};
    }
  },
  delete:async(table,param)=>{
    try {
      let mdl = crud.model(table);
      let res = await mdl.findByIdAndDelete(param);
      if(!res){
        return {data:res, status:{code:400, message:`Cannot delete data. Maybe data was not found!`}};
      }else{
        return {data:res, status:{code:200, message:'OK'}};
      }
    } catch (e) {
      return {data:'error', status:{code:500, message:e.message || `Error delete data with id ${id}`}};
    }
  },
}

export default crud;