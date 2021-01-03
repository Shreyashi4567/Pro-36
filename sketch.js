var dog, happyDog, database, foodS, foodStock;
var lastFed,fedTime,foodObj;
function preload()
{
  DogImg = loadImage("images/dogImg.png");
  HappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,800);
  dog = createSprite(300,300,10,10);
  dog.addImage(DogImg);
  dog.scale=0.5;
  //foodStock = database.ref('Food');
  //foodStock.on("value",readStock);
}

function draw() {  
  background(46,139,87);
  var button1 = createButton('Feed the Dog');
  button1.position(250,200);
  button1.mousePressed(feedDog);
  var button2 = createButton('Add Food');
  button2.position(250,300);
  button2.mousePressed(addFoods);
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed = data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed : "+lastFed%12 + "PM",350,30);
  }
  else if(lastFed==0)
  {
    text("Last Feed : 12 AM",350,30);
  }
  else
  {
    text("Last Feed : "+lastFed+"AM",350,30);
  }
  drawSprites();
  foodObj.display();
}
function feedDog()
{
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )
}
function addFoods()
{
  foodS++;
  database.ref('/').update()
  {
    Food:foodS
  }
}