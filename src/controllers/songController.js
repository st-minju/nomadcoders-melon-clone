import Song from "../models/Song";
import User from "../models/User";

// onclick() = clickPlayBtn = async ({id, listener}) => {
//     await Song.updateOne({_id: id},{$set: {listener: listener+1}});
//     console.log(Song.findOne({id:_id}));
// }

export const updateChart = async(req, res) => {
  const {id: id} = req.params;
  const songFind = await Song.findOne({_id: id});
  songFind.listener += 1;
  await songFind.save(); 
  const song = await Song.find().sort({"listener":-1});
  return await res.render("chart",{ pageTitle: "Home" , song} );
};


export const home = async (req, res) => {
    //await Song.updateMany({}, {$set: {listener: 0}});
    const song = await Song.find().sort({"listener":-1}); //노래 목록을 listener를 기준으로 desc 정렬 후 출력
    console.log(song);

  return res.render("home", { pageTitle: "Home" , song});
};
