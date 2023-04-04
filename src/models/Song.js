import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    song: String,
    artist: String,
    album_image: String,
    music: String, 
    listener: Number},
    {collection: 'Song'}
);

songSchema.path('_id');

const Song = mongoose.model("Song", songSchema);
export default Song;
