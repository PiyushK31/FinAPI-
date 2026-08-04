const accountModel = require("../model/account.model");

async function createAccountController(req, res) {

    const user = req.user;

    const account = await accountModel.create({
        user: user._Id
    })

    res.status(201).json({
        account
    })
}


module.exports = {
    createAccountController
}