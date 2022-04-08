const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const email= require('./src/Mail')
const sgMail= require('@sendgrid/mail')
const app = express();
const {logErrors,errorHandler,BoomerrorHandler,} = require('./src/handlers/errors.handler');
const routerApi = require('./src/routes');
const port = process.env.PORT;
app.listen(port, () => console.log('Active port', port));

mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success connection with mongo'))
  .catch((error) => console.error(error));

// datos twilio
const accountSid = 'AC692119c8d8753ab65d2598de9032f491';
const authToken = '43d430b050180b413c4894d84e8ec0ac';
const client = require('twilio')(accountSid, authToken);

//SMS
client.messages
  .create({
    body: 'Prueba de Twilio ; Ingenieria de software II',
    from: '+12767309027',
    to: '+573012214519'
  })
  .then((message) => console.log(message.sid));


//WhatsApp
  client.messages
    .create({
      body: 'Prueba de Twilio ; Ingenieria de software II',
      from: 'whatsapp:+1415523-8886',
      to: 'whatsapp:+573012214519'
    }).then((message) => console.log(message.sid));

  /** SENGRID */

  sgMail.setApiKey("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");
  const msg = {
    to: 'isabella.grajalesl@autonoma.edu.co', // Change to your recipient
    from: 'isabella.grajalesl@autonoma.edu.co', // Change to your verified sender
    subject: 'Asunto :prueba twilio grupo miercoles',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

  <title>Document</title>
</head>
<body>
  <div class="row">
    <div class="col">
      <h3>Prueba Seadgrid</h3>
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });



// creación de ruta del proyecto http://localhost/5000/
app.get('/',(req,res)=>{
  res.json({message:'Succes'})
});



app.post('/api/email/confirmacion', async (req, res, next) => {
  //LLamamos la función que tenemos en email.js y requiere parametros que ingresan por postman
  try {
    res.json(await email.sendOrder(req.body));
  } catch (err) {
    next(err);
  }
});
app.use((err,req,res,next)=>{
//validar el codigo que nos devuelve la ejecución
//mostrar todo el cotenido del error
//100 Informativo
//200 No es un error , es succes
//300 No está disponible el recurso
//400 No se encuentra la URI
//500 Error del servidor

const statusCode = err.statusCode || 500
console.error(err.message , err.stack)
res.status(statusCode).json({'message':error.message})
return})

function getMessage(){
  const body= 'mensaje enviado el 08/04/2022 07:00:00 a.m.'
  return{
    to:'isabella.grajalesl@autonoma.edu.co',
    from:'isabella.grajalesl@autonoma.edu.co',
    subject:'Prueba SendGridG02',
    text:body,
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div class="container section">
        <label>Paisaje</label>
        <img src="https://www.privun.com/pub/media/catalog/product/cache/75eed2686e01eb22cb4050b2f40ddf97/h/t/httpsstorage.googleapis.comfotos-novaventaprivun2009389-lampara-mesa-serena-1.jpg"></img>

      </div>
    </body>
    </html>`
  }
}

async function sendEmail(){
  try{
   await sgMail.send(getMessage())
   console.log('correo ha sido enviado')
  }catch{
   console.error('no se pudo enviar el mensaje')
   console.error(err)
   if(err.response)console.error(err.response.body)
  }
}

(async ()=>{
  console.log('enviando correo electronico')
  await sendEmail()
})
//Datos para prueba de postman
  app.use(express.json());
  app.use(express.urlencoded({extended:false}))
/* Respuestas a solicitudes http en formato JSON */
app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(BoomerrorHandler);
/* Permitir hacer el llamado de los request */
routerApi(app);
