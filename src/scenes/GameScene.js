import Phaser from "phaser";

const GROUND_KEY = "ground";
const DUDE_KEY = "dude";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");

    this.player = undefined;
    this.cursors = undefined;
    this.line = undefined;
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image(GROUND_KEY, "assets/platform.png");
    this.load.image("sky", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("raster", "assets/raster-bw-800x16.png");

    this.load.spritesheet(DUDE_KEY, "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");
    //const platforms = this.createPlatforms();
    this.line = this.createLine();
    this.player = this.createPlayer();
    // this.physics.add.collider(this.player, platforms);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createLine() {
    var group = this.add.group();

    group.createMultiple({ key: "raster", repeat: 0 });

    var hsv = Phaser.Display.Color.HSVColorWheel();

    var i = 0;

    var _this = this;

    group.children.iterate(function (child) {
      child.x = 400;
      child.y = 100;
      child.depth = 64 - i;

      child.setTint(hsv[i * 4].color);

      i++;

      _this.tweens.add({
        targets: child,
        props: {
          y: { value: 500, duration: 1500 },
          scaleX: {
            value: child.depth / 64,
            duration: 6000,
            hold: 2000,
            delay: 2000,
          },
        },
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay: 32 * i,
      });
    });
    // const yAxis = 10;
    // const line = this.add.image(400, yAxis, "raster");
    // var i = 0;
  }

  // update() {
  //   if (this.cursors.left.isDown) {
  //     this.player.setVelocityX(-160);
  //     this.player.anims.play("left", true);
  //   } else if (this.cursors.right.isDown) {
  //     this.player.setVelocityX(160);
  //     this.player.anims.play("right", true);
  //   } else {
  //     this.player.setVelocityX(0);
  //     this.player.anims.play("turn");
  //   }
  //   if (this.cursors.up.isDown && this.player.body.touching.down) {
  //     this.player.setVelocityY(-330);
  //   }
  // }

  // createPlatforms() {
  //   const platforms = this.physics.add.staticGroup();

  //   platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody();
  //   platforms.create(600, 400, GROUND_KEY);
  //   platforms.create(50, 250, GROUND_KEY);
  //   platforms.create(750, 220, GROUND_KEY);

  //   return platforms;
  // }
  createPlayer() {
    const player = this.physics.add.sprite(100, 450, DUDE_KEY);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: DUDE_KEY, frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    return player;
  }
}
