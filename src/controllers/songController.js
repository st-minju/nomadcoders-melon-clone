import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
   const song = await Song.find(function(error, songs){
     //console.log('--- Read all ---');
     if(error){
         console.log(error);
     }else{
         console.log(songs);
     }
 });
// 8. Student 체를 new 로 생성해서 값을 입력
/*
var newSong = new Song(
  {song: "Timelapse", 
                          artist: "The Mountain", 
                          album_image:"https://cdn.pixabay.com/audio/2023/03/12/15-41-52-677_200x200.jpg",
                          music: "https://cdn.pixabay.com/audio/2021/10/25/audio_f7f75a3ad5.mp3"
  });

// 9. 데이터 저장
newSong.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});*/
  return res.render("home", { pageTitle: "Home" , song});
};
