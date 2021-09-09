var trex ,trex_running,trex_collided;
var suelo, suelo_image, suelo_invisible;
var nubes,nubes_image;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var cactusg;
var PLAY=1;
var END=0;
var puntaje;
var go,go_image;
var reset,reset_image;
var estadoDelJuego=PLAY;
var cp_sound;
var die_sound;
var jump_sound;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  suelo_image= loadAnimation("ground2.png");
  nubes_image= loadImage("cloud.png");
  cactus1=loadImage("obstacle1.png");
  cactus2=loadImage("obstacle2.png");
  cactus3=loadImage("obstacle3.png");
  cactus4=loadImage("obstacle4.png");
  cactus5=loadImage("obstacle5.png");
  cactus6=loadImage("obstacle6.png");
  go_image=loadImage("gameOver.png");
  reset_image=loadImage("restart.png");
  cp_sound=loadSound("checkPoint.mp3");
  jump_sound=loadSound("jump.mp3");
  die_sound=loadSound("die.mp3");
}

function setup(){
  createCanvas(600,200)
  
  //Crea el sprite del Trex
  trex = createSprite(50,150,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  go=createSprite(300,100);
  go.addImage(go_image);
  go.scale=0.7;
  reset=createSprite(300,145);
  reset.addImage(reset_image);
  reset.scale=0.6;
  suelo= createSprite(100,165,1000,5);
  suelo.addAnimation("suelo",suelo_image);
  suelo_invisible=createSprite(100,175,1000,5);
  suelo_invisible.visible=false;
  var aleatorio=Math.round(random(1,100));
  //console.log(aleatorio);
  grupoCactus=createGroup();
  grupoNubes=createGroup();  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug=false;
  puntaje=0;
}

function draw(){
    background("white");
    text("PUNTAJE: "+puntaje,450,30);
    //console.log(trex.y)  
    console.log("la posicion del trex en y es: "+trex.y);
    if(estadoDelJuego===PLAY){
    puntaje=puntaje+Math.round(frameCount/60); 
    if(puntaje>0 && puntaje %100===0){
    cp_sound.play();
    }
    suelo.velocityX=-3;
    go.visible=false;
    reset.visible=false;
    if(suelo.x<0){
    suelo.x=suelo.width/2;
    }
    if(keyDown("up") && trex.y>=145){
    trex.velocityY=-15;
    }
    trex.velocityY=trex.velocityY+0.9;
    crearNubes();
    crearCactus();
    if(grupoCactus.isTouching(trex)){
    jump_sound.play();
    estadoDelJuego=END;
    die_sound.play();
    }
    }else if(estadoDelJuego===END){
    suelo.velocityX=0;
    trex.velocityX=0;
    trex.changeAnimation("collided",trex_collided);
    grupoCactus.setVelocityXEach(0);
    grupoNubes.setVelocityXEach(0);
    go.visible=true;
    reset.visible=true;
    grupoCactus.setLifetimeEach(-1);
    grupoNubes.setLifetimeEach(-1);
    }
    trex.collide(suelo_invisible);
    drawSprites();
  }
function crearNubes(){
    if(frameCount %60===0){
    nubes=createSprite(300,50,600,40);
    nubes.addImage(nubes_image);
    nubes.y=Math.round(random(10,60));
    nubes.velocityX=-3;
    nubes.scale=Math.round(random(0.1,1));
    //asigna ciclo de vida a la variable
    nubes.lifetime=200;
    nubes.depth=trex.depth;
    trex.depth=trex.depth+1;
    grupoNubes.add(nubes);
    }
}

function crearCactus(){
    if(frameCount %60===0){
    var cactus=createSprite(455,150,10,40);
    cactus.velocityX=-4;
    var ran=Math.round(random(1,6));
    switch(ran){
    case 1:cactus.addImage(cactus1);
    break;
    case 2:cactus.addImage(cactus2);
    break;
    case 3:cactus.addImage(cactus3);
    break;
    case 4:cactus.addImage(cactus4);
    break;
    case 5:cactus.addImage(cactus5);
    break;
    case 6:cactus.addImage(cactus6);
    break;
    default:break;
    }
    cactus.scale=0.5;
    cactus.lifetime=200;
    grupoCactus.add(cactus);
    }
}

