const express = require('express')
const connectData = require('./crowdfunding_db');

const app = express();
const port = 3000


app.get('/allData',async (req,res) => {
    try{
        const connect = await connectData();
        const [rows, fields] = await connect.execute('SELECT * FROM fundraiser')
        console.log(rows)
        res.send({
            code: 200,
            data: rows
        })
    } catch (e) {
        console.log(e)
    }
})



app.get('/allTypeData',async (req,res) => {
    try{
        const connect = await connectData();
        const [rows, fields] = await connect.execute('SELECT * FROM category')
        console.log(rows)
        res.send({
            code: 200,
            data: rows
        })
    } catch (e) {
        console.log(e)
    }
})



app.listen(port,() => {
    console.log('------' + port)
})