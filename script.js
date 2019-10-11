

var musicOn = false;//загружено ли аудио 
var musicPlay = false;//проигрывается ли аудио 
var audio;//тег для музыки 
var allAudio=["Ragnar - I love u.mp3","Ragnar - My Life.mp3","Ragnar - Памяти Курта Кобейна.mp3","Ragnar - ПОЦ.mp3"];//пути для песен 
var numMusic = 0;// номер текущей песни(индекс в массиве)
var nameMusic = document.getElementById('nameMusic')//заголовок для плеера
var pol = document.getElementById('polos')//загрузка контейнера для полосы
var cl = document.getElementById('cl')//загрузка полосы плеера
var s_px = pol.offsetWidth;//сек/писель сколько секунд в пикселе ширины
var timeEnd;//длительность текущей песни

function sec() {
	var time = audio.currentTime
	var textMusic  = nameMusic.innerHTML
	if(time%60>10){
	nameMusic.innerHTML = textMusic.substring(0, textMusic.length - 4) + (~~(time/60)) +':'+ Math.round(time)%60;}else{
		nameMusic.innerHTML = textMusic.substring(0, textMusic.length - 4) + (~~(time/60)) +':0'+ Math.round(time)%60;
	}
}
function next(){
	if(allAudio.length!=numMusic+1) numMusic++; else numMusic=0
	musicOn = false;
	play()
}
function prev() {
	if(0!=numMusic) numMusic--; else numMusic=allAudio.length-1
	musicOn = false;
	play()
}
function play() {
	if(musicPlay){
		audio.pause();
		musicPlay=false;
	}
	music();
}
function music(){
	if(!musicOn) {
		audio = new Audio(allAudio[numMusic]); 
		musicOn = true; 
	document.getElementById('nameMusic').innerHTML = "Загрузка ..."
			var loaded = false;
	audio.addEventListener('canplay', function() {
	  loaded = true;
	 var str = allAudio[numMusic];
	 if(!loaded){document.getElementById('nameMusic').innerHTML = "Ошибка загрузки";return}
	 timeEnd = audio.duration
	nameMusic.innerHTML = str.substring(0, str.length - 4)+ '<br>'+ ~~(~~timeEnd/60) +':'+ Math.round(timeEnd)%60+"/0:00";
	 }, false);
	}

if(!musicPlay){
	audio.play();
	timer = setInterval(sec,1000)
	musicPlay = true;
	document.getElementById("play").className = "fa fa-pause";
}else{
	audio.pause();
	clearInterval(timer);
	musicPlay = false;
	document.getElementById("play").className = "fa fa-play";}
}




pol.onmousedown = function (event) {
	cl.style.width = event.offsetX+'px';
	event.preventDefault();
	pol.onmousemove = function(event){
		cl.style.width = event.offsetX+'px';
		document.onselectstart= function(){"return false"}
	} 
	document.onmouseup = function() {
    pol.onmousemove = null;
    document.onmouseup = null;}
}

