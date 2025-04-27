const jwt = require('jsonwebtoken');
const { sendResponse } = require('../../helper/responsehelper.js');
const { Tiffin } = require('../../models/index.js');
const formidable = require('formidable').IncomingForm;
// Define upload directory
const path = require("path");
const fs = require("fs");
const { send } = require('process');
const { TransformStreamDefaultController } = require('stream/web');
const SendmailTransport = require('nodemailer/lib/sendmail-transport/index.js');
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

exports.addTiffin = async (req, res) => {
    try {
        const form = new formidable({ multiples: true, uploadDir: UPLOAD_DIR, keepExtensions: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                throw err;
            }
            // Ensure the upload directory exists
            if (!fs.existsSync(UPLOAD_DIR)) {
                fs.mkdirSync(UPLOAD_DIR, { recursive: true });
            }
            const oldPath = files.imageURL[0].filepath;
            const newPath = path.join(UPLOAD_DIR, files.imageURL[0].originalFilename);
            fs.rename(oldPath, newPath, async (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const tiffinName = fields.tiffinName?.[0] || '';
                const tiffinType = fields.tiffinType?.[0] || '';
                const tiffinSize = fields.tiffinSize?.[0] || '';
                const price = fields.price?.[0] || '';
                const availabilityStatus =  'In Stock';
                const description = fields.description?.[0] || '';
    
             
                if (!tiffinName || !tiffinType || !tiffinSize || !price || !availabilityStatus || !description ) {
                    return sendResponse(res, 400, 'All Fields are required');
                }

                const validTypes = ['Breakfast', 'Lunch', 'Dinner']
                if (!validTypes.includes(tiffinType)) {
                    return sendResponse(res, 400, 'Validtypes only BreakFast, Lunch and Dinner');
                }
                const validSizes = ['Small', 'Medium', 'Large']
                if (!validSizes.includes(tiffinSize)) {
                    return sendResponse(res, 400, 'Valid sizes only Small, Medium, and Large');
                }
                // const availableStatus = ['In Stock', 'Out of Stock']
                // if (!availableStatus.includes(availabilityStatus)) {
                //     return sendResponse(res, 400, 'Invalid AvailabilityStatus. It must be "In Stock" or "Out of Stock".');
                // }

                const newTiffin = await Tiffin.create({
                    tiffinName,
                    tiffinType,
                    tiffinSize,
                    price,
                    availabilityStatus,
                    description,
                    imageURL: `${files.imageURL[0].originalFilename}`,
                    // isActive
                })
                return sendResponse(res, 200, 'Tiffin Added Successfully');
            });
        })

    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err)
    }
}
exports.editTiffin = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { tiffinName, tiffinType, tiffinSize, price, availabilityStatus, description, imageURL } = req.body;
        if (!tiffinName || !tiffinType || !tiffinSize || !price || !availabilityStatus || !description || !imageURL) {
            return sendResponse(res, 400, 'All Fields are required');
        }
        const tiffin = await Tiffin.findOne({ where: { id } });
        if (!tiffin) {
            return sendResponse(res, 400, 'Tiffin Not Found');
        }
        await tiffin.update({
            tiffinName,
            tiffinType,
            tiffinSize,
            price,
            availabilityStatus,
            description,
            imageURL
        });

        return sendResponse(res, 200, 'Tiffin Updated Successfully');
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server', null, err);
    }
}
exports.deleteTiffin = async (req, res) => {
    try {
        const { id } = req.params;
        const tiffin = await Tiffin.findOne({ where: { id } });
        if (!tiffin) {
            return sendResponse(res, 400, 'Tiffin not found');
        }
        await tiffin.destroy();
        return sendResponse(res, 200, 'Tiffin Deleted Successfully');
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error');
    }
}
exports.listTiffin = async (req, res) => {
    try {
        const tiffin = await Tiffin.findAll();
        return sendResponse(res, 200, 'Tiffin List Fetch successfully', { list: tiffin });
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);
    }
}
exports.temporaryUnavailable = async (req, res) => {
    try {
        const { id, temporaryUnavailable } = req.body;
        if (!id) {
            return sendResponse(res, 400, 'Id is require');
        }
        if (typeof temporaryUnavailable !== 'boolean') {
            return sendResponse(res, 400, 'temporaryUnavailable must be a boolean value');
        }

        const tiffin = await Tiffin.findOne({ where: { id } });
        if (!tiffin) {
            return sendResponse(res, 400, 'Tiffin not found');
        }
        tiffin.availabilityStatus = temporaryUnavailable ? 'In Stock' : 'Out of Stock';

        await tiffin.save();
        sendResponse(res, 200, "Status updated successfully", { tiffin })
        return
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);
    }
}

