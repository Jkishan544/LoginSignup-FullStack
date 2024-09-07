const express = require('express');
const app = express();
const bodyParser = require('body-parser');   //to take user pass 
const cors = require('cors');           //accesable to everyone allow 8000 port from 3000 port request
const AuthRouter = require('./Routes/AuthRouter');

require ('dotenv').config();
require('./Models/db');
 
app.get('/',(req,res)=>{
     res.send("Home page")
})
// app.get('*',(req,res)=>{
//     res.send('Other Page')
// })

app.use(bodyParser.json());
app.use(cors());
app.use('', AuthRouter)

app.listen(8000 , () =>  {
    console.log(`server is runing `)
})

// const http = require('http')


//  const Server =  http.createServer((req,res)=>{
    
//     if(req.url == '/')
//     {
//       res.end("Hello from home page")
//     }
//     else{
//         res.end("Hello from Other page")
//     }

// })

// Server.listen(8000,()=>{console.log("Server Started")})
