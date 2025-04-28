const Item = require('../models/item');
const User = require('../models/user');
const QrCode = require('qrcode');

exports.getQrCode = async (req, res) => {
    const itemId = req.params.id;
    //const userId = req.body.userId || '';

    const item = await Item.findById(itemId);

    if (!item) {
        // Not Found
        return res.status(404).json({ message: 'Item not found' });
    }

    /*
    // Uncomment to allow only the owner to create QR Code
    const isOwner = item.owner == userId;
    const isTokenValid = await User.checkToken(userId, req.body.token);

    if (!isOwner || !isTokenValid) {
        // Forbidden
        return res.status(403).json({ message: 'User not authorized' });
    }
    */

    try {
        const qrData = `${process.env.FRONT_DOMAIN}/${process.env.FRONT_ITEM_ROUTE}/${itemId}`;
        const qrCode = await QrCode.toDataURL(qrData);
        // Ok
        return res.status(200).json({ qrCode });
    } catch (err) {
        // Internal Server Error
        return res.status(500).json({ message: 'Failed to generate QR code', error: err.message });
    }
};

exports.getOwnedItems = async (req, res) => {

    if (!(await User.checkToken(req.body.userId, req.body.token))) {
        // Forbidden
        return res.status(403).json({ message: 'User not authorized' });
    }

    const items = await Item.getItemsByOwner(req.body.userId);
    // Ok
    return res.status(200).json({ message: 'Ok', items: items });
};

exports.getItemInfo = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.body.userId || '';
    let itemInfo = await Item.findById(itemId);

    if (!itemInfo) {
        // Not Found
        return res.status(404).json({ message: 'Item not found' });
    }

    const isOwner = itemInfo.owner == userId;
    const isTokenValid = await User.checkToken(userId, req.body.token);

    if (isOwner && isTokenValid) {
        // Ok
        itemInfo = await replaceIds(itemInfo);
        return res.status(200).json({ item: itemInfo });
    }

    if (itemInfo.isPrivate) {
        if (!userId) {
            // Forbidden
            return res.status(403).json({ message: 'User not authorized' });
        }

        const localUser = await User.findById(userId);

        if (localUser && itemInfo.includes(localUser.email) && isTokenValid) {
            const sanitized = sanitizeInfo(itemInfo);
            // Ok
            return res.status(200).json({ item: sanitized });
        }
        // Forbidden
        return res.status(403).json({ message: 'User not authorized' });
    }

    const sanitized = sanitizeInfo(itemInfo);
    // Ok
    return res.status(200).json({ item: sanitized });
};


exports.createItem = async (req, res) => {

    if (!(await User.checkToken(req.body.userId, req.body.token))) {
        // Forbidden
        return res.status(403).json({ message: 'User not authorized' });
    }

    const newItem = await Item.create({
        name: req.body.name,
        owner: req.body.userId,
        callenderData: req.body.callenderData,
        isPrivate: req.body.isPrivate,
        content: req.body.content
    });

    // Ok
    res.status(200).json({ message: 'New item created' });
}

exports.updateAuthorizedUsers = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.body.userId || '';
    const authorizedUsersFlat = req.body.authorizedUsers.flat(Infinity);

    let itemInfo = await Item.findById(itemId);
    let isForCallender = !!req.body.forCalender;

    if (!Array.isArray(req.body.authorizedUsers)) {
        // Bad Request
        return res.status(400).json({ message: 'authorizedUsers was set incorectly. It should be flat array' });
    }

    let usersToSet = [];

    for (const email of authorizedUsersFlat) {
        const userId = await User.getUserIdByMail(email);
        if (userId) usersToSet.push(userId._id);
    }

    if (!itemInfo) {
        // Not Found
        return res.status(404).json({ message: 'Item not found' });
    }

    const isOwner = itemInfo.owner == userId;
    const isTokenValid = await User.checkToken(userId, req.body.token);

    if (isOwner && isTokenValid) {
        if (isForCallender) {
            await Item.replaceAuthorizedCallenderUsers(itemId, usersToSet);
            // Ok
            return res.status(200).json({ message: 'Authorized Callender users was updated' });
        }
        await Item.replaceAuthorizedUsers(itemId, usersToSet);
        // Ok
        return res.status(200).json({ message: 'Authorized users was updated' });
    }
};

exports.updateItem = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.body.userId || '';

    const itemInfo = await Item.model.findById(itemId).select('_id owner');

    if (!itemInfo) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const isOwner = itemInfo.owner == userId;
    const isTokenValid = await User.checkToken(userId, req.body.token);

    if (isOwner && isTokenValid) {
        await Item.model.findByIdAndUpdate(itemId, {
            name: req.body.name,
            isPrivate: req.body.isPrivate,
            content: req.body.content
        });

        return res.json({ success: true, message: 'Item updated successfully.' });
    } else {
        return res.status(403).json({ message: 'Unauthorized or invalid token.' });
    }
};


const sanitizeInfo = (info) => {
    info.owner = '';
    info.callenderData = '';
    info.authorizedCallenderUsers = '';
    info.authorizedUsers = '';
    return info;
}

const replaceIds = async (info) => {
    const authorizedUsersEmail = [];
    const authorizedCallenderUsersEmail = [];

    for (const id of info.authorizedUsers) {
        const email = await User.getUserEmailById(id);
        if (email) {
            authorizedUsersEmail.push(email.email);
        }
    }

    for (const id of info.authorizedCallenderUsers) {
        const email = await User.getUserEmailById(id);
        if (email) {
            authorizedCallenderUsersEmail.push(email.email);
        }
    }

    info.authorizedUsers = authorizedUsersEmail;
    info.authorizedCallenderUsers = authorizedCallenderUsersEmail;

    return info;
}