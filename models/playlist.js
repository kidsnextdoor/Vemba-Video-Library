const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const Schema = mongoose.Schema;

//creating playlist schema structure 
const playlistSchema = new Schema({
    name:{
        type: String,
        required: [true,'Please give a name for the playlist']
    },
    video:[{type: mongoose.Schema.Types.ObjectId , ref:'video'}],
    websiteUrl:{
        type: String,
        required: [true,'Please give the path where the playlist will be placed'],
        validate:[  validators.isURL({message: 'Must be a Valid Website URL', protocols:['http','https'], require_tld: true, require_protocol: true}) ]
    }

});

//creating the playlist collection in the db i.e model
const Playlist = mongoose.model('playlist', playlistSchema);


module.exports = Playlist;