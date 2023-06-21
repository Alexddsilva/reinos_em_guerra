const inventarioScene = () => {
  game.preload([
    "./images/characters/dargan.png",
    "./images/characters/elda.png",
    "./images/characters/zyra.png",
    "./images/items/common_sword.png",
    "./images/items/green_sword.png",
    "./images/items/poison_dagger.png",
    "./images/items/warlord_sword.png",
  ]); // Preload de recursos, como imagens

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

  game.rootScene.addChild(inventario);
};
