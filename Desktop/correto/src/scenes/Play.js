class Play extends Phaser.Scene {

    constructor() {

        super("PlayScene");

    }

    create() {

        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones.start); //playerZones parameter
        this.createEndOfLevel(playerZones.end, player, layers.platformsColliders);
        const enemy = this.createEnemy();
        this.physics.add.collider(player, layers.platformsColliders);
        this.physics.add.collider(enemy, layers.platformsColliders);
        this.physics.add.collider(player, enemy);

    }

    createMap() {
        const map = this.make.tilemap({ key: "map" });

        //adding the images used for map
        map.addTilesetImage("main_lev_build_1", "tiles-1");
        // map.addTilesetImage("main_lev_build_1", "tiles-2");  //(name of )
        return map;
    }

    createLayers(map) {
        let tileset = map.getTileset("main_lev_build_1");

        //it needs to invert the order compared to Tiled program order

        const platformsColliders = map.createLayer("colliders", tileset); //purple tiles that collides to player
        const environments = map.createLayer("environments", tileset);
        const alif = map.createLayer("alif", tileset);
        const platforms = map.createDynamicLayer("platforms", tileset);

        // platformsColliders.setCollisionByExclusion(-1, true); //tells phaser to enable collisions for every tiles index isn't -1
        platformsColliders.setCollisionByProperty({ collides: true });

        const playerZones = map.getObjectLayer("player_zones");

        return { environments, platforms, platformsColliders, playerZones, alif };
    }

    createPlayer(start) {
        // const player = this.physics.add.sprite(100, 250, "player");
        return new Player(this, start.x, start.y); // this = this actual scene    -    ...arguments above
    }

    createEnemy(){

        return new Birdman(this, 200, 200);

    }

    getPlayerZones(playerZonesLayer) {

        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === "startZone"),
            end: playerZones.find(zone => zone.name === "endZone"),
        }

    }

    createEndOfLevel(end, player, colliders = null) {

        const endOfLevel = this.physics.add.sprite(end.x, end.y, "end");

        this.physics.add.collider(endOfLevel, colliders);

        const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            eolOverlap.active = false; //active = false -> makes work just one time
            console.log("player win");
        })

    }

}