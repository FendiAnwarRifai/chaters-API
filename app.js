require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT
const morgan = require('morgan')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./src/routes/index')
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const { emit } = require('process')
const model = require('./src/models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/images', express.static('./images'))
// initial socket
const io = socket(server, {
	cors: {
		origin: '*'
	}
})
// untuk socket
let statusUser = []
io.on("connection", (socket) => {
	console.log('ada client yang connect ' + socket.id)
	let idLogin = ''

	socket.on('clientLogin', (data) => {
		idLogin = data.idLogin
		statusUser.push(data.idLogin)
		io.emit('userStatus', { cekStatus: statusUser})

		socket.join('room:'+data.idLogin)
		console.log('join ' + data.idLogin)

	})

	socket.on('initialUser', (dataUser)=>{
    socket.join(['room:'+dataUser.idpengirim+''+dataUser.idpenerima, 'room:'+dataUser.idpenerima+''+dataUser.idpengirim])
    console.log('join '+dataUser.idpengirim)
  })

	socket.on('reciverMessage',(data)=>{
		data.status = 'dikirim'
		data.date = new Date()
		socket.broadcast.to('room:' + data.idpenerima).emit('cektoast',data)
		socket.broadcast.to('room:'+data.idpengirim+''+data.idpenerima).to('room:'+data.idpenerima+''+data.idpengirim).emit('kirimKembali',data)
		delete data.status
		socket.emit('kirimKembali', data)
		const payload  = {
			senderId: data.idpengirim,
			receiverId: data.idpenerima,
			messages: data.messages,
			date: new Date()
		}
		model.history_chat.create(payload)
		model.friends.findAll({
			where: { idLogin: data.idpengirim, idFriend: data.idpenerima }
		})
			.then((result) => {
				if (result.length === 0) {
					model.friends.bulkCreate([
						{ idLogin: data.idpengirim, idFriend: data.idpenerima, message: data.messages },
						{ idLogin: data.idpenerima, idFriend: data.idpengirim, message: data.messages }])
				} else if (result.length !== 0) {
					model.friends.update({ message: data.messages }, {
						where: {
							[Op.or]: [
								{ idLogin: data.idpenerima, idFriend: data.idpengirim },
								{ idLogin: data.idpengirim, idFriend: data.idpenerima }
							]
						}
					})
				}
			})
	})
	socket.on("clientLogout", (idUserLogin) => {
		socket.disconnect()
	})

	socket.on("disconnect", () => {
		const payload = {
			status: 'offline',
			updatedAt: new Date()
		}
		model.users.update(payload, {
			where: {
				id: idLogin
			}
		}).then((res)=>{
			console.log(res)
		})
		statusUser = statusUser.filter(item => item !== idLogin)
		io.emit('userStatus', { cekStatus: statusUser })
		io.emit('userDisconnect')
		console.log('clien terputus')
	})
})
// routes
app.use('/api', router)
server.listen(PORT, () => console.log(`server is running port ${PORT}
	http://localhost:${PORT}`))
