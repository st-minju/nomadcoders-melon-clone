const footer = document.getElementsByTagName("footer")[0];
const pauseBtn = document.getElementsByClassName("pauseBtn")[0];
const playBtn = document.getElementsByClassName("playBtn")[0];
const image = document.getElementsByClassName("album_image")[0].style;
const title = document.getElementsByClassName("title")[0];
const artist = document.getElementsByClassName("artist")[0];
const lp = document.getElementsByClassName("LP")[0].classList;
const bList = document.getElementsByClassName("bList")[0];
const currentBar = document.getElementsByClassName("current-bar")[0];
const progressTime = document.getElementsByClassName("progressTime")[0];
const runningBar = document.getElementsByClassName("runningBar")[0];
const seekBar = document.getElementsByClassName("seek-bar")[0];
const seekTime = document.getElementsByClassName("seek-time")[0];

const audio = new Audio();
const songArray = [];
var nowPlaying = songArray.length;
var totalTime;

// 플레이어창에 재생할 노래 로드
function loadSong(song){
    //if(document.getElementsByTagName("footer")[0].classList != '')
    footer.classList = "playing";
    image.backgroundImage =`url('${JSON.parse(song).album_image}')`;
    image.backgroundSize = "50px 50px";
    image.zIndex = "1";
    title.innerHTML = `${JSON.parse(song).song}`;
    artist.innerHTML = `${JSON.parse(song).artist}`;

    audio.src = `${JSON.parse(song).music}`;

    
    audio.addEventListener("loadeddata", ()=>{
        runningBar.style = "display: unset;"
        var audioDuration = audio.duration;
        var totalMin = Math.floor(audioDuration / 60);
        var totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) totalSec = `0${totalSec}`;

        totalTime = `${totalMin}:${totalSec}`;
    })

    playSong();

    var check = false;
    for(var i=0; i < songArray.length ; i++){
        if(songArray[i]._id === JSON.parse(song)._id){
            check = true;
            nowPlaying = i;
            break;
        }
        else nowPlaying = songArray.length;
    }
    if(check == false) {
        songArray.push(JSON.parse(song));
    }
    //console.log(songArray);
}

//플레이어에서 노래 재생
function playSong(){
    if(footer.classList.contains("playing")){
        image.zIndex = "1";
        lp.add("lpLoad");
        playBtn.classList.add("pauseBtn");
        playBtn.src = "/main/svg/pause.svg";
        audio.play();
        setTimeout(function() { lp.remove("lpLoad");}, 800);
        setTimeout(function() { lp.add("lpPlaying");}, 1000);

    }
    
}


// 일시정지
function pauseSong() {
    if(playBtn.classList.contains("pauseBtn")){
        console.log("pause");
        audio.pause();
        playBtn.classList.remove("pauseBtn");
        playBtn.src = "/main/svg/play.svg";
        image.zIndex = "50";
        lp.remove("lpPlaying");
        lp.add("lpLoad");
        setTimeout(function() { lp.remove("lpLoad");}, 800);
    }
    else playSong();

}

// 이전 곡 재생
function prevPlay(){
    if(nowPlaying === 0)
        loadSong(JSON.stringify(songArray[songArray.length-1]));
    else
        loadSong(JSON.stringify(songArray[nowPlaying-1]));
}

// 다음 곡 재생
function nextPlay(){
    if(nowPlaying+1 ===  songArray.length)
        loadSong(JSON.stringify(songArray[0]));
    else
        loadSong(JSON.stringify(songArray[nowPlaying+1]));
}

// 음원 재생 길이
audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    var progressWidth = (currentTime/duration) * 100;
    currentBar.style.width = `${progressWidth}%`

    var currentMin = Math.floor(currentTime / 60);
    var currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    progressTime.innerText = `${currentMin}:${currentSec}` + ' / ' + totalTime;

    // 현재 곡 재생이 끝나면
    if(audio.ended){
        if(nowPlaying+1 < songArray.length){
            nextPlay();
        }
        else pauseSong();
        fetch(`/${songArray[nowPlaying]._id}/chart`, {method: "POST"})
    }
})

// 재생 위치 선택
runningBar.addEventListener("click", e=>{
    var progressWidth = runningBar.clientWidth;
    var clickedOffsetX = e.offsetX;
    var songDuration = audio.duration;
    
    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    
})
runningBar.addEventListener("mouseover" && "mousemove", e=>{
    var seekWidth = runningBar.clientWidth;
    var mouseOffsetX = e.offsetX;
    var songDuration = audio.duration;
    var seekingTime = (mouseOffsetX / seekWidth) * songDuration;

    var seekMin = Math.floor(seekingTime / 60);
    var seekSec = Math.floor(seekingTime % 60);
    if (seekSec < 10) seekSec = `0${seekSec}`;
    seekTime.innerText = `${seekMin}:${seekSec}`;
    seekTime.style = `left: ${mouseOffsetX-10}px;`;
    seekBar.style.width = `${mouseOffsetX}px`;
})    

runningBar.addEventListener("mouseout", e=>{
    seekTime.innerText = "";

    seekBar.style.width = 0;
})   

// 현재 재생 리스트 목록 보여주기 
function showList() {
    if(bList.classList.contains("playingList")){
        footer.style.height = "fit-content";
        bList.classList.remove("playingList");
    }
    else {
        footer.style.height = "100%";
        bList.classList.add("playingList");
        document.querySelector(".listTable").innerHTML='';
        
        for(var i=0; i < songArray.length ; i++){
            var table = `
                <tr onclick="playList('${songArray[i]._id}');">
                    <td style="width: 70px;">
                        <img src= ${songArray[i].album_image} height="50px">
                    </td>
                    <td> 
                        <p> ${songArray[i].song} </p>
                        <p> ${songArray[i].artist} </p>
                    </td>
                </tr>
            `;
        document.querySelector(".listTable").insertAdjacentHTML("beforeend", table);
        }
        
    }
}


// 재생 리스트에 있는 노래 재생
function playList(id){
    for(var i=0; i < songArray.length ; i++){
        if(songArray[i]._id === id 
            && title.innerHTML != songArray[i].song){
            //console.log(songArray[i]);
            loadSong(JSON.stringify(songArray[i]));
            break;
        }
    }
}