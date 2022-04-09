const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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');

function sendEmailConfirmationHTML(customerName,orderNro){
  return `<!DOCTYPE html>
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

function getMessage(emailParams){
  return{
    from :'isabella.grajalesl@autonoma.edu.co',
    to:'isabella.grajalesl@autonoma.edu.co',
    subject:'Confirmación orden de compra Black Friday',
    text:`Hola ${emailParams.customerName},Te enviamos las imágenes de los productos comprados , yla
    factura con número ${emailParams.orderNro}. Gracias por tu compra`,
    html:sendEmailConfirmationHTML(emailParams.customerName,emailParams.orderNro)

  }
}
async function sendOrder(emailParams){
  try{
    await sgMail.send(getMessage(emailParams))
    return {message:'confirmación de compra enviada'}

  }catch(err){
    const message='no se pudo enviar la orden de compra. Valide los errores'
    console.error(message)
    console.error(err)
    if(err.response)console.error(err.response.body)
    return{message}
  }
}
module.exports={
sendOrder
}
