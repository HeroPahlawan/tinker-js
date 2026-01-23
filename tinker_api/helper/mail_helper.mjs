import nodemailer from "nodemailer";

export default (obj) => {

  let bookmail = "<body style='font-family: 'Montserrat', Arial, sans-serif'>"+
  "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr>"+
  "<td align='center' style='padding: 20px;'><table class='content' width='600' border='0' cellspacing='0' cellpadding='0' style='border-collapse: collapse; border: 1px solid #cccccc;'>"+
  "<!-- Header -->"+
  "<tr><td class='header' style='background-color: #0a0a0a; padding: 40px; text-align: center; color: white; font-size: 24px;'>"+
  obj.subj+
  "</td></tr>"+
  "<tr><td class='body' style='padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;'>"+
  "Hello, All! <br>"+
  obj.text+
  "</td></tr>";
  // Append additional content
  obj.data.detail.forEach(content => {
    bookmail += '<div style="border: 1px solid #ccc; border-radius: 8px; overflow: hidden; width: 400px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">'+
        '<table style="width: 100%; border-collapse: collapse;">'+
            '<tr>'+
                '<td><svg width="99px" height="99px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e0e0e0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10ZM10.3536 13.3536L12.5 15.5L18.1464 9.85355C18.4614 9.53857 19 9.76165 19 10.2071V19H5V18L9.64645 13.3536C9.84171 13.1583 10.1583 13.1583 10.3536 13.3536Z" fill="#bababa"></path> </g></svg></td>'+
                '<td style="padding: 16px;">'+
                    '<h2 style="font-size: 1.5em; margin: 0;">'+content.item.name+'</h2>'+
                    '<h3 style="font-size: 1.5em; margin: 0;">'+obj.data.trannbr+'</h3>'+
                    '<p style="margin-top: 8px; color: #555;">Qty: '+content.item.qty+'pcs | Type: '+content.item.type+' | Price @pcs: '+content.item.price+' </p>'+
                    '<p style="margin-top: 8px; color: #555;">'+content.item.subtotal+' </p>'+
                '</td>'+
            '</tr>'+
        '</table>'+
    '</div><br>';
  });
  bookmail += "<tr><td class='body' style='padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;'>"+
  "<b>Subtotal: IDR"+obj.data.subtotal+"</b> <br>"+
  "<b>Tax: IDR"+obj.data.tax+"</b> <br>"+
  "<b>Total: IDR"+obj.data.total+"</b> <br>"+
  "<br>"+
  "<b>Buyer Name: "+obj.data.buyername+"</b> <br>"+
  "<b>Email: "+obj.data.email+"</b> <br>"+
  "<b>Phone: "+obj.data.phone+"</b> <br>"+
  obj.text+
  "</td></tr>";
  bookmail += "</tr><tr><td style='padding: 0px 40px 0px 40px; text-align: center;'>"+
  "<table cellspacing='0' cellpadding='0' style='margin: auto;'><tr>"+
  "<td align='center' style='background-color: #04a5b5; padding: 10px 20px; border-radius: 5px;'>"+
  "<a href='https://inshopper.iash.id' target='_blank' style='color: #ffffff; text-decoration: none; font-weight: bold;'>Open in InShopper</a>"+
  "</td></tr></table></td></tr><tr><td class='body' style='padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;'>"+
  "<p><strong>Disclaimer:</strong></p>"+
  "<p><i>Informasi di situs ini hanya untuk tujuan umum. Kami tidak menjamin keakuratan atau kelengkapannya. Gunakan informasi ini dengan risiko Anda sendiri.</i></p>"+        
  "</td></tr><tr><td class='footer' style='background-color: #333333; padding: 40px; text-align: center; color: white; font-size: 14px;'>"+
  "Copyright &copy; | InShopper Injourney Aviation Services</td></tr></table></td></tr></table></body>";

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ias.it.strdev@gmail.com",
      pass: "xyjd jwjw oioe tenq",//hbxs spzk gths lkul   
    },
  });

  transporter.sendMail({
    from: '"InShopper - Injourney Aviation Services" <noreply@ias.id>',
    to: obj.to,
    subject: obj.subj,
    html: bookmail,
  })

  return true;
}