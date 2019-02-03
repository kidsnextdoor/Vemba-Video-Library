//setting up the router function in express
const routers = require('express').Router();
const Video = require('../models/videos');
const check = require('../logic/urlCheck')

//Retrieve videos from the db using get request
routers.get('/videos',(request, response, error)=>{
    Video.find().then((video)=>{
        response.send(video);
    });
});

//Retrieve videos from the db using get request by id
routers.get('/videos/:id',(request, response, error)=>{
    if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Video.findOne({_id:request.params.id}).then((video)=>{
            if(video == null){ response.send("NO MATCH FOUND");}
            else response.send(video);
    });
}else  response.send("Please enter a valid video id");
});

//creating data into the db using post request
routers.post('/videos',(request, response, error)=>{
    request.body.title = request.query.title;
    request.body.thumbnailUrl = request.query.thumbnailUrl.replace(/\s/g,"%20");
    request.body.videoUrl = request.query.videoUrl.replace(/\s/g,"%20");
    request.body.duration = request.query.duration;

    if(check.imageUrlCheck(request.body.thumbnailUrl) == true)
    {
        if(check.videoUrlCheck(request.body.videoUrl) == true)
        {
                 //console.log(request.body);
                Video.create(request.body).then((video)=>{
                response.send(video);
                }).catch(error);
        }
        else{
            response.send('Please evter a valid video URL');
        }
    }
    else{ response.send('Please evter a valid thumbnail URL') }
});

//updating data in the db using put request
routers.put('/videos/:id',(request, response, error)=>{
    if (request.params.id.match(/^[0-9a-fA-F]{24}$/)){
        request.body.title = request.query.title;
        request.body.thumbnailUrl = request.query.thumbnailUrl;
        request.body.videoUrl = request.query.videoUrl;
        request.body.duration = request.query.duration;
        Video.findByIdAndUpdate({_id:request.params.id},request.body).then(()=>{
            Video.findOne({_id:request.params.id}).then((video)=>{
            response.send(video);
        });
    });
}else response.send("Please enter a valid video id");
});

//deleteing data in the db using delete request
routers.delete('/videos/:id',(request, response, error)=>{
    if (request.params.id.match(/^[0-9a-fA-F]{24}$/)){
    Video.findByIdAndRemove({_id:request.params.id}).then((video)=>{
        response.send("Video with id "+video._id+" is successfully deleted");
    }).catch(error);
}else  response.send("Please enter a valid video id");
});


//exporting this module for others to use
module.exports = routers;


