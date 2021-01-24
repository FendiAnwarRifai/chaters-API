const model = require('../models/index')
const helper = require('../helpers/help')
const Sequelize = require('sequelize')
const fs = require('fs')
const Op = Sequelize.Op
const chat = {
    getAll: (req, res) => {
    	const idLogin = req.users.userId
        model.users.findAll({
        	where: {id: {[Op.ne]: idLogin} }
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'get all users')
            })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })

    },
    history_chat: (req,res) => {
        const data = req.query
        model.history_chat.findAll({
            where: { 
                [Op.or]: [
                    { senderId: data.idOne, receiverId: data.idTwo }, 
                    { senderId: data.idTwo, receiverId: data.idOne } 
                ]
             }
        }).then((result) => {
            return helper.response('success', res, result, 200, 'get history chat')
        })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })
    },
    userById: (req, res) => {
        const idUser = req.params.id
        model.users.findAll({
            where: { id: idUser }
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'get users by id')
            })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })
    },
    updateUser: (req, res) => {

        let data = req.body
        const userId = req.params.id
        data = JSON.parse(JSON.stringify(data))
        if (!req.file) {
            data.updatedAt = new Date()
        }
        else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
        }
        else if (req.file.size >= 4388608) {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Image size is too large, it must be under 4MB')
        } else {
            data.images = `${process.env.BASE_URL}/images/${req.file.filename}`
            // process delete image on folder server
            model.users.findAll({
                attributes: ['id', 'images'],
                where: { id: userId }
            })
            .then((result) => {
                const images = result[0].dataValues.images
                if (images !== 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png') {
                    const pict = images.split('/')[4]
                    const path = `./images/${pict}`

                    fs.unlinkSync(path)
                }
            })
        }
        model.users.update(data, {
            where: {
                id: userId
            }
        })
            .then((result) => {
                if (result[0] === 0) {
                    return helper.response('warning', res, null, 200, 'Id Not Found')
                }
                return helper.response('success', res, data, 200, 'data was updated successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }
}
module.exports = chat