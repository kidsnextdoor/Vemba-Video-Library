
exports.imageUrlCheck = function(str)
{
    console.log(str);
    var i = str.match(/\.png|\.jpg|\.jpeg|\.gif/i);
    if(i)
        return true;
    else
        return false;
}

exports.videoUrlCheck = function(str){
    console.log(str);
    var i = str.match(/\.mp4|\.hls|\.mkv/i);
    if(i)
        return true;
    else
        return false;
}

