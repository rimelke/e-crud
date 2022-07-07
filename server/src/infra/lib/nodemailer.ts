import nodemailer, { SendMailOptions } from 'nodemailer'
import hbs, { TemplateOptions } from 'nodemailer-express-handlebars'
import path from 'path'

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e76d823ee84de2',
    pass: '156cca60ed2bdb'
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
