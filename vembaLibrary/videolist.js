const videolist = require('express').Router();
const Playlist = require('../models/playlist');
const Video = require('../models/videos');
const shuffle = require('../logic/shufflingPlaylist');
//const valid = require('../logic/objectValid');

//Getting the list of playlist 
videolist.get('/playlist', async (request, response, next)=>{
    try {
        await Playlist.find().populate('video').exec((error,pp)=>{
            response.send(pp);
        });
    } catch (error) {
        
    }
});

//getting a specific playlist
videolist.get('/playlist/:playid', (request, response, next)=>{
    if (request.params.playid.match(/^[0-9a-fA-F]{24}$/)) {
        Playlist.findOne({_id:request.params.playid}).populate('video').exec((error,pp)=>{
            var arr = shuffle(pp.video);
            response.send(arr,null,"\t");
        })
    }else response.send("Please give a valid playlist id");
});

//Creating a playlist
videolist.post('/playlist', async (request, response, next)=>{
    request.body.websiteUrl = request.body.websiteUrl.replace(/\s/g,"%20");
    console.log(request.body);
    try {
        var idArr = request.body.video,flag=0,k;
        for(i=0;i<idArr.length;i++)
        {
            await Video.findOne({_id:idArr[i]}).then((video)=>{
                if(video == null){ 
                    flag++;
                    k=i;
                 }
            });
        }
        if(flag == 0){
           Playlist.create(request.body).then((todo)=>{
           response.send(todo);
        });
    }else{
       response.send("The video with id "+idArr[k]+" is not present in the video library");
    }
    } catch (error) {
        response.status(500);
    }
});

//updating the playlist
videolist.put('/playlist/:playid',async (request, response, next)=>{
    try {
        if (request.params.playid.match(/^[0-9a-fA-F]{24}$/)){
            var idArr = request.body.video,flag=0,k;
            for(i=0;i<idArr.length;i++)
            {
                await Video.findOne({_id:idArr[i]}).then((video)=>{
                    if(video == null){ 
                        flag++;
                        k=i;
                     }
                });
            }
            if(flag == 0){
                Playlist.findByIdAndUpdate({_id:request.params.playid},request.body).then((playlist)=>{
                    response.send(playlist);
                });
         }else{
            response.send("The video with id "+idArr[k]+" is invalid");
         }
        }
        else response.send("Please give a valid playlist id");
    } catch (error) {
        response.status(500);
    }
});

//deleting a playlist
videolist.delete('/playlist/:playid', (request, response, next)=>{
    if (request.params.playid.match(/^[0-9a-fA-F]{24}$/)) {
        Playlist.findByIdAndRemove({_id:request.params.playid}).then((playlist)=>{
            response.send("The playlist with id "+ playlist._id +" is successfully deleted");
        });
    }else response.send("Please give a valid playlist id");
});

module.exports = videolist;