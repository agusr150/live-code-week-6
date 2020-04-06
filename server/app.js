const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const cors = require('cors')

const Router = require('./routes/router')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req,res)=>res.send('bisa kecetak'))

app.use('/', Router)


app.listen(port, ()=>console.log(`listening on port ${port}`))