import Song from "../models/Song";
import User from "../models/User";

// onclick() = clickPlayBtn = async ({id, listener}) => {
//     await Song.updateOne({_id: id},{$set: {listener: listener+1}});
//     console.log(Song.findOne({id:_id}));
// }

export const home = async (req, res) => {
//await Song.updateMany({}, {$set: {listener: 0}});
    const song = await Song.find().sort({"listener":-1});
    console.log(song);

  return res.render("home", { pageTitle: "Home" , song});
};
