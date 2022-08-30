class Preload extends Phaser.Scene {

    constructor() {

        super("PreloadScene");

    }

    preload() {

        //load the json map created in TiledMap program
        this.load.tilemapTiledJSON("map", "assets/crystal_world_map.json");  // (key, src)
        
        //loading the images will be used to add to tilemapTiledJSON
        this.load.image("tiles-1", "assets/main_lev_build_1.png"); //(key, src)
        // this.load.image("tiles-1", "assets/main_lev_build_2");
    
        //load player
        // this.load.image("player", "assets/player/movements/idle01.png")
        this.load.spritesheet("player", "assets/player/move_sprite_1.png", {frameWidth: 32, frameHeight: 38, spacing: 32}); //spacing defines the spacing between each sprite

        this.load.spritesheet("birdman", "assets/enemy/enemy_sheet.png", {frameWidth: 32, frameHeight: 64, spacing: 32});
    
    }

    create() {

       this.scene.start("PlayScene");
       
    }
}