const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        minlength: 20,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    role:{
        type: Number,
        required:true,
        default: 0
    },
    verfield:{
        type: Boolean,
        default:false
    }
});


mongoose.model('Users',UserSchema);