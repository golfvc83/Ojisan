
let outsideTween;

var Flood = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Flood ()
    {
        Phaser.Scene.call(this, { key: 'flood' });
        this.gridBG;
        this.instructions;
        this.currentColor = '';
        this.grid = [];
		outsideTween = this;
    },

    preload: function ()
    {
        this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
        this.load.atlas('flood', 'assets/games/flood/blobs.png', 'assets/games/flood/blobs.json');
		this.load.image('muricaman', 'assets/murica/muricaman.png');
		this.load.image('ironman', 'assets/murica/ironman.png');
		this.load.image('blankImage', 'assets/murica/blankImage.jpg');
		this.load.image('cartoon', 'assets/murica/cartoon.png');
		//you can probably attempt to load local saved file here..
    },

    create: function ()
    {
		
		this.cameras.main.setBackgroundColor(0x402010);
        this.grid = [];  
        this.intro = this.add.bitmapText(10, 20, 'atari', 'Welcome to my game.', 18);
		this.intro.depth = 1;
		this.introBG = this.add.image(0, 0, 'flood', 'background');
		this.introBG.setOrigin(0, 0);
		this.introBG.displayWidth = 600;
		this.introBG.displayHeight = 50;
		this.introBG.depth = -1;
		//var rect = new Phaser.Geom.Rectangle(0, 0, 300, 200)﻿;
        //var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        //graphics.fillRectShape(rect);
	    
        this.instructions = this.add.image(400, 300, 'flood', 'instructions').setAlpha(0);
        
		this.startBanner = this.add.image(20, 70, 'flood', 'background').setAlpha(1);
		this.startBanner.depth = 2;
		this.startBanner.setOrigin(0, 0);
		this.startBanner.displayWidth = 545;
		this.startBanner.displayHeight = 700;
		this.startBanner.setInteractive();
		
		this.startBanner.on('pointerup', function(){ 
		this.startBanner.alpha = 1;
		this.tweens.add({
            targets: this.startBanner,
            y: '-=1400',
            ease: 'Sine.easeInOut',
            duration: 1200
        }, this);
		
		var game = this;
		setTimeout( function(){
			game.createFullGrid();
			} 
		, 1200);
		},this
		);
		

	    this.startBanner.on('pointerdown',
		function(){
			this.startBanner.alpha = 0.5;
		}, this);
		
		 this.startBanner.on('pointerout',
		function(){
			this.startBanner.alpha = 1;
		}, this);
    },

    createFullGrid : function () {
		
		this.grid = [];
		this.intro.setAlpha(1);
		this.intro.depth = 1;
		this.intro.text = "Welcome to my game.";
		
		
		randomY = Math.round(Math.random()*3);
		randomX = Math.round(Math.random()*3);
		var wt = 85;
		var ht = 170;
		//var wt = 300;
		//var ht = 300;
		this.ht = ht;
		for(y = 0; y < 4; y++){
			this.grid[y] = []; 
			for(x = 0; x < 4; x++){
				if(Math.round(Math.random()*1)==0){
					grid = this.add.image(10 + (x * wt), 60 + (y * ht), "ironman");
					//grid = this.add.image(10 + (x * wt), 60 + (y * ht), "cartoon");
				}else{
					grid = this.add.image(10 + (x * wt), 60 + (y * ht), "muricaman");
					//grid = this.add.image(10 + (x * wt), 60 + (y * ht), "cartoon");
				}
				grid.setOrigin(0, 0);
				grid.displayWidth = wt;
				grid.displayHeight = 0;
				if(randomY == y && randomX == x){
					grid.over = true;
				}else{
					grid.over = false;	
				}
				//grid.setInteractive();
				//grid.on('pointerdown', this.gridClickDown,this);
				
				this.grid[y][x] = grid;
				this.grid[y][x].on('pointerdown', function (pointer, localX, localY, event){this.setAlpha(0.5);});
				this.grid[y][x].on('pointerover', function (pointer, localX, localY, event){this.setAlpha(0.5);});
				this.grid[y][x].on('pointerout', function (pointer, localX, localY, event){this.setAlpha(1);});
				this.grid[y][x].on('pointerup', this.move);
			}
		}
		
		this.tweenGrid();
	    
	},
	
	tweenGrid : function(){
		tempGrid = [];
		for(y = 0; y < 4; y++){
			for(x = 0; x < 4; x++){
				tempGrid.push(this.grid[y][x]);
			}
		
		}
		
		this.tweens.add({
				targets: tempGrid,
				duration: 500,
				displayHeight: this.ht,
				onComplete: this.bindActive
				});
	},
	
	bindActive: function(){
		
		for(y = 0; y < 4; y++){
			for(x = 0; x < 4; x++){
				outsideTween.grid[y][x].setInteractive();
			}
		}
	},
	
	destroyGrid : function () {
	
		for(y = 0; y < 4; y++){
			for(x = 0; x < 4; x++){		
				this.grid[y][x].destroy();
				
			}
		}
	    
	},
	
	move: function(){
		if(this.over){
			//console.log(outsideTween.intro);
			outsideTween.intro.text = "GAME OVER!!";
			outsideTween.tweens.add({
				targets: outsideTween.intro,
				duration: 500,
				alpha: 0,
				repeat: 5
			});
			//disable input.
			outsideTween.destroyGrid();
			setTimeout( function(){
				outsideTween.createFullGrid();
			}, 3500);
			
		}else{
			outsideTween.tweens.add({
				targets: this,
				//y: 10,
				displayHeight: 0,
				ease: 'Power3',
				duration: 600
			});
		}
	},
	
	gridClickDown  : function (){
		
		
	},
	
	gridClickOut  : function (pointer, localX, localY, event){
		console.log(this);
		console.log(event);
		//grid.setAlpha(0);
		
	},
	
	gridClick  : function (){
		console.log("out from grid");
	}
	
 
});


/*class SceneA extends Phaser.Scene {

    constructor ()
    {
        super('sceneA');
    }

    preload ()
    {
        this.load.image('face', 'assets/pics/bw-face.png');
        this.load.image('arrow', 'assets/sprites/longarrow.png');
	    this.face = this.add.image(400, 300, 'face');
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);
    }

    create ()
    {
        this.scene.start('sceneB');
    }

}*/

var Prescene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Prescene ()
    {
        Phaser.Scene.call(this, { key: 'prescene' });
    },

    preload: function ()
    {
		this.load.image('logo', 'assets/murica/logo.png');
    },

    create: function ()
    {
		
        console.log('prescene create function');
        //this.cameras.main.fadeFrom(2000, Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255));
		this.cameras.main.setBackgroundColor(000000);
		this.logo = this.add.image((375/2)-10, (812/2)-50, 'logo', 'background');
		this.logo.setAlpha(0);
		this.logo.setScale(0.2);
		var game = this;
		this.tweens.add({
            targets: this.logo,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1200,
			delay: 1000
        }, this);
		
		timedEvent = this.time.delayedCall(4000, this.onEvent, [], this);
		//this.logo.displayWidth = 250;
		//this.logo.displayHeight = 500;
		
	},
	
	onEvent: function(){
		this.scene.launch("sceneA");
		
	}
});


var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
		//Phaser.Scene.remove("prescene");
        Phaser.Scene.call(this, { key: 'sceneA' });
    },

    preload: function ()
    {
		this.scene.remove("prescene");
        this.load.image('start', 'assets/murica/buttons/start.png');
		this.load.image('gallary', 'assets/murica/buttons/gallaryButton.png');
		this.load.image('face', 'assets/murica/buttons/settingsButton.png');
		
    },

    create: function ()
    {
		
		console.log('SceneA create function');
		this.cameras.main.fadeFrom(2000, 0, 0, 0);
	
		this.start =  this.add.image(50, 50, 'start');
		this.start.setOrigin(0, 0);
	    //this.start.setScale(0.1);
		
		//this.start.displayWidth = 250;
		//this.start.displayHeight = 80;
		this.start.setInteractive();
		this.start.on('pointerdown', function(){this.start.setAlpha(0.3);}, this)
		this.start.on('pointerout', function(){this.start.setAlpha(1);}, this)
		this.start.on('pointerup', function(){﻿
			//console.log("easy");
			this.scene.launch('flood');
	  }, this);

         
     //this.gallary =  this.add.image(50, 50+60, 'gallary');
	 //this.gallary.setScale(0.3);
	 
	 
    //  32px padding on the left/right, 16 on the top/bottom
	}
});

 
var config = {
    type: Phaser.CANVAS,
	width: 375, //window.innerWidth * window.devicePixelRatio,
    height: 812, //window.innerHeight * window.devicePixelRatio,
    pixelArt: false,
    parent: 'phaser-example',
    scene: [ Prescene ,SceneA, Flood ]
	//scene: [ Flood ]
};

setTimeout( function(){
var game = new Phaser.Game(config);
}, 1000);