var canvas = document.getElementById("peli");
					
var screenWidth = document.getElementById("poster").width;
var screenHeight = document.getElementById("poster").height;
		

//NETTISIVUN TAUSTAVÄRI 	#8DC4C6
//HOHTEEN VÄRI				#00F6FF
		
//Change the canvas size to match the poster image
canvas.width = screenWidth;
canvas.height = screenWidth * 0.25;

var context = canvas.getContext('2d');

addEventListener('click', clickFunction);

var singlePress = true;
function controllerdown(e){
	var evtobj=window.event? event : e 
	var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
	if (unicode==32) { 
		if (singlePress==true) {
			clickFunction(); 
			singlePress = false;
		}
	}
}
function controllerup(e){
	var evtobj=window.event? event : e 
	var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
	if (unicode==32) { 
	
		singlePress = true;
	}
}
//document.onkeypress=controller	//nappi action
document.onkeyup=controllerup		//nappi ylös
document.onkeydown=controllerdown	//nappi alas
	
context.fillStyle = "#A0A0CC";
context.fillRect(0,0,canvas.width, canvas.height);

var state = 1; //1 = game is running, 2 = game won

var kopteriImg = new Image();
var copterSprite = 1;

var copterHeight = canvas.height * 0.2;
var copterWidth = copterHeight * 1.8582;
var flyingHeight = canvas.height*0.3;

var copterX = 0;
var copterY = flyingHeight + copterHeight * 0.5;

var copterVelX = 5;
var copterVelY = 1; //velocity towards the sky


var kopteri1 = new Image();
kopteri1.src = "kopteri1.png";
var kopteri2 = new Image();
kopteri2.src = "kopteri2.png";
var kopteri3 = new Image();
kopteri3.src = "kopteri3.png";
var kopteri4 = new Image();
kopteri4.src = "kopteri4.png";


var uimariImg1 = new Image();
uimariImg1.src = "uimari1.png";
var uimariImg2 = new Image();
uimariImg2.src = "uimari2.png";
var uimariImg3 = new Image();
uimariImg3.src = "uimari3.png";
var uimariImg4 = new Image();
uimariImg4.src = "uimari4.png";
var uimariImgSaved = new Image();
uimariImgSaved.src = "uimariSaved.png";

var uimariImg = uimariImg1;
var saveCount = 0; //counts the saved uimarit

var uimariSprite = 1;
var uimariHeight = (2/3) * copterHeight;
var uimariWidth = uimariHeight * 0.8564;
var uimariSaved = [false, false, false, false, false];

var waterCenter = canvas.height * 0.8;
var waterLevel = waterCenter + uimariHeight* 0.25;
var waterVelY = 0;


var uimariX = [getSwimmerX(1), getSwimmerX(2), getSwimmerX(3), getSwimmerX(4), getSwimmerX(5)];	//Swimmer x position

var vesiImg = new Image();
vesiImg.src = "vesi.png";

var waterWidth = canvas.width / 2;
var waterHeight = waterWidth * 0.66086;

var bgImage = new Image();
bgImage.src = "waterbg.png";

var rengasImg = new Image();
rengasImg.src = "rengas.png";

var rengasCount = 0;
var rengasX = [];
var rengasY = [];
var rengasWidth = 1.16761 * uimariWidth;
var rengasHeight = rengasWidth * 0.7705;
var rengasState = []; //0 = ilmassa, 1 = vedessä, 2 = uimarilla

var winnerImg = new Image();
winnerImg.src = "winnertross.png";

var palautus = false;
var keltanen = true;
function muutos(){	
	movements();
	animations();
	if (state == 1) draw();
	if(state == 2) stopGame();
}

function stopGame() {	
	context.fillStyle = "#8DC4C6";
	context.fillRect(0,0,canvas.width, canvas.height);
	context.drawImage(winnerImg, 0, 0 ,canvas.height, canvas.height);
	context.font="30px Trebuchet MS";
	context.fillStyle = "#FFFFFF";
	context.fillText("Awesome! You saved everyone!",canvas.height * 1.5,canvas.height / 2);
	context.fillText("Hit rate: " + Math.round(500 / rengasCount)+"%",canvas.height * 1.5,canvas.height/2 + 30);
	
}

function reset() {
	
	state = 1;
	copterX = 0;
	copterY = flyingHeight + copterHeight * 0.5;
	copterVelY = 1;
	
	uimariX = [getSwimmerX(1), getSwimmerX(2), getSwimmerX(3), getSwimmerX(4), getSwimmerX(5)];	//Swimmer x position
	uimariSaved = [false, false, false, false, false];
	
	rengasCount = 0;
	rengasX = [];
	rengasY = [];
	rengasState = []; //0 = ilmassa, 1 = vedessä, 2 = uimarilla
	

}
var gloop;
var loopTime = 1000/30;  //30 fps
var runLoop = true;
var GameLoop = function(){
	muutos();
	if(runLoop == true){
		gLoop = setTimeout(GameLoop, loopTime );  
	}
}  
GameLoop();

function clickFunction() {
	if(state == 1) throwRengas();
	else if(state == 2) reset();
}

function throwRengas(){
	rengasState.push(0);
	rengasX.push(copterX + (copterWidth * 0.5));
	rengasY.push(copterY + copterHeight);
	rengasCount++;
}

function getSwimmerY() {
	return waterLevel - uimariHeight * 0.5;
}

function getSwimmerX(uimariIndex) {
	return (canvas.width / 7) * (uimariIndex + 0.5) + (Math.random() * ((canvas.width / 7)) - (uimariWidth * 3));
}

function moveCopter() {
	copterX += copterVelX;
	if(copterX > canvas.width + copterWidth) {
		copterX = 0 - copterWidth;
	}
	copterVelY -= 0.25; //gravitation
	if (copterY > flyingHeight) {
		copterVelY += 0.5; //trust;
	}
	copterY -= copterVelY; //move copter position by speed;
}
function moveWater() {
	waterVelY -= 0.015; //gravitation
	if (waterLevel > waterCenter) {
		waterVelY += 0.03; //trust;
	}
	waterLevel -= waterVelY; //move copter position by speed;
}
function moveRengas() {
	for(i = 0; i < rengasCount; i++) { 
		if(rengasY[i] >= waterLevel && rengasState[i] == 0) {
			if(hitUimari(rengasX[i]) == true) {
				rengasState[i] = 2;
			} else {
				rengasState[i] = 1;	//Aseta kelluvaksi 
			}		
		}
		if(rengasState[i] == 0){
			rengasY[i] += 2;			
		} else if( rengasState[i] == 1) {
			rengasY[i] = waterLevel;
		}
	}
}

function hitUimari(x) {
	
	palautus = false;
	for(j = 0; j < 5; j++) {
		if(x + rengasWidth > uimariX[j] && x < uimariX[j] + uimariWidth) {
			uimariSaved[j] = true;
			palautus = true;
		}
	}
	
	return palautus;
}

function copterAnimations() {
	switch(copterSprite) {
		case 1:
			kopteriImg = kopteri1;			
			break;
		case 2:
			kopteriImg = kopteri2;
			break;
		case 3:
			kopteriImg = kopteri3;
			break;
		case 4:
			kopteriImg = kopteri4;
			break;
	}
	copterSprite++;
	if(copterSprite > 4)
		copterSprite = 1;
}

function draw() {
	//Reset the canvas
	context.drawImage(bgImage, 0, -canvas.height * 0.32 ,canvas.width, canvas.height * 1.4);
	
	context.drawImage(kopteriImg, copterX, copterY, copterWidth, copterHeight);	
	
	//Draw swimmers
	saveCount = 0;
	for(i = 0; i < 5; i++) {
		if(uimariSaved[i] == false) {
			context.drawImage(uimariImg, uimariX[i], getSwimmerY(), uimariWidth, uimariHeight); 
		} else {
			saveCount++;
			context.drawImage(uimariImgSaved, uimariX[i], getSwimmerY(), uimariWidth, uimariHeight); 
		}
	}	
	
	for(i = 0; i < rengasCount; i++) {
		if(rengasState[i] < 2) {
			context.drawImage(rengasImg, rengasX[i], rengasY[i], rengasWidth, rengasHeight);
		}
	}
	
	//draw water
	for(i = -1; i < 3; i++) {
		context.drawImage(vesiImg, i*waterWidth, waterLevel, waterWidth, waterHeight);
	}
	
	if(saveCount >= 5) {		
		state = 2;
	}
}

function animations() {
	copterAnimations();	
}
function movements() {
	moveCopter();
	moveWater();
	moveRengas();
}