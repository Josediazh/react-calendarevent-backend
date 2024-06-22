const {Schema,model } = require('mongoose');

const eventSchema = Schema({

    title: {
        type: String
    },
    start:{
        type: Date,
        required: true,
        
    },
    end:{
        type: Date,
        required: true,
    },
    notes:{
        type: String,
    },
    usr:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
},{ collection: 'eventos' });


eventSchema.method('toJSON',function(){
    const { _id,__v,...object } = this.toObject();
    object.id = _id;
    return object;
} )

module.exports = model('Evento',eventSchema);