const model = require('../models/index')
const helper = require('../helpers/help')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const friends = {
    myFriends: (req, res) => {
        const idLogin = req.users.userId
        model.friends.findAll({
            include: [{
                model: model.users,
                attributes: ['name', 'images'],
            }],
            attributes: ['idFriend', 'message'],
            where: { idLogin: idLogin }
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'get my friends')
            })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })
    },
    add: (req, res) => {
        const data = req.body
         data.idLogin = req.users.userId
        model.friends.bulkCreate([{ idLogin: data.idLogin, idFriend: data.idFriend }, { idLogin: data.idFriend, idFriend: data.idLogin } ])
            .then((result) => {
                return helper.response('success', res, result, 200, 'add friends successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
    update: (req, res) => {
        const data = req.body
        data.idLogin = req.users.userId
        console.log(data)
        model.friends.update({ message: data.message }, {
            where: { 
                [Op.or]: [
                { idLogin: data.idFriend, idFriend: data.idLogin }, 
                { idLogin: data.idLogin, idFriend: data.idFriend } 
                ]
            }
        })
        .then((result) => {
            return helper.response('success', res, result, 200, 'successfully')
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
}
module.exports = friends