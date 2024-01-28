const express = require('express')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()
dotenv.config()

const loginRouter = require("./routes/login")
const addProjectRouter = require("./routes/addProject")

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));

const transport = nodemailer.createTransport({
    host : 'smtp.outlook.com',
    port : 587,
    secure : false,
    tls: {
        ciphers:'SSLv3'
        },
    requireTLS:true,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
})

app.post('/message' , (req, res) => {
    let html = `
    <p> ${req.body.message} </p>
    `
    transport.sendMail({
        from : process.env.EMAIL, 
        to : process.env.RECIPIENT,
        subject : `Message from ${req.body.name}`,
        html : html,
    }).then(
        info => console.log(`Message sent : ${info.messageId}`)
    ).catch(console.error)
    res.json({'message' : 'Message sent successfuly'})
})

app.use('/api/v1' , loginRouter)
app.use('/api/v1' , addProjectRouter)

app.listen(process.env.PORT || 3000)
console.log(`Listening on port ${process.env.PORT}`)
