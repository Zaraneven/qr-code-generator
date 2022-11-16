import express from 'express';
import ctrl from '../controllers/qrcode.controller'

const router = express.Router()

router.route('/api/qrcodes')
    .get(ctrl.list);
router.route('/api/qrcodes')
    .post(ctrl.create)
    .get(ctrl.list);
router.route('/api/qrcodes/:id')
    .get(ctrl.read)
    .delete(ctrl.remove);
    
export default router; 