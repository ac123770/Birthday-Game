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
  createItem(50, 50, 'shield');
  createItem(50, 250, 'skull');
  createItem(150, 225, 'bat');
  createItem(275, 100, 'bat');
  createItem(425, 325, 'bat');
  createItem(475, 135, 'skull');
  createItem(650, 200, 'skull');
  createItem(750, 25, 'bat');
  createItem(900, 250, 'bat');
  
 
  
  
  
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(0, 100, 'platform');
  platforms.create(100, 275, 'platform');
  platforms.create(375, 375, 'platform');
  platforms.create(400, 175, 'platform');
  platforms.create(700, 125, 'platform');
  platforms.create(800, 300, 'platform');
  
  
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
  var badge = badges.create(1000, 400, 'trophy');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (item.key === 'bat'){
    currentScore = currentScore + 20;
  } else if (item.key === 'skull'){
    currentScore = currentScore - 10;
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
  game = new Phaser.Game(1050, 450, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#FFFFFF';

    //Load images
    game.load.image('platform', 'platform_2.png');
    game.load.image('platform2', 'platform_1.png');

    //Load spritesheets
    // game.load.spritesheet('player', 'chalkers.png', 48, 62);
    game.load.spritesheet('player', 'Karim.jpg', 79, 87);
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
    text = game.add.text(16, 16, "Karim'S Score: " + currentScore, { font: "bold 24px Arial", fill: "#B70E0E" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "#B70E0E" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "Karim's Score: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -400;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 400;
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
      winningMessage.text = "Awesome Karim, you have saved Gotham City!";
    }
  }

  function render() {

  }

};
