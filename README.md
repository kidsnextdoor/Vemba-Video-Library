# Vemba-Video-Library
RESTFUL API FOR OPERATION ON Vemba VIDEOS LIBRARY

#LANGUAGE USED
NODE JS 

#DATABASE USED
MONGODB

#server.js
Replace the mongoose.connect url with your local mongo db connection link
i.e mongodb://127.0.0.1:27017/{name of the dB}
example:- mongodb://127.0.0.1:27017/Vemba

# POSTMASTER
#Install postman in the local device to do all the operation of the REST api

#The data for the video can be post using the params i.e (key-value pairs) in the postmaster application

#The data for the playlist can be post using the raw JASON in the body part of the postmaster application

# INSTRUCTION TO RUN THE APP

#first run the server.js i.e Nodemon server.js

#Open the postmaster then past the url http://127.0.0.1:3000/api/

#the videos and playlist are insite api i.e http://127.0.0.1:3000/api/videos for accessing the videos and http://127.0.0.1:3000/api/playlist for accessing the playlist

#for posting videos enter the data in the params.

#for posting the playlist enter the data as raw json.

# Structure of the video collection
#It contains 4 field

->title

->thumbnailUrl

->videoUrl

->duration

# Structure of the playlist collection
#It contains 3 fields

->name

->video   ---  the value of this is an array example ["1","2","3"...] . It will the only those videos id which are in the video collection, otherwise it will shoe the message the video is not present in the video library.

->websiteUrl

# Logic Folder
#the code for shuffling playlist is in the shufflilingList.js 

#whenever a playlist is creted and when we want to get the data of the playlist, every time it will shuffle the playlist videos
