const express = require('express')
const connectData = require('./crowdfunding_db');
const path = require('path')
const app = express();
const port = 3000


app.use(express.static(path.join(__dirname,'public')))
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

app.get('/getProgress', async (req,res) => {
    try{
        const connect = await connectData();
        const [rows, fields] = await connect.execute('SELECT * FROM fundraiser WHERE ACTIVE_CATEGORY_ID = 1')
        console.log(rows)
        res.send({
            code: 200,
            data: rows
        })
    } catch (e) {
        console.log(e)
    }
})

app.get('/getTypeData', async (req,res) => {
    try{
        const connect = await connectData();
        let conditions = [];
        let params = [];
        const {type, CAPTION, CITY } = req.query
        if (type !== null && type !== undefined && type !== '') {
            conditions.push('ACTIVE_CATEGORY_ID = ?');
            params.push(type);
        }
        if (CAPTION !== null && CAPTION !== undefined && CAPTION !== '') {
            conditions.push('CAPTION = ?');
            params.push(CAPTION);
        }
        if (CITY !== null && CITY !== undefined && CITY !== '') {
            conditions.push('CITY = ?');
            params.push(CITY);
        }
        let whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

        console.log(whereClause)
        const [rows, fields] = await connect.execute(`SELECT * FROM fundraiser ${whereClause}`,params)
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