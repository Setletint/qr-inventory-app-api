const Item = require('../models/item');
const User = require('../models/user');


exports.getOwnedItems = async (req, res) => {

    if (!(await User.checkToken(req.body.userId, req.body.token))) {
        // Forbidden
        return res.status(403).json({message: 'User not authorized'});
    }

    const items = await Item.getItemsByOwner(req.body.userId);
    // Ok
    return res.status(200).json({message: 'Ok' ,items: items });
};

exports.getItemInfo = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.body.userId || '';
    const itemInfo = await Item.findById(itemId);

    if (itemInfo.owner == userId) {

        if (await User.checkToken(userId, req.body.token)) {
         return res.status(200).json({item: itemInfo});
        }
     }

    if (itemInfo.isPrivate) {
        // TODO: handle private item
    }

    itemInfo = sanitizeInfo(itemInfo);
    return res.status(200).json({item: itemInfo});
}

exports.createItem = async (req,res) => {

    if (!(await User.checkToken(req.body.userId, req.body.token))) {
        // Forbidden
        return res.status(403).json({message: 'User not authorized'});
    }

    const newItem = await Item.create({
        name: req.body.name,
        owner: req.body.userId,
        callenderData: req.body.callenderData,
        isPrivate: req.body.isPrivate,
        content: req.body.content
    });

    res.status(200).json({message: 'New item created'});
}

const sanitizeInfo = (info) => {
    info.owner = '';
    info.callenderData = '';
    info.authorizedCallenderUsers = '';
    info.authorizedUsers = '';
    return info;
}