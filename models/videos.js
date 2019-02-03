//importing the db module
const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const Schema = mongoose.Schema;

//creating video schema structure
const VideoSchema = new Schema({
    title:{
        type:String,
        require:[true, 'Video title is required']
    },
    thumbnailUrl:{
        type:String,
        require:[true, 'Please enter the video tumbnail'],
        validate: [
            validators.isURL({message: 'Must be a Valid URL', protocols:['http','https','ftp'], require_tld: true, require_protocol: true})
        ]
    },
    videoUrl:{
        type:String,
        require:[true, 'Please enter the video url'],
        validate: [
            validators.isURL({message: 'Must be a Valid URL', protocols:['http','https'], require_tld: true, require_protocol: true})
        ]
    },
    duration:{
        type:Number,
        require:[true, 'Please enter the video duration']
    }
});



//creating the collection in the db i.e model
const Video = mongoose.model('video', VideoSchema);


//exporting so that other module can use Video
module.exports = Video;

