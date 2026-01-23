import { Router } from "express";
import crud from "../../model/crud.mjs";
import auth from "../../helper/auth_helper.mjs";
import mail from "../../helper/mail_helper.mjs";
const route = Router();

export default (app) => {
  app.use('/transaction/booking', route);
  const collection = 't_booking';
  const company = 'm_company';

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
    let d = await crud.insert(collection,data);
    res.send(d);
  });

  /* Update */
  route.patch("/:id", auth(), async (req, res)=>{
    let data = req.body;
    let m = {};
    switch (data.locked) {
      case 1:
          let cp = await crud.getOne(company,data.company);
          m.to=cp.data.email;
          m.subj='InShopper Booking Notification for: '+data.no_surat;
          m.text='<p>Hi, Booking baru telah masuk ke akun anda atas Nama :'+data.name+', dan Nomor surat :'+data.no_surat+' Segera lakukan cek, dan proses</p>';
          mail(m);
        break;
      case 2:
          let ga = await crud.getOne(collection,req.params.id);
          m.to=ga.data.mailby;
          m.subj='InShopper Booking Notification for: '+data.no_surat;
          m.text='<p>Hi, Booking baru telah dalam konfirmasi atas Nama :'+data.name+', dan Nomor surat :'+data.no_surat+' Segera lakukan cek, dan proses</p>';
          mail(m);
        break;
      case 3:
          let bk = await crud.getOne(collection,req.params.id);
          m.to=bk.data.passenger_email;
          m.subj='InShopper Booking Notification for: '+data.no_surat;
          m.text='<p>Hi, Booking anda atas Nama :'+data.name+', dan Nomor surat:'+data.no_surat+' telah DISETUJUI, segera unduh reservasi issued terlampir dan Selamat Melakukan Perjalanan Dinas!</p>';
          m.attachments=bk.data.attachments;
          mail(m);
        break;
      default:
    }
    let d = await crud.update(collection,data,req.params.id);
    res.send(d);
  });

  /* Push */
  route.put("/:id", auth(), async (req, res)=>{
    let data = req.body;
    let d = await crud.put(collection,data,req.params.id);
    res.send(d);
  });

  /* Delete */
  route.delete("/:id", auth(), async (req, res)=>{
    let d = await crud.delete(collection,req.params.id);
    res.send(d);
  });

}