/*-------------------
 a player entity
 --------------------------------*/
var PlayerEntity = me.ObjectEntity.extend({

	/* -----

	 constructor

	 ------ */

	init : function(x, y, settings) {
		// call the constructor
		this.parent(x, y, settings);

		// set the walking & jumping speed
		this.setVelocity(3, 15);

		// adjust the bounding box
		this.updateColRect(8, 48, -1, 0);

		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

	},
	/* -----
	 update the player pos
	 ------ */
	update : function() {

		if(me.input.isKeyPressed('left')) {
			this.doWalk(true);
		} else if(me.input.isKeyPressed('right')) {
			this.doWalk(false);
		} else {
			this.vel.x = 0;
		}
		if(me.input.isKeyPressed('jump')) {
			if(this.doJump()) {
				me.audio.play("jump");
			}
		}

		// check & update player movement
		this.updateMovement();

		// Comprueba la colision entre nuestro jugador y el enemigo
		var res = me.game.collide(this);

		//-----------------------------------------------------------------------

		//---------------------------------------------------

		if(res) {
			if(res.obj.type == me.game.ENEMY_OBJECT) {
				if((res.y > 0) && !this.jumping) {
					// bounce
					me.audio.play("stomp");

					//-------------------------

					//--------------------------------

					this.forceJump();
				} else {
					// let's flicker in case we touched an enemy
					this.flicker(45);
				}
			}
		}

		// update animation if necessary
		if(this.vel.x != 0 || this.vel.y != 0) {
			// update objet animation
			this.parent(this);
			return true;
		}
		return false;

	}
});

/*----------------
 a Coin entity
 ------------------------ */
var CoinEntity = me.CollectableEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init : function(x, y, settings) {
		// call the parent constructor
		this.parent(x, y, settings);
	},
	// this function is called by the engine, when
	// an object is touched by something (here collected)
	onCollision : function() {
		
		var puntos=50;
		
		
		// do something when collide
		me.audio.play("cling");

		// give some score
		me.game.HUD.updateItemValue("score", puntos);
		
		

		// Asegura de que no se puede recoger otravez
		this.collidable = false;
		// remove it
		me.game.remove(this);
	}
});

/* --------------------------
 Entidad enemiga 1
 ------------------------ */
var EnemyEntity = me.ObjectEntity.extend({
	init : function(x, y, settings) {
		// define this here instead of tiled
		settings.image = "wheelie_right";
		settings.spritewidth = 32;

		// call the parent constructor
		this.parent(x, y, settings);

		this.startX = x;
		this.endX = x + settings.width - settings.spritewidth;
		// size of sprite

		// make him start from the right
		this.pos.x = x + settings.width - settings.spritewidth;
		this.walkLeft = true;

		// walking & jumping speed
		this.setVelocity(2, 6);

		// make it collidable
		this.collidable = true;
		// make it a enemy object
		this.type = me.game.ENEMY_OBJECT;

	},
	// call by the engine when colliding with another object
	// obj parameter corresponds to the other object (typically the player) touching this one
	onCollision : function(res, obj) {

			
		
		
				
		// Me muestra la pantalla del game over
		me.state.set(me.state.MENU, new Gameover());
		me.state.LOADING(me.state.change(me.state.MENU, new Gameover()));
			
			//--------------------------------------------------

		// res.y >0 means touched by something on the bottom
		// which mean at top position for this one
		if(this.alive && (res.y > 0) && obj.falling) {
			this.flicker(45);
		}
	},
	// manage the enemy movement
	update : function() {
		// do nothing if not visible
		if(!this.visible)
			return false;

		if(this.alive) {
			if(this.walkLeft && this.pos.x <= this.startX) {
				this.walkLeft = false;
			} else if(!this.walkLeft && this.pos.x >= this.endX) {
				this.walkLeft = true;
			}
			this.doWalk(this.walkLeft);
		} else {
			this.vel.x = 0;
		}

		// check and update movement
		this.updateMovement();

		// update animation if necessary
		if(this.vel.x != 0 || this.vel.y != 0) {
			// update objet animation
			this.parent(this);
			return true;
		}
		return false;
	}
});

/* --------------------------
 Entidad enemiga 2
 ------------------------ */
var EnemyEntity2 = me.ObjectEntity.extend({
	init : function(x, y, settings) {
		// define this here instead of tiled
		settings.image = "murcielago";
		settings.spritewidth = 30;

		// call the parent constructor
		this.parent(x, y, settings);

		this.startX = x;
		this.endX = x + settings.width - settings.spritewidth;
		// size of sprite

		// make him start from the right
		this.pos.x = x + settings.width - settings.spritewidth;
		this.walkLeft = true;

		// walking & jumping speed
		this.setVelocity(2, 8);

		// make it collidable
		this.collidable = true;
		// make it a enemy object
		this.type = me.game.ENEMY_OBJECT;

	},
	// call by the engine when colliding with another object
	// obj parameter corresponds to the other object (typically the player) touching this one
	onCollision : function(res, obj) {
		
			// Me muestra la pantalla del game over
		me.state.set(me.state.MENU, new Gameover());
		me.state.LOADING(me.state.change(me.state.MENU, new Gameover()));
			
	

		// res.y >0 means touched by something on the bottom
		// which mean at top position for this one
		if(this.alive && (res.y > 0) && obj.falling) {
			this.flicker(45);
		}
	},
	// manage the enemy movement
	update : function() {
		// do nothing if not visible
		if(!this.visible)
			return false;

		if(this.alive) {
			if(this.walkLeft && this.pos.x <= this.startX) {
				this.walkLeft = false;
			} else if(!this.walkLeft && this.pos.x >= this.endX) {
				this.walkLeft = true;
			}
			this.doWalk(this.walkLeft);
		} else {
			this.vel.x = 0;
		}

		// check and update movement
		this.updateMovement();

		// update animation if necessary
		if(this.vel.x != 0 || this.vel.y != 0) {
			// update objet animation
			this.parent(this);
			return true;
		}
		return false;
	}
});

/*--------------
 a score HUD Item
 --------------------- */

var ScoreObject = me.HUD_Item.extend({
	init : function(x, y) {
		// call the parent constructor
		this.parent(x, y);
		// create a font
		this.font = new me.BitmapFont("32x32_font", 32);
	},
	/* -----

	 draw our score

	 ------ */
	draw : function(context, x, y) {
		this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);

	}
});



/*----------------------

 A title screen

 ----------------------*/

var TitleScreen = me.ScreenObject.extend({
	// constructor
	init : function() {
		this.parent(true);

		// title screen image
		this.title = null;

		this.font = null;
		this.scrollerfont = null;
		this.scrollertween = null;

		this.scroller = "CREADO POR SKATON";
		this.scrollerpos = 600;
	},
	// reset function
	onResetEvent : function() {
		if(this.title == null) {
			// init stuff if not yet done
			this.title = me.loader.getImage("title_screen");
			// font to display the menu items
			this.font = new me.BitmapFont("32x32_font", 32);
			this.font.set("left");

			// set the scroller
			this.scrollerfont = new me.BitmapFont("32x32_font", 32);
			this.scrollerfont.set("left");

		}

		// reset to default value
		this.scrollerpos = 640;

		// a tween to animate the arrow
		this.scrollertween = new me.Tween(this).to({
			scrollerpos : -2200
		}, 10000).onComplete(this.scrollover.bind(this)).start();

		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);

		// play something
		me.audio.play("cling");

	},
	// some callback for the tween objects
	scrollover : function() {
		// reset to default value
		this.scrollerpos = 640;
		this.scrollertween.to({
			scrollerpos : -2200
		}, 10000).onComplete(this.scrollover.bind(this)).start();
	},
	// update function
	update : function() {
		// enter pressed ?
		if(me.input.isKeyPressed('enter')) {
			me.state.change(me.state.PLAY);
		}
		return true;
	},
	// draw function
	draw : function(context) {
		context.drawImage(this.title, 0, 0);

		this.font.draw(context, "PRESIONE ENTER", 20, 240);
		this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
	},
	// destroy function
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.ENTER);

		//just in case
		this.scrollertween.stop();
	}
});

/*----------------------

 Game over

 ----------------------*/

var Gameover = me.ScreenObject.extend({
	// constructor
	init : function() {
		this.parent(true);

		// title screen image
		this.title = null;

		this.font = null;
		this.scrollerfont = null;
		this.scrollertween = null;

		this.scroller = "PRESIONE ENTER PARA COMENZAR DE NUEVO";
		this.scrollerpos = 600;
	},
	// reset function
	onResetEvent : function() {
		if(this.title == null) {
			// init stuff if not yet done
			this.title = me.loader.getImage("Gameover");
			// font to display the menu items
			this.font = new me.BitmapFont("32x32_font", 32);
			this.font.set("left");

			// set the scroller
			this.scrollerfont = new me.BitmapFont("32x32_font", 32);
			this.scrollerfont.set("left");

		}

		// reset to default value
		this.scrollerpos = 640;

		// a tween to animate the arrow
		this.scrollertween = new me.Tween(this).to({
			scrollerpos : -2200
		}, 10000).onComplete(this.scrollover.bind(this)).start();

		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);

		// play something
		me.audio.play("cling");

	},
	// some callback for the tween objects
	scrollover : function() {
		// reset to default value
		this.scrollerpos = 640;
		this.scrollertween.to({
			scrollerpos : -2200
		}, 10000).onComplete(this.scrollover.bind(this)).start();
	},
	// update function
	update : function() {
		// enter pressed ?
		if(me.input.isKeyPressed('enter')) {
			me.state.change(me.state.PLAY);
		}
		return true;
	},
	// draw function
	draw : function(context) {
		context.drawImage(this.title, 0, 0);

		this.font.draw(context, "GAMEOVER", 210, 240);
		this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
	},
	// destroy function
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.ENTER);

		//just in case
		this.scrollertween.stop();
	}
});

// add our object entities in the entity pool
me.entityPool.add("mainPlayer", PlayerEntity);
me.entityPool.add("CoinEntity", CoinEntity);
me.entityPool.add("EnemyEntity", EnemyEntity);
me.entityPool.add("EnemyEntity2", EnemyEntity2);
