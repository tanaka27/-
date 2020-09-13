var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var getName=document.getElementsByClassName("named");
var getValue=document.getElementsByClassName("value");
var getColor=document.getElementsByClassName("color");
var table=document.getElementById("table");
var addRow=document.getElementById("addRow");
var disRow=document.getElementById("disRow");
var rotation=document.getElementById("rote");
var rs=0;
var sumValue=0;
var re=Math.PI;
var classNumber=0;
var cell=[];
var rowCount=1;
var cycleStart=0;
var rote=0;
var namePosi;
var roting=false;
var speed=0;
var speedy=false;
function drawName(){
  namePosi=c.height-200;
  for(var i=0;i<getColor.length;i++){
    ctx.beginPath();
    ctx.rect(50,namePosi,20,20);
    ctx.fillStyle=getColor[i].value;
    ctx.fill();
    ctx.closePath();
    ctx.font="20px Arial";
    ctx.fillStyle="black";
    ctx.fillText(getName[i].value,80,namePosi+18);
    namePosi+=35;
  }
}
function drawCycle(){
  ctx.beginPath();
  ctx.moveTo(400,240);
  ctx.arc(400,240,200,0,Math.PI*2,true);
  ctx.fillStyle="white";
  ctx.fill();
  ctx.closePath();
}
function roteCycle(){

    cycleStart=rote;
    rote+=speed;
  }

  //rote+=Math.PI/8

function drawGraff(){
  sumValue=0;

  for(var i=0;i<getValue.length;i++){
    sumValue+=parseInt(getValue[i].value,10);
  }
  for(var i=0;i<getValue.length;i++){
    ctx.beginPath();
    ctx.moveTo(400,240);
    ctx.arc(400,240,200,cycleStart,cycleStart+Math.PI*2*parseInt(getValue[i].value,10)/sumValue,false);
    //cycleStart+=Math.PI*2*parseInt(getValue[0].Value,10)/sumValue;
    ctx.fillStyle=getColor[i].value;
    ctx.fill();
    ctx.closePath();
    cycleStart+=Math.PI*2*parseInt(getValue[i].value,10)/sumValue;
  }
}
function drawPin(){
  ctx.beginPath();
  ctx.moveTo(150,225);
  ctx.lineTo(150,255);
  ctx.lineTo(190,240);
  ctx.fillStyle="#a2a2a2";
  ctx.fill();
  ctx.closePath();
}
addRow.onmouseup=function(event){
  rowCount++
  var row=table.insertRow(rowCount);
  for(var i=0;i<3;i++){
      cell[i]=row.insertCell(i);
    }
  row.className="Line";
  cell[0].className="name";
  cell[1].className="values";
  cell[2].className="colors";
  cell[0].innerHTML='<input type="text" maxlength="20" class="named" >';
  cell[1].innerHTML='<input type="text" maxlength="10"class="value"value="0">';
  cell[2].innerHTML='<input type="color" maxlength="10" class="color">';

}
disRow.onmouseup=function(event){
  if(rowCount>1){
  table.deleteRow(rowCount);
  rowCount--;
}

}
addRow.addEventListener('touchend',event=>{
  if(rowCount>1){
  table.deleteRow(rowCount);
  rowCount--;
}

});
addRow.addEventListener('touchend',event=>{
  rowCount++
  var row=table.insertRow(rowCount);
  for(var i=0;i<3;i++){
      cell[i]=row.insertCell(i);
    }
  row.className="Line";
  cell[0].className="name";
  cell[1].className="values";
  cell[2].className="colors";
  cell[0].innerHTML='<input type="text" maxlength="20" class="named" >';
  cell[1].innerHTML='<input type="text" maxlength="10"class="value"value="0">';
  cell[2].innerHTML='<input type="color" maxlength="10" class="color">';

});

function roteStart(){
  if(speed<Math.PI/8&&speedy){
    speed+=Math.PI/Math.pow(8,3);
    roting=true;
  }
}
function roteStop(){
  if(!speedy&&speed>Math.PI/Math.pow(8,3)){
    speed-=Math.PI/Math.pow(8,4);
  }else if(!speedy&&speed<=Math.PI/Math.pow(8,3)&&speed>0){
  speed-=Math.PI/Math.pow(8,5);

  }else if(!speedy&speed<0){
    speed=0;
    roting=false;
  }
}
rotation.addEventListener('touchend',event=>{
  if(roting){
    rotation.textContent="START";
    rotation.style.backgroundColor="#ff7aff";
    rotation.style.color="black";
    rotation.classList.remove("active");
    speedy=false;
  }else{
    rotation.textContent="STOP";
    rotation.style.backgroundColor="#ff0000";
    rotation.style.color="white";
    rotation.classList.add("active");
    speedy=true;
  }

});

rotation.onmouseup=function(event){
  if(roting){
    rotation.textContent="START";
    rotation.style.backgroundColor="#ff7aff";
    rotation.style.color="black";
    rotation.classList.remove("active");
    speedy=false;
  }else{
    rotation.textContent="STOP";
    rotation.style.backgroundColor="#ff0000";
    rotation.style.color="white";
    rotation.classList.add("active");
    speedy=true;
  }
}
function loop(){
  ctx.clearRect(0,0,c.width,c.height);
  drawCycle();
  drawGraff();
  roteCycle();
  drawPin();
  drawName();
  roteStart();
  roteStop();
}
var loopController;
function startTimer(){
loopController=setInterval(function(){
loop();
} , 10);
}

function stopTimer(){
clearInterval(loopController);
}

startTimer();
