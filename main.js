/*!
 * 
 *   
 *   
 *		
 *   
 *
 **/


//Recursos del Juego
var g_resources = [
// our level tileset
{
    name: "area01_level_tiles",
    type: "image",
    src: "data/area01_tileset/area01_level_tiles.png"
}, 
// Primera pantalla
{
    name: "area01",
    type: "tmx",
    src: "data/area01.tmx"
}, 

   
// Segundo Nivel
{
    name: "area02",
    type: "tmx",
    src: "data/area02.tmx"
},

  
// Tercer Nivel
{
    name: "area03",
    type: "tmx",
    src: "data/area03.tmx"
},

   // Cuarto Nivel
{
    name: "area04",
    type: "tmx",
    src: "data/area04.tmx"
},

  // Quinto Nivel
{
    name: "area05",
    type: "tmx",
    src: "data/area05.tmx"
},

// Jugador
{
    name: "gripe_run_right",
    type: "image",
    src: "data/sprite/gripe_run_right.png"
}, 


// Fondo del juego
{
    name: "area01_bkg0",
    type: "image",
    src: "data/area01_parallax/area01_bkg0.gif"
}, 



//pantalla de inicio del juego
{
    name: "title_screen",
    type: "image",
    src: "data/GUI/title_screen.jpg"
}, 

//pantalla de Game over
{
    name: "Gameover",
    type: "image",
    src: "data/GUI/Gameover.jpg"
}, 


// sprites de las monedas
{
    name: "spinning_coin_gold",
    type: "image",
    src: "data/sprite/spinning_coin_gold.png"
}, 
// Fantasma Enemigo
{
    name: "wheelie_right",
    type: "image",
    src: "data/sprite/wheelie_right.png"
}, 

// Murcielago Enemigo
{
    name: "murcielago",
    type: "image",
    src: "data/sprite/murcielago.png"
}, 

// fuente del juego (letras)
{
    name: "32x32_font",
    type: "image",
    src: "data/sprite/32x32_font.png"
}, 



// Recursos de audio 
{
    name: "cling",
    type: "audio",
    src: "data/audio/",
    channel: 2
}, {
    name: "stomp",
    type: "audio",
    src: "data/audio/",
    channel: 1
}, {
    name: "jump",
    type: "audio",
    src: "data/audio/",
    channel: 1
}, {
    name: "DST-InertExponent",
    type: "audio",
    src: "data/audio/",
    channel: 1
    
    
 
    
}];


var jsApp = {
    /* ---
 
     Initialize the jsApp
 
     --- */
    onload: function() {
 
        // init the video
        if (!me.video.init('jsapp', 640, 480, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }
 
        // initialize the "audio"
        me.audio.init("mp3,ogg");
 
        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);
 
        // set all resources to be loaded
        me.loader.preload(g_resources);
 
        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },
 
    /* ---
 
  Hace la llamada cuando todo se ha cargado
 
    --- */
loaded: function() {
	
	//me.state me muestra el estado del juego 
	
    // Me muestra el menu del juego (pantalla de inicio)
    me.state.set(me.state.MENU, new TitleScreen());
 
 	
    
    // Me muestra ya la escena del juego
    me.state.set(me.state.PLAY, new PlayScreen());
 
    // establece una transición global  durante la decoloración de la pantalla
    me.state.transition("fade", "#FFFFFF", 250);
 
    // se añade nuestras entidades a la  the entity pool (clase que se usa para instanciar un objeto definido en el mapa)
    me.entityPool.add("mainPlayer", PlayerEntity);
    me.entityPool.add("CoinEntity", CoinEntity);
    me.entityPool.add("EnemyEntity", EnemyEntity);
    me.entityPool.add("EnemyEntity2", EnemyEntity2);
 
    // Habilita el teclado
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.X, "jump", true);
 
    // display the menu title
    //me.state.change >>>cambia el estado del juego
    me.state.change(me.state.MENU);
}
 
};
// jsApp

 /*El material de juego 
  * 
  */
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
    	
    	// play the audio track
   		 me.audio.playTrack("DST-InertExponent");
        // load a level
        me.levelDirector.loadLevel("area01");
 
        // add a default HUD to the game mngr
        me.game.addHUD(0, 430, 640, 60);
        
        
 		
        // add a new HUD item
        me.game.HUD.addItem("score", new ScoreObject(620, 10));
        
        
        
        
 
 
        //se asegura de que todo este en el orden correcto
        me.game.sort();
        
      
        
        
 
    },
    
    
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {
         // remove the HUD
    me.game.disableHUD();
 
    // stop the current audio track
    me.audio.stopTrack();
    }
 
});
 
 
 
 
//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});