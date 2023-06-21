enchant();

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

window.onload = function () {
  const screenWidth = 800;
  const screenHeight = 600;

  const game = new Game(screenWidth, screenHeight);
  game.preload([
    "./images/characters/dargan.png",
    "./images/characters/elda.png",
    "./images/characters/zyra.png",
  ]); // Preload de recursos, como imagens

  const setCharacterMenu = () => {
    const menu = new Group(); // Grupo para conter as opções de personagens
    menu.x = 140; // Posição horizontal do menu
    menu.y = 150; // Posição vertical do menu
    menu.scaleX = 0.5;
    menu.scaleY = 0.5;

    console.log(menu);

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
      }

      alteraOpacity();
    });

    const label1 = new Label("Dargan");
    label1.x = 200;
    label1.y = 420;
    label1.font = "30px Arial";
    label1.color = "#FFF";

    menu.addChild(option1);
    menu.addChild(label1);

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
      }

      alteraOpacity();
    });

    const label2 = new Label("Elda");
    label2.x = 500;
    label2.y = 420;
    label2.font = "30px Arial";
    label2.color = "#FFF";

    menu.addChild(option2);
    menu.addChild(label2);

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
      }

      alteraOpacity();
    });

    const label3 = new Label("Zyra");
    label3.x = 780;
    label3.y = 420;
    label3.font = "30px Arial";
    label3.color = "#FFF";

    menu.addChild(option3);
    menu.addChild(label3);

    game.rootScene.addChild(menu);
  };

  game.onload = function () {
    setCharacterMenu();
  };

  game.start();
};
