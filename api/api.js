const express = require('express');
const bodyParser = require('body-parser');
const ds = require('./db-datastore.js');
const cors = require('cors');
const api = express.Router();

api.use(cors());
api.use(express.json());

//Catch DELETE request
api.delete('/api/:name', async(req, res) => {
    try{
        await ds.delete(req.params.name)
        res.sendStatus(204)
    }catch(err){
        res.sendStatus(400)
    }
});

//Catch POST request
api.post('/api/:name', bodyParser.text(), async(req, res) => {
    try{
        let db = await ds.list(req.params.name)
        //check if req.body content is number and convert it.
        let number = (!isNaN(parseInt(req.body))) ? parseInt(req.body) : (!isNaN(parseFloat(req.body))) ? parseFloat(req.body) : 0
        //check if name already exists in database.
        if(db.length !== 0){
                    let data = {
                        name: req.params.name,
                        val: JSON.stringify(JSON.parse(db[0].val) + number)
                    }
                    await ds.put(data)
                    res.send(data.val)
            
        }else{
            await ds.put({
                name: req.params.name,
                val: JSON.stringify(number)
            })
            res.send(JSON.stringify(number)) 
        }
    }catch(err){
        res.sendStatus(400)
    }
    
});

//Catch GET request
api.get('/api/:name', bodyParser.text(), async(req, res) => {
    try{
        let db = await ds.list(req.params.name)
        //check if name already exists in database.
        if(db.length !== 0){
            res.send(db[0].val)
    
        }else{
            res.send('0')  
        }
    }catch(err){
        res.sendStatus(400)
    }
    
});

//Catch PUT request
api.put('/api/:name', bodyParser.text(), async(req, res) => {
    try{
        //check if req.body content is number and convert it.
        let number = (!isNaN(parseInt(req.body))) ? parseInt(req.body) : (!isNaN(parseFloat(req.body))) ? parseFloat(req.body) : 0
                    let data = {
                        name: req.params.name,
                        val: JSON.stringify(number)
                    }
                    await ds.put(data)
                    res.send(data.val)
    }catch(err){
        res.sendStatus(400)
    }
});

//Export api
module.exports = api;