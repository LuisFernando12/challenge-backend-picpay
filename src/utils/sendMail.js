import nodemailer from "nodemailer";
export default async function sendMail (email, name){

// Configuração do transporte
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Detalhes do email
const mailOptions = {
  from: 'NOREPLAY',
  to: email,
  subject: 'Transferencia',
  text: `Olá senhor(a) ${name} informamos que acaba de receber uma transferencia em sua carteira ! `
};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Erro ao enviar email:', error);
  }
  console.log('Email enviado:', info.response);
});

}