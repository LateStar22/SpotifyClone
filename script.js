console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gifId');
let masterSongName = document.getElementById('masterSongName');
masterSongName.innerHTML = 'Ram Siya Ram';
let songitem = Array.from(document.getElementsByClassName('songItem'));


// we can ommit this as i have already mentioned song name and duration in html itself.
let songs = [
    {songName :"Ram Siya Ram", filePath : "1.mp3", coverpath : "RamSiyaRam.jpg"},
    {songName :"Dil Ka Dariya", filePath : "2.mp3", coverpath : "Kabir.jpg"},
    {songName :"Udd Ja Kaale Kawa", filePath : "3.mp3", coverpath : "Gadar.jpg"},
    {songName :"Humsafar", filePath : "4.mp3", coverpath : "Humsafar.jpg"},
    {songName :"Chakkwein Suit", filePath : "5.mp3", coverpath : "Suit.jpg"},
    {songName :"Aarambh", filePath : "6.mp3", coverpath : "Aarambh.jpg"}
]


songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// *******************************************************

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

// Specific song play/ pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e) => {
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        audioElement.src = `${songIndex + 1}.mp3`;
        if(audioElement.paused || audioElement.currentTime == 0)
        {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterSongName.innerHTML = `${songs[songIndex].songName}`;
            audioElement.currentTime = 0;
            audioElement.play();
            // audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            console.log(123);
        }
        else{
            audioElement.pause();
            // progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
            // audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
            // myProgressBar.value = progress;
        }
    })
})



//handle play pause click(MASTER PLAY/PAUSE)
masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime == 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        makeAllPlay();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    console.log(456);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('click',() =>{
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    console.log(789);
})


// NEXT and PREVIOUS SONGS:
document.getElementById('previous').addEventListener('click',() => {
    if(songIndex >= 1 && songIndex <= 5)
    {
        songIndex --;
        audioElement.src = `${songIndex + 1}.mp3`;
        masterSongName.innerHTML = `${songs[songIndex].songName}`;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        nextSongArray[songIndex].classList.remove('fa-circle-play');
        nextSongArray[songIndex].classList.add('fa-circle-pause');
        nextSongArray[songIndex + 1].classList.remove('fa-circle-pause');
        nextSongArray[songIndex + 1].classList.add('fa-circle-play');
        audioElement.play();
    }else if(songIndex == 0)
    {
        songIndex = 5;
        nextSongArray[0].classList.remove('fa-circle-pause');
        nextSongArray[0].classList.add('fa-circle-play');
        nextSongArray[5].classList.remove('fa-circle-play');
        nextSongArray[5].classList.add('fa-circle-pause');
        audioElement.src = `${songIndex + 1}.mp3`;
        audioElement.play();
    }
})

let nextSongArray = Array.from(document.getElementsByClassName('songItemPlay'));
document.getElementById('next').addEventListener('click',() => {
    if(songIndex >= 0 && songIndex <= 4)
    {
        songIndex ++;
        audioElement.src = `${songIndex + 1}.mp3`;
        masterSongName.innerHTML = `${songs[songIndex].songName}`;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        nextSongArray[songIndex].classList.remove('fa-circle-play');
        nextSongArray[songIndex].classList.add('fa-circle-pause');
        nextSongArray[songIndex - 1].classList.remove('fa-circle-pause');
        nextSongArray[songIndex - 1].classList.add('fa-circle-play');
        
        audioElement.play();
    }else if(songIndex == 5)
    {
        songIndex = 0;
  
            nextSongArray[0].classList.remove('fa-circle-play');
            nextSongArray[0].classList.add('fa-circle-pause');
            nextSongArray[5].classList.remove('fa-circle-pause');
            nextSongArray[5].classList.add('fa-circle-play');
        audioElement.src = `${songIndex + 1}.mp3`;
        audioElement.play();
    }
})

