class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);

            //call the init function
        this.init();
        this.initEvents();

    }

    init() {

        this.gravity = 1200;
        this.playerSpeed = 250;
        this.body.setGravity(0, this.gravity);
        this.setCollideWorldBounds();
        // this.body.setSize(this.width - 15, this.height);
        this.body.setBounce(0.2);

        //cursors
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });


        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 17, end: 23 }),
            frameRate: 10,
            repeat: -1
        });


    }

    initEvents() {

        //faz com que a cena ouça o update que esta nessa classe player
        //update from this player class will be heard for actual scene
        //sem isso, a cena não irá ouvir o update dessa classe Player.
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        //enquanto fazer o update da cena, execute o update desta classe.

    }

    update() {

        if (this.cursors.left.isDown) {

            this.setVelocityX(-this.playerSpeed);
            this.flipX = true; // flip the sprite to the left

        } else if (this.cursors.right.isDown) {

            this.setVelocityX(this.playerSpeed);
            this.flipX = false; // use the original sprite looking to the right

        } else {

            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.onFloor()) {

            this.body.setVelocityY(-900);

        }


        //setting animations

        if (this.body.onFloor()) {

            if (this.body.velocity.x == 0)
                this.play("idle", true);
            else
                this.play("run", true);

        } else {

            this.play("jump", true);

        }

    }

    


}