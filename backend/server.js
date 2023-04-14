const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())
app.use(cors())

app.listen(8080, () => console.log(8080))

mongoose.connect("mongodb+srv://root:root@mongodb.e65qray.mongodb.net/redux")

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

const User = mongoose.model("User", userSchema)

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (user && await bcrypt.hash(password.toString(), user.password)) {
            res.json({ user })
        } if (await bcrypt.hash(password, user.password) !== true) {
            res.json({ user: false })
        }
    } catch (error) {
        console.log(error.message)
    }
})