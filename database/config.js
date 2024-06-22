const mongoose = require('mongoose');

const dbConnnection = async() => {
    try{

       await mongoose.connect(process.env.BD)

        console.log('DB online');

    }catch(error){
        throw new Error('error al conectarse a la base de datos');
    }
}

module.exports = {
    dbConnnection
}