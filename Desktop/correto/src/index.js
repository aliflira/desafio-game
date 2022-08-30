const WIDTH = 1640;
const HEIGHT = 600;

const SHARED_CONFIG = {

width: WIDTH,
height: HEIGHT

}

const Scenes = [Preload, Play];

const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {

    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 400 }
        }
    },
    scene: initScenes()

}

var game = new Phaser.Game(config);