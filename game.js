enchant();

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

window.onload = function () {
  const screenWidth = 800;
  const screenHeight = 600;
  let choosedPlayer = "";

  const game = new Game(screenWidth, screenHeight);
  game.preload([
    "./images/characters/dargan.png",
    "./images/characters/elda.png",
    "./images/characters/zyra.png",
    "./images/sprites/default.png",
    "./images/sprites/dargan.png",
    "./images/sprites/elda.png",
    "./images/sprites/zyra.png",
    "./images/items/common_sword.png",
    "./images/items/green_sword.png",
    "./images/items/poison_dagger.png",
    "./images/items/warlord_sword.png",
  ]); // Preload de recursos, como imagens

  const menuScene = new Scene();
  const mainScene = new Scene();
  const inventoryScene = new Scene();

  const createMap = () => {
    const spriteWidth = 16;
    const spriteHeight = 16;

    const map = new Map(spriteWidth, spriteHeight);
    map.image = game.assets["./images/sprites/default.png"];
    map.loadData(mapData);

    const foregroundMap = new Map(spriteWidth, spriteHeight);
    foregroundMap.image = game.assets["./images/sprites/default.png"];
    foregroundMap.loadData(foregroundData);

    const collisionData = [];
    for (var i = 0; i < foregroundData.length; i++) {
      collisionData.push([]);
      for (var j = 0; j < foregroundData[0].length; j++) {
        var collision = foregroundData[i][j] % 13 > 1 ? 1 : 0;
        collisionData[i][j] = collision;
      }
    }

    map.collisionData = collisionData;
    return { map, foregroundMap };
  };

  const createPlayer = () => {
    const spriteWidth = 16;
    const spriteHeight = 16;

    const player = new Sprite(spriteWidth, spriteHeight);
    player.image = game.assets[choosedPlayer];
    player.frame = 6;
    player.animationSpeed = 0.2;
    player.addEventListener("enterframe", () => {
      if (game.input.up) {
        player.frame = (Math.floor(player.age * player.animationSpeed) % 2) + 7; // frames 8 e 9 para cima
      } else if (game.input.down) {
        player.frame = (Math.floor(player.age * player.animationSpeed) % 2) + 5; // frames 6 e 7 para baixo
      } else if (game.input.left) {
        player.frame =
          (Math.floor(player.age * player.animationSpeed) % 2) + 11; // frames 2 e 3 para esquerda
      } else if (game.input.right) {
        player.frame = (Math.floor(player.age * player.animationSpeed) % 2) + 9; // frames 4 e 5 para direita
      }
    });

    player.x = 152;
    player.y = 152;

    return player;
  };

  const createMainScene = () => {
    const { map, foregroundMap } = createMap();
    const player = createPlayer();

    const mainSceneGroup = new Group();
    mainSceneGroup.addChild(map);
    mainSceneGroup.addChild(player);
    mainSceneGroup.addChild(foregroundMap);

    mainScene.addEventListener("enterframe", () => {
      if (game.input.up) {
        player.y -= 2;
      }
      if (game.input.down) {
        player.y += 2;
      }
      if (game.input.left) {
        player.x -= 2;
      }
      if (game.input.right) {
        player.x += 2;
      }
      if (game.input.inventory) {
        game.pushScene(inventoryScene);
      }
      if (game.input.interact) {
        console.log("apertou e");
      }
      if (game.input.skillOne) {
        console.log("apertou 1");
      }
      if (game.input.skillTwo) {
        console.log("apertou 2");
      }
      if (game.input.useSkill) {
        console.log("apertou espaco");
      }
    });

    mainScene.addChild(mainSceneGroup);
  };

  const createMenuScene = () => {
    const menuSceneGroup = new Group();
    menuSceneGroup.x = 140; // Posição horizontal do menu
    menuSceneGroup.y = 150; // Posição vertical do menu
    menuSceneGroup.scaleX = 0.5;
    menuSceneGroup.scaleY = 0.5;

    const startX = 0;
    const imageSize = 512;
    const imageHalfSize = imageSize / 2;
    const spacing = 20;

    // Opção de Personagem 1
    const option1 = new Sprite(imageSize, imageSize);
    option1.image = game.assets["./images/characters/dargan.png"];
    option1.scaleX = 0.5; // Redimensiona pela metade na horizontal
    option1.scaleY = 0.5; // Redimensiona pela metade na vertical
    option1.x = startX;
    option1.y = 0;
    option1.addEventListener("touchstart", () => {
      option1.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          option1.opacity = option1.opacity + 0.1;
        }

        choosedPlayer = "./images/sprites/dargan.png";
        createMainScene();
        game.replaceScene(mainScene);
      }

      alteraOpacity();
    });

    const label1 = new Label("Dargan");
    label1.x = 200;
    label1.y = 420;
    label1.font = "30px Arial";
    label1.color = "#FFF";

    menuSceneGroup.addChild(option1);
    menuSceneGroup.addChild(label1);

    // Opção de Personagem 2 (semelhante às opções restantes)
    const option2 = new Sprite(imageSize, imageSize);
    option2.image = game.assets["./images/characters/elda.png"];
    option2.scaleX = 0.5;
    option2.scaleY = 0.5;
    option2.x = startX + imageHalfSize + spacing;
    option2.y = 0;
    option2.addEventListener("touchstart", () => {
      option2.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          option2.opacity = option2.opacity + 0.1;
        }

        choosedPlayer = "./images/sprites/elda.png";
        createMainScene();
        game.replaceScene(mainScene);
      }

      alteraOpacity();
    });

    const label2 = new Label("Elda");
    label2.x = 500;
    label2.y = 420;
    label2.font = "30px Arial";
    label2.color = "#FFF";

    menuSceneGroup.addChild(option2);
    menuSceneGroup.addChild(label2);

    // Opção de Personagem 3 (semelhante às opções restantes)
    const option3 = new Sprite(imageSize, imageSize);
    option3.image = game.assets["./images/characters/zyra.png"];
    option3.scaleX = 0.5;
    option3.scaleY = 0.5;
    option3.x = startX + (imageHalfSize + spacing) * 2;
    option3.y = 0;
    option3.addEventListener("touchstart", () => {
      option3.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          option3.opacity = option3.opacity + 0.1;
        }

        choosedPlayer = "./images/sprites/zyra.png";
        createMainScene();
        game.replaceScene(mainScene);
      }

      alteraOpacity();
    });

    const label3 = new Label("Zyra");
    label3.x = 780;
    label3.y = 420;
    label3.font = "30px Arial";
    label3.color = "#FFF";

    menuSceneGroup.addChild(option3);
    menuSceneGroup.addChild(label3);

    menuScene.addChild(menuSceneGroup);
    game.replaceScene(menuScene);
  };

  const inventarioScene = () => {
    const inventario = new Group(); // Grupo para conter as opções de personagens
    inventario.x = 140; // Posição horizontal do menu
    inventario.y = 150; // Posição vertical do menu

    const startX = -60;

    const commonSword = new Sprite(320, 320);
    commonSword.image = game.assets["./images/items/common_sword.png"];
    commonSword.scaleX = 0.2; // Redimensiona pela metade na horizontal
    commonSword.scaleY = 0.2; // Redimensiona pela metade na vertical
    commonSword.x = startX;
    commonSword.y = -160;
    commonSword.addEventListener("touchstart", () => {
      commonSword.opacity = 0.3;
      commonSwordLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          commonSword.opacity = commonSword.opacity + 0.1;
          commonSwordLabel.opacity = commonSwordLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    const commonSwordLabel = new Label("Common Sword(atk: 1)");
    commonSwordLabel.x = 160;
    commonSwordLabel.y = -15;
    commonSwordLabel.font = "29px Arial";
    commonSwordLabel.color = "#FFF";
    commonSwordLabel.addEventListener("touchstart", () => {
      commonSword.opacity = 0.3;
      commonSwordLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          commonSword.opacity = commonSword.opacity + 0.1;
          commonSwordLabel.opacity = commonSwordLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    const greenSword = new Sprite(320, 320);
    greenSword.image = game.assets["./images/items/green_sword.png"];
    greenSword.scaleX = 0.2; // Redimensiona pela metade na horizontal
    greenSword.scaleY = 0.2; // Redimensiona pela metade na vertical
    greenSword.x = startX;
    greenSword.y = -70;
    greenSword.addEventListener("touchstart", () => {
      greenSword.opacity = 0.3;
      greenSwordLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          greenSword.opacity = greenSword.opacity + 0.1;
          greenSwordLabel.opacity = greenSwordLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    const greenSwordLabel = new Label("Green Sword(atk: 3)");
    greenSwordLabel.x = 160;
    greenSwordLabel.y = 75;
    greenSwordLabel.font = "29px Arial";
    greenSwordLabel.color = "#FFF";
    greenSwordLabel.addEventListener("touchstart", () => {
      greenSword.opacity = 0.3;
      greenSwordLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          greenSword.opacity = greenSword.opacity + 0.1;
          greenSwordLabel.opacity = greenSwordLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    const poisonDagger = new Sprite(320, 320);
    poisonDagger.image = game.assets["./images/items/poison_dagger.png"];
    poisonDagger.scaleX = 0.2; // Redimensiona pela metade na horizontal
    poisonDagger.scaleY = 0.2; // Redimensiona pela metade na vertical
    poisonDagger.x = startX;
    poisonDagger.y = 20;
    poisonDagger.addEventListener("touchstart", () => {
      poisonDagger.opacity = 0.3;
      poisonDaggerLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          poisonDagger.opacity = poisonDagger.opacity + 0.1;
          poisonDaggerLabel.opacity = poisonDaggerLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    const poisonDaggerLabel = new Label("Poison Dagger(atk: 7)");
    poisonDaggerLabel.x = 160;
    poisonDaggerLabel.y = 165;
    poisonDaggerLabel.font = "29px Arial";
    poisonDaggerLabel.color = "#FFF";
    poisonDaggerLabel.addEventListener("touchstart", () => {
      poisonDagger.opacity = 0.3;
      poisonDaggerLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          poisonDagger.opacity = poisonDagger.opacity + 0.1;
          poisonDaggerLabel.opacity = poisonDaggerLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    const warlodSword = new Sprite(320, 320);
    warlodSword.image = game.assets["./images/items/warlord_sword.png"];
    warlodSword.scaleX = 0.2; // Redimensiona pela metade na horizontal
    warlodSword.scaleY = 0.2; // Redimensiona pela metade na vertical
    warlodSword.x = startX;
    warlodSword.y = 110;
    warlodSword.addEventListener("touchstart", () => {
      warlodSword.opacity = 0.3;
      wardlordSwordLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          warlodSword.opacity = warlodSword.opacity + 0.1;
          wardlordSwordLabel.opacity = wardlordSwordLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    const wardlordSwordLabel = new Label("Warlord Sword(atk: 15)");
    wardlordSwordLabel.x = 160;
    wardlordSwordLabel.y = 255;
    wardlordSwordLabel.font = "29px Arial";
    wardlordSwordLabel.color = "#FFF";
    wardlordSwordLabel.addEventListener("touchstart", () => {
      warlodSword.opacity = 0.3;
      wardlordSwordLabel.opacity = 0.3;

      async function alteraOpacity() {
        for (let i = 0; i < 7; i++) {
          await sleep(50);
          warlodSword.opacity = warlodSword.opacity + 0.1;
          wardlordSwordLabel.opacity = wardlordSwordLabel.opacity + 0.1;
        }

        game.popScene();
      }

      alteraOpacity();
    });

    inventario.addChild(commonSword);
    inventario.addChild(commonSwordLabel);

    inventario.addChild(greenSword);
    inventario.addChild(greenSwordLabel);

    inventario.addChild(poisonDagger);
    inventario.addChild(poisonDaggerLabel);

    inventario.addChild(warlodSword);
    inventario.addChild(wardlordSwordLabel);

    inventoryScene.addChild(inventario);
    inventoryScene.addEventListener("enterframe", () => {
      if (game.input.scape) {
        game.popScene();
      }
    });
  };

  game.onload = function () {
    createMenuScene();
    inventarioScene();
  };

  game.start();
};
