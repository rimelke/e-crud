import nodemailer, { SendMailOptions } from 'nodemailer'
import hbs, { TemplateOptions } from 'nodemailer-express-handlebars'
import path from 'path'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST as string,
  port: process.env.MAIL_PORT as unknown as number,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      partialsDir: path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'temp',
        'templates'
      ),
      defaultLayout: undefined
    },
    extName: '.hbs',
    viewPath: path.resolve(__dirname, '..', '..', '..', 'temp', 'templates')
  })
)

export const sendEmail = async (data: SendMailOptions & TemplateOptions) => {
  await transporter.sendMail(data)
}
