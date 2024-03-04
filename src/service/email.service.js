/*import nodemailer from "nodemailer"*/
import { USER_EMAIL, USER_PASSWORD } from "../config.js"

/*
const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
})*/
/*
class EmailService{
    async sendEmail(destinatario, asunto, mensaje,){
        const emailOptions = {
            from: USER_EMAIL,
            to: destinatario,
            subject: asunto,
            text: mensaje

        }

        await transport.sendMail(emailOptions)
    }
    
}*/

class FakeEmailService{
    async sendEmail(destinatario, asunto, mensaje,){
        const emailOptions = {
            from: USER_EMAIL,
            to: destinatario,
            subject: asunto,
            text: mensaje

        }

        console.log(JSON.stringify(emailOptions, null, 2))
    }
    
}

export class FakeEmailServicePremium{
    static async sendEmail(destinatario, asunto, mensaje,){
        const emailOptions = {
            from: USER_EMAIL,
            to: destinatario,
            subject: asunto,
            text: mensaje

        }

        console.log(JSON.stringify(emailOptions, null, 2))
    }
    
}
//export const emailService = new EmailService()
export const emailService = new FakeEmailService()