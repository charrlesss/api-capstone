import nodemailer from "nodemailer";

export async function sendEmailToChangePassword(
  email: string,
  link: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SYSTEM_USERNAME,
      pass: process.env.SYSTEM_SECRET,
    },
  });

  var mailOptions = {
    from: "andrecoso09@gmail.com",
    to: email,
    subject: "Online Voting System",
    text: "Content-type:application/json",
    html: `
            <h3>Hi from Freight Admninistrative System  ${email}</h3>
                <h3>Clcik this link to change your password</h3> 
            <p>
             ${link}
             </p>
      
         `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}



export async function sendEmailToVerifyAccount(
  email: string,
  code:string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SYSTEM_USERNAME,
      pass: process.env.SYSTEM_SECRET,
    },
  });

  var mailOptions = {
    from: "andrecoso09@gmail.com",
    to: email,
    subject: "Online Voting System",
    text: "Content-type:application/json",
    html: `
            <h3>Hi from Freight Admninistrative System  ${email}</h3>
                <h3>Clcik this link to change your password</h3> 
            <p> 
             ${code}
             </p>
      
         `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
