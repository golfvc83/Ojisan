var outsideTween;

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
		
    },

    preload: function ()
    {
		outsideTween = this;
		
        //this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
        //this.load.atlas('flood', 'assets/games/flood/blobs.png', 'assets/games/flood/blobs.json');
		//this.load.image('muricaman', cordova.file.applicationStorageDirectory+"imageFolder/muricaman.png");
		//this.load.image('ironman', 'assets/murica/ironman.png');
		//this.load.image('blankImage', 'assets/murica/blankImage.jpg');
		//this.load.image('cartoon', 'assets/murica/cartoon.png');
		//this.load.image('back', 'assets/murica/buttons/back.png');
		//this.loadAllImage();
		//this.input.addPointer(5);
		//setInterval(function(){ }, 10000);
		//you can probably attempt to load local saved file here..
    },
		
    create: function ()
    {	
		this.input.addPointer(5);
		this.cameras.main.setBackgroundColor(0x000000);
        //this.cameras.main.fadeFrom(2000, 0, 0, 0);
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
        
		this.startBanner = this.add.image(20, 160, 'flood', 'background').setAlpha(1);
		this.startBanner.depth = 2;
		this.startBanner.setOrigin(0, 0);
		this.startBanner.displayWidth = 545;
		this.startBanner.displayHeight = 700;
		this.startBanner.setInteractive();
		
		
		this.back = this.add.image(10, 70, 'back').setOrigin(0,0).setInteractive().setAlpha(1);
			
		this.startBanner.on('pointerdown', function(){ 
		//this.back.setAlpha(0);
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
		
		this.back.on('pointerdown', function(){
			this.back.setAlpha(0.3);
			this.scene.resume("sceneA");
			this.scene.stop();
			this.back.setAlpha(1);
		},this);
			
    },

    createFullGrid : function () {
		
		this.grid = [];
		this.intro.setAlpha(1);
		this.intro.depth = 1;
		this.intro.text = "Welcome to my game.";
		
		
		randomY = Math.round(Math.random()*3);
		randomX = Math.round(Math.random()*3);
		var wt = 85;
		var ht = 110;
		//var wt = 300;
		//var ht = 300;
		this.ht = ht;
		var imageFileIndex = 0;
		for(y = 0; y < 4; y++){
			this.grid[y] = []; 
			for(x = 0; x < 4; x++){
				
				/*if(Math.round(Math.random()*1)==0){
					grid = this.add.image(10 + (x * wt), 160 + (y * ht), "ironman");
					//grid = this.add.image(10 + (x * wt), 60 + (y * ht), "cartoon");
				}else{
					grid = this.add.image(10 + (x * wt), 160 + (y * ht), "muricaman");
					//grid = this.add.image(10 + (x * wt), 60 + (y * ht), "cartoon");
				}*/
				
				grid = this.add.image(10 + (x * wt), 160 + (y * ht), picFile[imageFileIndex].key);
				imageFileIndex++;
				
				grid.setOrigin(0, 0);
				grid.displayWidth = wt;
				grid.displayHeight = 0;
				if(randomY == y && randomX == x){
					grid.over = true;
				}else{
					grid.over = false;	
				}
				grid.setInteractive();
				//grid.on('pointerdown', this.gridClickDown,this);
				
				this.grid[y][x] = grid;
				//this.grid[y][x].on('pointerdown', function (pointer, localX, localY, event){this.move;});
				
				
				this.grid[y][x].test = this.move;
				this.grid[y][x].on('pointerdown', function (pointer, localX, localY, event){
						this.test();
					}
				);
				//this.grid[y][x].on('pointerover', function (pointer, localX, localY, event){this.setAlpha(0.5);});
				//this.grid[y][x].on('pointerout', function (pointer, localX, localY, event){this.setAlpha(1);});
				//this.grid[y][x].on('pointerup', this.move);
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


var Gallery = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Gallery ()
    {
        Phaser.Scene.call(this, { key: 'gallery' });
        this.gridBG;
        this.instructions;
        this.currentColor = '';
        this.grid = [];
		
    },

    preload: function ()
    {
		outsideTween = this;
		if(!this.textures.exists("atari")){
			this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
        }
		
		if(!this.textures.exists("flood")){
			this.load.atlas('flood', 'assets/games/flood/blobs.png', 'assets/games/flood/blobs.json');
		}
		
		if(!this.textures.exists("blankImage")){
			this.load.image('blankImage', 'assets/murica/blankImage.jpg');
		}
		
		if(!this.textures.exists("back")){
			this.load.image('back', 'assets/murica/buttons/back.png');
		}
		
		if(!this.textures.exists("back")){
			this.load.image('start', 'assets/murica/buttons/start.png');
		}
		
		this.loadAllImage();
		
		/*this.input.on('pointerup', function(pointer){
			console.log("pointerUp x: "+pointer.x+", y:"+pointer.y );
			console.log(pointer);
			var touchX = pointer.x;
			var touchY = pointer.y;
			// ...
		});*/
		
		//setInterval(function(){ }, 10000);
		//you can probably attempt to load local saved file here..
    },
	
	loadAllImage: function (){
		
		for(i = 0; i < picFile.length; i++){
			imagePath = cordova.file.applicationStorageDirectory+"imageFolder/"+picFile[i].name;
			this.load.image(picFile[i].key, imagePath , true);
		}
		
	},

    create: function ()
    {
		
		this.cameras.main.setBackgroundColor(0x402010);
        this.grid = [];  
        this.intro = this.add.bitmapText(10, 20, 'atari', '', 18);
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
        
		/*this.startBanner = this.add.image(20, 70, 'flood', 'background').setAlpha(1);
		this.startBanner.depth = 2;
		this.startBanner.setOrigin(0, 0);
		this.startBanner.displayWidth = 545;
		this.startBanner.displayHeight = 700;
		this.startBanner.setInteractive();*/
		
		
		this.back = this.add.image(10, 70, 'back').setOrigin(0,0).setInteractive().setAlpha(1);
	    this.back.depth = 1;
		
		this.start = this.add.image(10, 700, 'start').setOrigin(0,0).setInteractive().setAlpha(0);
		
		this.start.normalState = "start";
		this.back.normalState = "back";
		
		var game = this;
		setTimeout( function(){
				game.createFullGrid();
				game.start.setAlpha(1);
				//game.back.setAlpha(1);
			} 
		, 1200);
		

		this.input.on('gameobjectdown', function (pointer, gameObject) {
			
				if(gameObject.isGameGrid != undefined){
					this.move(gameObject);
					gameObject.setAlpha(0.3);
					
				}else if(gameObject.normalState == "start"){
					location.href = "camera.html?key="+outsideTween.currentImage.imageIndex;	
				}else if(gameObject.normalState == "back"){
					
					if(this.scene.isPaused("sceneA")){
						this.scene.resume("sceneA");
					}else{
						this.scene.launch("sceneA");
					}
					this.scene.stop();
				}
						
			//gameObject.clearTint();
			
		},this);
		

		
    },

    createFullGrid : function () {
		
		this.grid = [];
		this.intro.setAlpha(1);
		this.intro.depth = 1;
		this.intro.text = "Select Your Picture.";
		
		
		randomY = Math.round(Math.random()*3);
		randomX = Math.round(Math.random()*3);
		var wt = 85;
		var ht = 110;
		//var wt = 300;
		//var ht = 300;
		
		this.ht = ht;
		var imageFileIndex = 0;
		
		for(y = 0; y < 4; y++){
			this.grid[y] = []; 
			for(x = 0; x < 4; x++){
				grid = this.add.image(10 + (x * wt), 160 + (y * ht), picFile[imageFileIndex].key);
				imageFileIndex++;
				grid.setOrigin(0, 0);
				grid.displayWidth = wt;
				grid.displayHeight = 0;
				grid.imageIndex = imageFileIndex;
				grid.isGameGrid = true;
				grid.isPressed = false;
				if(randomY == y && randomX == x){
					//grid.over = true;
				}else{
					//grid.over = false;	
				}
				grid.setInteractive();
				//grid.on('pointerdown', this.gridClickDown,this);
				
				this.grid[y][x] = grid;
				/*this.grid[y][x].on('pointerdown', function (pointer, localX, localY, event){
					this.setAlpha(0.5);
					event.stopPropagation();
					});
				
				this.grid[y][x].on('pointerout', function (pointer, localX, localY, event){
					this.setAlpha(1);
					});
				this.grid[y][x].on('pointerup', this.move);*/
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
	
	move: function(image){
		if(outsideTween.currentImage != undefined){
			outsideTween.currentImage.setAlpha(1);
		}
		outsideTween.currentImage = image;
		//event.stopPropagation();
		//alert(this);
		/*if(this.over){
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
		}*/
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
		this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
        this.load.atlas('flood', 'assets/games/flood/blobs.png', 'assets/games/flood/blobs.json');
        this.load.image('start', 'assets/murica/buttons/start.png');
		this.load.image('gallery', 'assets/murica/buttons/gallery.png');
		this.load.image('setting', 'assets/murica/buttons/setting.png');
		this.load.image('hero', 'assets/murica/ojisan.png');
		this.load.image('back', 'assets/murica/buttons/back.png');
		this.load.image('half_circle', 'img/circle.png');
		this.load.image('button-hover', 'assets/murica/buttons/start-hover.png');
		this.loadAllImage();
    },
	
	loadAllImage: function (){
		
		for(i = 0; i < picFile.length; i++){
			imagePath = cordova.file.applicationStorageDirectory+"imageFolder/"+picFile[i].name;
			this.load.image(picFile[i].key, imagePath , true);
		}
		
	},
	
    create: function ()
    {
		this.cameras.main.fadeFrom(2000, 0, 0, 0);
		this.hero = this.add.image(30, 50, 'hero').setScale(0.4);
		
		offset = 400;
		this.start =  this.add.image(50, offset, 'start');		
		this.gallery =  this.add.image(50, offset+(110*1), 'gallery');
		this.setting =  this.add.image(50, offset+(110*2), 'setting');
		
		this.start.setOrigin(0, 0);
		this.gallery.setOrigin(0, 0);
		this.setting.setOrigin(0, 0);
		this.hero.setOrigin(0, 0);
	    //this.start.setScale(0.1);
		
		//this.start.displayWidth = 250;
		//this.start.displayHeight = 80;
		this.start.setInteractive();
		this.gallery.setInteractive();
	    this.setting.setInteractive();
		
		/*this.start.isPressed = false;
		this.gallery.isPressed = false;
		this.setting.isPressed = false;*/
		
		this.start.normalState = "start";
		this.gallery.normalState = "gallery";
		this.setting.normalState = "setting";
		/*this.start.toggleState= "button-hover";
		this.gallery.toggleState= "button-hover";
		this.setting.toggleState= "button-hover";*/

		//  Create a hash shape Graphics object
		

		this.input.on('gameobjectdown', function (pointer, gameObject) {
			//if(gameObject.isPressed == true){
				gameObject.setAlpha(0.3);
				if(gameObject.normalState == "start"){
					
					this.scene.launch('flood');
					this.scene.pause();
					gameObject.setAlpha(1);
				}
				
				if(gameObject.normalState == "gallery"){
					this.scene.launch('gallery');
					this.scene.pause();
					gameObject.setAlpha(1);
				}
				
				if(gameObject.normalState == "setting"){
					this.scene.launch('howTo');
					this.scene.pause();
					gameObject.setAlpha(1);
				}
				
				//do animation
					
		},this);
		
	}
});


var HowTo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function HowTo ()
    {
		//Phaser.Scene.remove("prescene");
        Phaser.Scene.call(this, { key: 'howTo' });
    },
	
	 preload: function ()
    {
		//outsideTween = this;
        //this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
        //this.load.atlas('flood', 'assets/games/flood/blobs.png', 'assets/games/flood/blobs.json');
		//this.load.image('muricaman', cordova.file.applicationStorageDirectory+"imageFolder/muricaman.png");
		//this.load.image('ironman', 'assets/murica/ironman.png');
		//this.load.image('blankImage', 'assets/murica/blankImage.jpg');
		//this.load.image('cartoon', 'assets/murica/cartoon.png');
		
		//setInterval(function(){ }, 10000);
		//you can probably attempt to load local saved file here..
    },
	
	
    create: function ()
    {
		
		this.cameras.main.setBackgroundColor(0x402010);
        this.grid = [];  
		this.introBG = this.add.image(0, 0, 'flood', 'background');
		this.introBG.setOrigin(0, 0);
		this.introBG.displayWidth = 600;
		this.introBG.displayHeight = 50;
		this.introBG.depth = 4;
		//var rect = new Phaser.Geom.Rectangle(0, 0, 300, 200)﻿;
        //var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        //graphics.fillRectShape(rect);
	    
        this.instructions = this.add.image(400, 300, 'flood', 'instructions').setAlpha(0);
        
		this.startBanner = this.add.image(20, 70, 'flood', 'background').setAlpha(1);
		this.startBanner.depth = 2;
		this.startBanner.setOrigin(0, 0);
		this.startBanner.displayWidth = 545;
		this.startBanner.displayHeight = 750;
		this.startBanner.setInteractive();
		
		/*const circle = document.createElement('canvas');
		const ctx = circle.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = 'transparent';
		
		ctx.fillRect(0, 20, 1000, 1000);
		this.textures.addCanvas('circle', circle);
        this.circleImage = this.add.image(200, 70, 'circle');
		this.circleImage.depth = 3;*/
		
		this.circleImage = this.add.image(0, 0,'half_circle').setOrigin(0, 0);
		this.circleImage.depth = 3;
		this.circleImage.displayWidth = 375;
		this.circleImage.displayHeight = 812;
		//circleImage.setOrigin(0,0);
		this.back = this.add.image(20, 70, 'back').setOrigin(0,0).setInteractive().setAlpha(1);
		this.back.depth = 4;
		/*this.startBanner.on('pointerup', function(){ 
		this.back.setAlpha(0);
		this.tweens.add({
            targets: this.startBanner,
            y: '-=1400',
            ease: 'Sine.easeInOut',
            duration: 100
        }, this);
		
		},this
		);*/
		this.downX, this.upX, this.downY, this.upY, this.threshold = 5;

		this.startBanner.on('pointerdown', function (pointer) {
			//this.downX = pointer.x;
			this.downY = pointer.y;
			
		},this);   

		this.startBanner.on('pointerup', function (pointer) {
			//this.upX = pointer.x;
			
			this.upY = pointer.y;
			
			/*if (this.upX < this.downX - this.threshold){
				console.log("swipeleft");
			} else if (this.upX > this.downX + this.threshold) {
				console.log("swiperight");
			} else */
		//console.log(this.startBanner.y);
		if (this.upY < this.downY - this.threshold) {
			if(this.startBanner.y != -230){
				this.tweens.add({
					targets: this.startBanner,
					y: '-=150',
					ease: 'Sine.easeOut',
					duration: 200
				}, this);
			}
		
		} else if (this.upY > this.downY + this.threshold) {
			if(this.startBanner.y != 70){
				this.tweens.add({
				targets: this.startBanner,
				y: '+=150',
				ease: 'Sine.easeOut',
				duration: 200
				}, this);
			}
		}
	},this);
	
	this.back.on('pointerdown', function (pointer) {
			this.back.setAlpha(0.3);
			if(this.scene.manager.keys.sceneA.game.isBooted){
				this.scene.resume("sceneA");
			}else{
				this.scene.launch("sceneA");
			}
			this.scene.stop();
			this.back.setAlpha(1);
	},this);   
		
		
    }

  
});
 
/*var downX, upX, downY, upY, threshold = 50;

target.on('pointerdown', function (pointer) {
	downX = pointer.x;
	downY = pointer.y;
};   

target.on('pointerup', function (pointer) {
	upX = pointer.x;
	upY = pointer.y;
	if (upX < downX - threshold){
		console.log("swipeleft");
	} else if (upX > downX + threshold) {
		console.log("swiperight");
	} else if (upY < downY - threshold) {
		console.log("swipeup");
	} else if (upY > downY + threshold) {
		console.log("swipedown");
	}
};*/  

var config = {
    type: Phaser.CANVAS,
	width: window.innerWidth * window.devicePixelRatio, //375,
    height: window.innerHeight * window.devicePixelRatio, //812, 
    pixelArt: false,
    parent: 'phaser-example',
    scene: [ Prescene ,SceneA, Gallery, HowTo, Flood ]
	//scene: [ Flood ]
};

setTimeout( function(){
	var urlParams = new URLSearchParams(window.location.search);

	if(urlParams.has('backToMainMenu')){
		config.scene = [ SceneA, Gallery, HowTo, Flood ];
	}else if(urlParams.has('backToGallery')){
		config.scene = [ Gallery, SceneA, HowTo, Flood ];
	}
	var game = new Phaser.Game(config);
}, 1000);