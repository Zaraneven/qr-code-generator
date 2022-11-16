import qrcode from './qrcode.router'


export default app => {
    app.use('/', qrcode)
}