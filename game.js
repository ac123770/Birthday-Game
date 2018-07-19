// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 325, 'bat');
  createItem(100, 225, 'bat');
  createItem(575, 100, 'bat');
  createItem(650, 250, 'bat');
  createItem(225, 200, 'bat');
  createItem(375, 100, 'skull');
  createItem(375, 450, 'skull');
  createItem(50, 300, 'skull');
  createItem(125, 50, 'shield');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(100, 275, 'platform');
  platforms.create(50, 100, 'platform');
  platforms.create(300, 170, 'platform');
  platforms.create(650, 300, 'platform');
  platforms.create(550, 150, 'platform');
  platforms.create(300, 390, 'platform');
  platforms.setAll('body.immovable', true);
}


// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(700, 400, 'trophy');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (item.key === 'bat'){
    currentScore = currentScore + 20;
  } else if (item.key === 'skull'){
    currentScore = currentScore - 20;
  } else if (item.key === 'shield'){
    currentScore = currentScore + 50;
  }
  if (currentScore >= winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(1400, 450, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#FFFFFF';

    //Load images
    game.load.image('platform', 'platform_2.png');
    game.load.image('platform2', 'platform_1.png');

    //Load spritesheets
    // game.load.spritesheet('player', 'chalkers.png', 48, 62);
    game.load.spritesheet('player', 'Noah.jpg', 44, 50);
    game.load.spritesheet('bat', 'Batman.jpg', 55, 31);
    game.load.spritesheet('trophy', 'Trophy.jpg', 42, 54);
    game.load.spritesheet('skull', 'skullauto.jpg', 43.625, 40);
    game.load.spritesheet('shield', 'shield.jpg', 37, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 600;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "NOAH'S SCORE: " + currentScore, { font: "bold 24px Arial", fill: "#B70E0E" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "#B70E0E" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "NOAH'S SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player wins the game
    if (won) {
      winningMessage.text = "YOU SAVE THE CITY!";
    }
  }

  function render() {

  }

};
