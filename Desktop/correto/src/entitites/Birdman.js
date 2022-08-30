class Birdman extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "birdman");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //call the init function
        this.init();

    }

    init() {

        this.gravity = 1200;
        this.speed = 250;
        this.body.setGravity(0, this.gravity);
        this.setCollideWorldBounds();
        this.body.setBounce(0.2);

    }

}