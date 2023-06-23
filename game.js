enchant();

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

window.onload = function () {
  const screenWidth = 800;
  const screenHeight = 600;
  const playerMovePixel = 30;
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
    "./images/cutscenes/battle.jpg",
    "./images/cutscenes/stone.jpg",
    "./images/cutscenes/dargan.jpg",
    "./images/cutscenes/elda.jpg",
    "./images/cutscenes/zyra.jpg",
    "./images/cutscenes/black.png",
  ]); // Preload de recursos, como imagens

  const menuScene = new Scene();
  const mainSceneOne = new Scene();
  const mainSceneTwo = new Scene();
  const mainSceneThree = new Scene();
  const inventoryScene = new Scene();
  const cutScenePedra = new Scene();
  const cutSceneGuerra = new Scene();
  const cutScenePreta = new Scene();
  const cutSceneMorte = new Scene();
  const cutSceneFinal = new Scene();

  // Utils
  const createMap = () => {
    const spriteWidth = 16;
    const spriteHeight = 16;

    let bgMap = [];
    let fgMapOne = [];
    let fgMapTwo = [];

    if (choosedPlayer === "dargan") {
      bgMap = backgroundMapDargan;
      fgMapOne = foregroundMapDarganOne;
      fgMapTwo = foregroundMapDarganTwo;
    } else if (choosedPlayer === "zyra") {
      bgMap = backgroundMapZyra;
      fgMapOne = foregroundMapZyraOne;
      fgMapTwo = foregroundMapZyraTwo;
    } else if (choosedPlayer === "elda") {
      bgMap = backgroundMapElda;
      fgMapOne = foregroundMapEldaOne;
      fgMapTwo = foregroundMapEldaTwo;
    }

    const backgroundMap = new Map(spriteWidth, spriteHeight);
    backgroundMap.image = game.assets["./images/sprites/default.png"];
    backgroundMap.loadData(bgMap);

    const foregroundMapOne = new Map(spriteWidth, spriteHeight);
    foregroundMapOne.image = game.assets["./images/sprites/default.png"];
    foregroundMapOne.loadData(fgMapOne);

    const foregroundMapTwo = new Map(spriteWidth, spriteHeight);
    foregroundMapTwo.image = game.assets["./images/sprites/default.png"];
    foregroundMapTwo.loadData(fgMapTwo);

    return { backgroundMap, foregroundMapOne, foregroundMapTwo };
  };

  const createCave = () => {
    const spriteWidth = 16;
    const spriteHeight = 16;

    const bgCave = new Map(spriteWidth, spriteHeight);
    bgCave.image = game.assets["./images/sprites/default.png"];
    bgCave.loadData(backgroundCave);

    const fgCave = new Map(spriteWidth, spriteHeight);
    fgCave.image = game.assets["./images/sprites/default.png"];
    fgCave.loadData(foregroundCave);

    return { bgCave, fgCave };
  };

  const createPlayer = () => {
    const spriteWidth = 16;
    const spriteHeight = 16;

    const player = new Sprite(spriteWidth, spriteHeight);
    player.image = game.assets[`./images/sprites/${choosedPlayer}.png`];
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

  function aguardarComando() {
    return new Promise(function (resolve) {
      function handleTeclado(event) {
        window.removeEventListener("keydown", handleTeclado);
        resolve(event.key);
      }
      window.addEventListener("keydown", handleTeclado);
    });
  }

  // Cutscenes
  const createCutScenePedra = async () => {
    const sceneOneGroup = new Group();

    const scene = new Sprite(800, 600);
    scene.image = game.assets[`./images/cutscenes/stone.jpg`];
    scene.x = 0;
    scene.y = 0;

    sceneOneGroup.addChild(scene);
    cutScenePedra.addChild(sceneOneGroup);

    const finalmente = new Label(
      "Finalmente, a lendária pedra do destino! Ela é minha por direito!"
    );
    finalmente.font = "15px Arial";
    finalmente.color = "#FFF";
    finalmente.x = 250;
    finalmente.y = 500;

    sceneOneGroup.addChild(finalmente);
    await aguardarComando();
    sceneOneGroup.removeChild(finalmente);

    const eiei = new Label(
      "Ei, ei! Olha só quem temos aqui. Parece que não somos os únicos que buscavam essa pedra."
    );
    eiei.font = "15px Arial";
    eiei.color = "#FFF";
    eiei.x = 200;
    eiei.y = 200;

    sceneOneGroup.addChild(eiei);
    await aguardarComando();
    sceneOneGroup.removeChild(eiei);

    const desistir = new Label(
      "Você pode desistir. Nós chegamos primeiro e não vamos deixar que uma criança como você fique com essa preciosidade."
    );
    desistir.font = "15px Arial";
    desistir.color = "#FFF";
    desistir.x = 400;
    desistir.y = 200;

    sceneOneGroup.addChild(desistir);
    await aguardarComando();
    sceneOneGroup.removeChild(desistir);

    const voces = new Label(
      "Vocês dois não têm ideia do poder que essa pedra possui. Eu vou usá-la para fazer o bem, para proteger aqueles que amo"
    );
    voces.font = "15px Arial";
    voces.color = "#FFF";
    voces.x = 250;
    voces.y = 500;

    sceneOneGroup.addChild(voces);
    await aguardarComando();
    sceneOneGroup.removeChild(voces);

    const ouvimos = new Label(
      "Ah, ouvimos essa história antes. Todos querem usar o poder para o bem, mas no final, é a ambição que prevalece."
    );
    ouvimos.font = "15px Arial";
    ouvimos.color = "#FFF";
    ouvimos.x = 200;
    ouvimos.y = 200;

    sceneOneGroup.addChild(ouvimos);
    await aguardarComando();
    sceneOneGroup.removeChild(ouvimos);

    const especial = new Label(
      "Você acha que é especial? Acredita que merece esse poder mais do que nós? Vamos ver se você consegue nos impedir."
    );
    especial.font = "15px Arial";
    especial.color = "#FFF";
    especial.x = 400;
    especial.y = 200;

    sceneOneGroup.addChild(especial);
    await aguardarComando();
    sceneOneGroup.removeChild(especial);

    const black = new Sprite(800, 600);
    black.image = game.assets["./images/cutscenes/black.png"];
    black.opacity = 0;
    sceneOneGroup.addChild(black);

    for (let i = 0; i < 10; i++) {
      await sleep(100);
      black.opacity = black.opacity + 0.1;
    }

    createCutScenePreta()
    game.replaceScene(cutScenePreta);
  };

  const createCutSceneGuerra = async () => {
    const sceneOneGroup = new Group();

    const scene = new Sprite(800, 600);
    scene.image = game.assets[`./images/cutscenes/battle.jpg`];
    scene.x = 0;
    scene.y = 0;

    sceneOneGroup.addChild(scene);
    cutSceneGuerra.addChild(sceneOneGroup);

    const falas = new Label();
    falas.font = "15px Arial";
    falas.color = "#FFF";
    falas.x = 250;
    falas.y = 500;

    sceneOneGroup.addChild(falas);

    falas.text = "Num mundo devastado pela guerra e pela ganância, três raças distintas lutam pela supremacia e pelos recursos escassos nos Reinos em Guerra"

    await aguardarComando();

    falas.text = `Mas existe uma esperança de acabar com toda a guerra que acontece durante muito tempo. A esperança é você, ${choosedPlayer.at(0).toUpperCase() + choosedPlayer.slice(1, choosedPlayer.length)}!`
    
    await aguardarComando();
    
    falas.text = 'Existe a lenda de um antigo artefáto que dará um grande poder pra quem o descobrir'
    
    await aguardarComando();
    
    falas.text = 'Talvez essa seja a esperança que procuramos?'

    await aguardarComando();

    game.replaceScene(mainSceneOne);
  }

  const createCutSceneFinal = async () => {
    const sceneOneGroup = new Group();
    const scene = new Sprite(800, 600);
    scene.image = game.assets[`./images/cutscenes/black.png`];
    scene.x = 0;
    scene.y = 0;

    sceneOneGroup.addChild(scene)
    cutSceneMorte.addChild(sceneOneGroup);

    const falas = new Label();
    falas.font = "20px Arial";
    falas.color = "#FFF";
    falas.x = 260;
    falas.y = 280;

    sceneOneGroup.addChild(falas);

    falas.text = `Os reinos continuarão em guerra!`
    await aguardarComando()
  }

  const createCutSceneMorte = async () => {
    const sceneOneGroup = new Group();
    const scene = new Sprite(800, 600);
    scene.image = game.assets[`./images/cutscenes/${choosedPlayer}.jpg`];
    scene.x = 0;
    scene.y = 0;

    sceneOneGroup.addChild(scene)
    cutSceneMorte.addChild(sceneOneGroup);

    await aguardarComando()
    createCutSceneFinal()

    const black = new Sprite(800, 600);
    black.image = game.assets["./images/cutscenes/black.png"];
    black.opacity = 0;
    sceneOneGroup.addChild(black);

    for (let i = 0; i < 10; i++) {
      await sleep(100);
      black.opacity = black.opacity + 0.1;
    }

    await sleep(1000)
    game.replaceScene(cutSceneFinal)
  }

  const createCutScenePreta = async () => {
    const sceneOneGroup = new Group();

    const scene = new Sprite(800, 600);
    scene.image = game.assets[`./images/cutscenes/black.png`];
    scene.x = 0;
    scene.y = 0;

    sceneOneGroup.addChild(scene);
    cutScenePreta.addChild(sceneOneGroup);

    const falas = new Label();
    falas.font = "25px Arial";
    falas.color = "#FFF";
    falas.x = 250;
    falas.y = 250;

    sceneOneGroup.addChild(falas);

    falas.text = `Após uma longa batalha contra os inimigos, ${choosedPlayer} venceu!`

    await aguardarComando();

    falas.x = 350;
    falas.y = 250;
    falas.text = 'Porem...'

    await aguardarComando();

    const black = new Sprite(800, 600);
    black.image = game.assets["./images/cutscenes/black.png"];
    black.opacity = 0;
    sceneOneGroup.addChild(black);

    for (let i = 0; i < 10; i++) {
      await sleep(100);
      black.opacity = black.opacity + 0.1;
    }

    await sleep(1000)
    createCutSceneMorte()
    game.replaceScene(cutSceneMorte);
  }

  // Cenas de jogo
  const createMainSceneOne = (player) => {
    const { backgroundMap, foregroundMapOne } = createMap();

    const mainSceneGroup = new Group();
    mainSceneGroup.addChild(backgroundMap);
    mainSceneGroup.addChild(player);
    mainSceneGroup.addChild(foregroundMapOne);

    mainSceneOne.addEventListener("enterframe", () => {
      if (game.input.up && player.y >= 2) {
        player.y -= playerMovePixel;
      }
      if (game.input.down && player.y <= 590) {
        player.y += playerMovePixel;
      }
      if (game.input.left && player.x >= 2) {
        player.x -= playerMovePixel;
      }
      if (game.input.right) {
        player.x += playerMovePixel;
      }
      if (game.input.right && player.x > 790) {
        player.x = 10;
        createMainSceneTwo(player);
        game.replaceScene(mainSceneTwo);
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

    mainSceneOne.addChild(mainSceneGroup);
  };

  const createMainSceneTwo = (player) => {
    const { backgroundMap, foregroundMapTwo } = createMap();

    const mainSceneGroup = new Group();
    mainSceneGroup.addChild(backgroundMap);
    mainSceneGroup.addChild(player);
    mainSceneGroup.addChild(foregroundMapTwo);

    mainSceneTwo.addEventListener("enterframe", () => {
      if (game.input.up && player.y >= 2) {
        player.y -= playerMovePixel;
      }
      if (game.input.down && player.y <= 590) {
        player.y += playerMovePixel;
      }
      if (game.input.left) {
        player.x -= playerMovePixel;
      }
      if (game.input.left && player.x <= 2) {
        player.x = 790;
        createMainSceneOne(player);
        game.replaceScene(mainSceneOne);
      }
      if (game.input.right) {
        player.x += playerMovePixel;
      }
      if (game.input.right && player.x > 790) {
        player.x = 10;
        createMainSceneThree(player);
        game.replaceScene(mainSceneThree);
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

    mainSceneTwo.addChild(mainSceneGroup);
  };

  const createMainSceneThree = (player) => {
    const { bgCave, fgCave } = createCave();

    const mainSceneGroup = new Group();
    mainSceneGroup.addChild(bgCave);
    mainSceneGroup.addChild(player);
    mainSceneGroup.addChild(fgCave);

    mainSceneThree.addEventListener("enterframe", () => {
      if (game.input.up && player.y >= 2) {
        player.y -= playerMovePixel;
      }
      if (game.input.down && player.y <= 590) {
        player.y += playerMovePixel;
      }
      if (game.input.left && player.x >= 2) {
        player.x -= playerMovePixel;
      }
      if (game.input.right) {
        player.x += playerMovePixel;
      }
      if (game.input.inventory) {
        game.pushScene(inventoryScene);
      }
      if (game.input.interact) {
        if (
          player.x > 340 &&
          player.x < 480 &&
          player.y > 200 &&
          player.y < 300
        ) {
          createCutScenePedra();

          async function apagaCena() {
            const black = new Sprite(800, 600);
            black.image = game.assets["./images/cutscenes/black.png"];
            black.opacity = 0;
            mainSceneGroup.addChild(black);

            for (let i = 0; i < 10; i++) {
              await sleep(100);
              black.opacity = black.opacity + 0.1;
            }

            game.replaceScene(cutScenePedra);
          }

          apagaCena();
        }
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

    mainSceneThree.addChild(mainSceneGroup);
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

        choosedPlayer = "dargan";
        const player = createPlayer();
        createMainSceneOne(player);
        createCutSceneGuerra()
        game.replaceScene(cutSceneGuerra);
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

        choosedPlayer = "elda";
        const player = createPlayer();
        createMainSceneOne(player);
        createCutSceneGuerra()
        game.replaceScene(cutSceneGuerra);
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

        choosedPlayer = "zyra";
        const player = createPlayer();
        createMainSceneOne(player);
        createCutSceneGuerra()
        game.replaceScene(cutSceneGuerra);
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

  /// Jogo
  game.onload = function () {
    createMenuScene();
    inventarioScene();
  };

  game.start();
};
