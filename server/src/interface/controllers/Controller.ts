type Controller = (data: {
  params: any
  body: any
  authorization?: string
}) => Promise<any>

export default Controller
