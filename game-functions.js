var canvas = document.getElementById("game");

var c  = canvas.getContext('2d');


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var score = 0;
var life = 3;
var startbutton=document.getElementById("startbutton");

function initialize(){
	startbutton.style.display="none";
}


var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

class Game {
	constructor(GAME_WIDTH,GAME_HEIGHT){
		this.gamewidth = GAME_WIDTH;
		this.gameheight = GAME_HEIGHT;
	}
	start(){
		this.stick =  new Stick(this);
		this.blackball = new Blackball(this);
		this.greenball = new Greenball(this);
		this.redball = new Redball(this);
		this.blueball = new Blueball(this);
		this.Scores=new Scores(this);
		var blackballs = [];
	


		this.gameObject = [
			this.blackball ,
			this.greenball,
			this.redball,
			this.blueball,
			this.stick,
			this.Scores,
		];


		new InputHandler(this.stick);

	}
	draw(c){
	
		this.gameObject.forEach(object => object.draw(c));	
		

	}
	update(change){
	
		this.gameObject.forEach(object => object.update(change));	
		
	}
	 detectCollision(ball)
	{
		if(ball.X<this.stick.X+this.stick.Width-10)
		{
			if(ball.Y>=this.stick.Y-ball.Height-10&&ball.Y<=this.stick.Y+this.stick.Height+(ball.Height/2))
			{	
				//alert(ball instanceof Redball);
				if(ball instanceof Redball)
				{
					life--;
					if(life==0)
					{
						alert('You Lose !!!');
						location.reload();
					}	
					return true;
				}
				else
				{
					score+=5;
					return true;
				}
			}
		}
		return false;
	}
}

class Scores{
	constructor(game){
	  
	  this.X=700;
	  this.Y=20;
	}

	draw(c){
	
		c.fillStyle="black";
		c.font = "14px Arial";
		c.fillText("Score : "+score,this.X,this.Y);
		c.fillText("Lives : "+life,30,this.Y);
	}

	update(){
       		
		
	}
}

class Blackball{
	
	constructor(game){
	this.image = document.getElementById('blackball');
	this.X=700;
	this.Y=Math.random()*1000%600;
	this.Width=20;
	this.Height=20;
	this.Velocity=3;
	 
	}

	draw(c){
	 
		c.drawImage(this.image,this.X,this.Y, this.Width, this.Height);
	}

	update(){
			
		this.X-=this.Velocity;
		if(game.detectCollision(this))
		{
			this.X=GAME_WIDTH;
			this.Y=Math.random()*1000%600;
		}
		
		}

	}





class Greenball{
	constructor(game){
	this.image = document.getElementById('greenball');
	this.X=700;
	this.Y=Math.random()*1000%600;
	this.Width=20;
	this.Height=20;
	this.Velocity=5;

	}

	draw(c){

		c.drawImage(this.image,this.X,this.Y, this.Width, this.Height);
	}

	update(){
				
		this.X-=this.Velocity;
		if(game.detectCollision(this)||this.X<0)
		{
			this.X=GAME_WIDTH;
			this.Y=Math.random()*1000%600;
		}
		
		}

}



class Redball{
	constructor(game){
	this.image = document.getElementById('redball');
	this.X=700;
	this.Y=Math.random()*1000%600;
	this.Width=20;
	this.Height=20;
	this.Velocity=7;
	 
	}

	draw(c){
	 
		c.drawImage(this.image,this.X,this.Y, this.Width, this.Height);
	}

	update(){
			
		this.X-=this.Velocity;
		if(game.detectCollision(this)||this.X<0)
		{
			this.X=GAME_WIDTH;
			this.Y=Math.random()*1000%600;
		}
		
		}

}


class Blueball{
	constructor(game){
	this.image = document.getElementById('blueball');
	this.X=700;
	this.Y=Math.random()*1000%600;
	this.Width=20;
	this.Height=20;
	this.Velocity=6;

	}

	draw(c){

		c.drawImage(this.image,this.X,this.Y, this.Width, this.Height);
	}

	update(){
		
		this.X-=this.Velocity;
		if(game.detectCollision(this)||this.X<0)
		{
			this.X=GAME_WIDTH;
			this.Y=Math.random()*1000%600;
		}
		
		}
}


class Stick{
    constructor(game){
	 this.X=5;
	 this.Y=0;
this.Width=10;
this.Height=100;
this.SliderSpeed=100;	 
	}
	
	moveUp(){

		if(this.Y-this.SliderSpeed>=0)this.Y-=this.SliderSpeed;
	}
	moveDown(){

		if(this.Y+this.SliderSpeed<600)this.Y+=this.SliderSpeed;
	}

    draw(c){

		c.fillStyle = "yellow"; 
        c.fillRect(this.X,this.Y,this.Width,this.Height);
        c.stroke();
	}
	update(change) {		
     
	}
}

class InputHandler{
	constructor(stick){
	document.addEventListener('keyup', (event) =>{	
		switch(event.keyCode){
			case 38:
				stick.moveUp();
				break;
			case 40:
				stick.moveDown();
				break;
		}
	});
	}
}


var previous =0;

var game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start();

function gameLoop(position){
	var change = position - previous;
	previous = position;
	c.clearRect(0,0,innerWidth,innerHeight);
	
	game.draw(c);
	game.update(change);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


