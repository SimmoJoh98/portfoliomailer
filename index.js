const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const PORT = process.env.PORT || 3009
const cors = require('cors')
const path = require('path')

require('dotenv').config()

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth:{
        // user: "whyiseverysinglefknthingtaken@hotmail.com",
        // pass: "Thisismypasswordlmao420!"
        user: process.env.USER,
        pass: process.env.PASS
    }
})

// ENDPOINT FOR SENDING THE EMAIL
app.post('/api/mailme', (req,res) => {
    let { fname, email, msg } = req.body
    let options = {
        from: "whyiseverysinglefknthingtaken@hotmail.com",
        to: "simmojoh98@gmail.com",
        subject: `NEW PORTFOLIO MSG FROM ${fname}`,
        text: `Email sent by: ${email}\n
        ${msg}
        `,
        html: `
        <h2>Email sent by: ${email}</h2>
        <hr/>
        <pre style="font-size: 18pt"> ${msg}</pre>
        `
    };
    
    transporter.sendMail(options, (err,info) => {
        if(err){
            console.log(err)
            return
        }else{
            console.log(`Mail sent successfully!`)
        }
    })

    res.sendStatus(200)
})

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, './index.html'))
})

app.listen(PORT, () => console.log(`Mail Server listening on ${PORT}`))