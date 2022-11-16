import _ from 'lodash';
import Qcode from '../models/Qcode.model'

const create = (req, res) => {
    const qrcode = Qcode(req.body);
    qrcode.save((err, data) => {
        if (err) {
            return res.status(400).json(err.message);
        }
        res.status(201).json(data);
    })
}

const list = (req, res) => {
    Qcode.find((err, data) => {
        if (err) { 
            return res.status(400).json(err.message);
        }
        res.status(200).json(data);
    });
}

const read = (req, res) => {
    const id = req.params.id;
    Qcode.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json(err.message);
        }
        res.status(200).json(data);
    });
}



const remove = (req, res) => {
    const id = req.params.id;
    Qcode.findById(id).exec((err, data) => {
        if (err || !data) {
            return res.status(400).json('QRCode not found');
        }
        data.remove((err, data) => {
            if (err) {
                return res.status(400).json(err.message);
            }
            res.status(200).json('QRCode deleted.');
        })
    })
}

export default { list, create, read, remove}