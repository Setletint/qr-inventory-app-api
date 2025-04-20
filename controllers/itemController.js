const item = require('../models/item');
const user = require('../models/user');


exports.getOwnedItems = async (req, res) => {

    if (!(await user.checkToken(req.body.userId, req.body.token))) {
        // Forbidden
        return res.status(403).json({message: 'User not authorized'});
    }

    const items = await item.getItemsByOwner(req.body.userId);
    // Ok
    return res.status(200).json({message: 'Ok' ,items: items });
};

exports.createItem = async (req,res) => {

    if (!(await user.checkToken(req.body.userId, req.body.token))) {
        // Forbidden
        return res.status(403).json({message: 'User not authorized'});
    }

    const item = await item.create({
        name: req.body.name,
        owner: req.body.userId,
        callenderData: req.body.callenderData,
        content: req.body.content
    });
}