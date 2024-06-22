const express = require('express');
require('dotenv').config();
const { dbConnnection } = require('./database/config');
const cors = require('cors')

const app = express();

dbConnnection();

app.use(cors());

app.use( express.static('public') );

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));

app.use('/api/event',require('./routes/events'));

app.listen(process.env.PORT, () =>{
    console.log('servidor arriba');
});