var dog,dogI,hDog,hDogI,database,foodS,foodStock;

function preload()
{
  dogI = loadImage("dogImg.png");
  hDogI = loadImage("dogImg1.png")
};

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,300,150,150)
  dog.addImage(dogI);
  dog.scale = 0.1

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  textSize(20);
};


function draw() {  
  background("green");
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(hDogI);
  };
  
  drawSprites();
  
  fill("white");
  strokeWeight(4);
  stroke("black")
  text("Food Remaining : "+foodS,170,200);
  textSize(20);
  text("Press Up Arrow key to feed the dog",100,50);
};

function readStock(data){
  foodS = data.val();
};

function writeStock(x){
  if(x <= 0){
    x = 20
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
};



