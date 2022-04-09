const mongoose = require('mongoose');
const express = require('express');
const {
  logErrors,
  errorHandler,
  BoomerrorHandler,
} = require('./src/handlers/errors.handler');
const routerApi = require('./src/routes');
require('dotenv').config();
const email = require('./src/Mail');

const port = 5000 || process.env.PORT;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey( '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');

const accountSID = 'AC692119c8d8753ab65d2598de9032f491';
const authToken = '19dd840b579fe9514c05cfc8fff9abc0';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log('Active port', port));

app.get('/', (req, res) => {
  res.json({ message: 'Success' });
});

app.post('/api/email/confirmacion', async (req, res, next) => {
  try {
    res.json(await email.sendOrder(req.body));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: error.message });
  return;
});

function getMessage() {
  const body = 'Mensaje enviado';
  return {
    from:'isabella.grajalesl@autonoma.edu.co',
    to:'isabella.grajalesl@autonoma.edu.co',
    subject: 'Prueba sendgrid V2',
    text: body,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Document</title>
    </head>
    <body>
      <div class="container section">
        <label><strong>Producto</strong></label>
        <img src = "https://homecenterco.scene7.com/is/image/SodimacCO/287466?fmt=jpg&fit=fit,1&wid=420&hei=420" alt="" width="400px">

      </div>
    </body>
    </html>`,
  };
}

async function sendEmail() {
  try {
    await sgMail.send(getMessage());
    console.log('El correo ha sido enviado');
  } catch (err) {
    console.error('No se pudo enviar el mensaje');
    console.error(err);
    if (err.response) console.error(err.response.body);
  }
}

async () => {
  console.log('Enviando correo electronico');
  await sendEmail();
};

mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success connection with mongo'))
  .catch((error) => console.error(error));

/*TWILIO */
const client = require('twilio')(accountSID, authToken);

//Enviar mensaje a whatsapp
client.messages
  .create({
    body: 'Prueba Mensaje WhatsApp , Ingenieria de software II',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+573012214519',
  })
  .then((message) => console.log(`Mensaje enviado ${message.sid}`));

client.messages
  .create({
    body: 'Prueba de twilio. SMS',
    from: '+12767309027',
    to: '+573012214519',
  })
  .then((message) => console.log(message.sid));

 sgMail.setApiKey('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');
  const msg = {
    from:'isabella.grajalesl@autonoma.edu.co', // Change to your verified sender
    to:'isabella.grajalesl@autonoma.edu.co', // Change to your recipient

    subject: 'Asunto: Prueba twilio',
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
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })


/* Respuestas a solicitudes http en formato JSON */
app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(BoomerrorHandler);
/* Permitir hacer el llamado de los request */
routerApi(app);
