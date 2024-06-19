const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')
const useRoute = require('./routes/userRoutes')
const path = require('path')

//rest object
const app = express()

dotenv.config({path : './config.env'})


//databaseCall
connectDb();
//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//user routes
app.use('/api/v1/users',useRoute)

//transaction routes
app.use('/api/v1/transaction',require("./routes/transactionRoutes"))

//for hosting
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
       res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
const PORT = process.env.PORT

//LISTEN
app.listen(PORT,()=>{
    console.log(`Server is live on port ${PORT}`);
})
