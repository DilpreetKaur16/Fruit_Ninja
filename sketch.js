//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  bgimg= loadImage("bg.jpg");
  goimg= loadImage('go.png')
  reimg= loadImage('re.png')
  //load sound here
  knifeSwoosh =  loadSound("knifeSwoosh.mp3");
  goversound= loadSound("gameover.mp3");
}



function setup() {
  createCanvas(displayWidth-20,displayHeight-110);
  
  //creating sword
   knife=createSprite(displayWidth/2,displayHeight/2,20,20);
   knife.addImage(knifeImage);
   knife.scale=1
   restart= createSprite(displayWidth/2-20, displayHeight/2+150)
   restart.addImage(reimg)
   restart.scale=0.9;
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}
function draw(){
  
  if(gameState===PLAY){
    background(bgimg);knife.visible=true;
    restart.visible=false;
  knife.x=mouseX;
  knife.y=mouseY;



  monsters();
  fruits();
  if(fruitGroup.isTouching(knife)){
    fruitGroup.destroyEach();
    score=score+50;
    knifeSwoosh.play();
    }
    if(monsterGroup.isTouching(knife)){
      goversound.play();
      gameState=END;
    }
  }
    else if(gameState===END){
      restart.visible=true
      monsterGroup.destroyEach();

      fruitGroup.destroyEach();
      knife.visible=false;
    
      background(goimg);
  
      if(mousePressedOver(restart)){
        gameState=PLAY;
        //boy.visible=true;
        score=0;
        
    
    }
  }
  drawSprites();
  textSize(35);
  fill("white");
  text("Score : "+ score,displayWidth-300,50);
  
}
function monsters(){
  if(frameCount %200 ===0){
monster= createSprite(200,200);
monster.addAnimation("mon",monsterImage)
monster.scale=1.6;
monster.y= Math.round(random(60, displayHeight-60))

position = Math.round(random(1,2));
if(position===1){
  monster.x=0;
  monster.velocityX=(10+score/100);
}
else if(position==2){
  monster.x = displayWidth;
  monster.velocityX=-(14+score/100); 
}
monsterGroup.add(monster);
}
}

function fruits(){
  if(frameCount%50 === 0){
fruit= createSprite(100,100);
fruit.scale=0.3;
fruit.y= Math.round(random(50, displayHeight-150))

position= Math.round(random(1,2));
if(position===1){
  fruit.x=0;
  fruit.velocityX=(13+score/100);
}
else{
  fruit.x=displayWidth;
  fruit.velocityX=-(13+score/100);
}

fru = Math.round(random(1,4));
switch(fru){
case 1 : fruit.addImage(fruit1);
break;

case 2 : fruit.addImage(fruit2);
break;

case 3 : fruit.addImage(fruit3);
break;

case 4 : fruit.addImage(fruit4);
break;
default: break;
}
fruitGroup.add(fruit);
  }

}
/*
function draw() {
  background(bgimg);
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        //add gameover sound here
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(35);
  fill("white");
  text("Score : "+ score,displayWidth-200,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -8;
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= 7;
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
} */