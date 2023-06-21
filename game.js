enchant();

window.onload = function () {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const game = new Game(screenWidth, screenHeight);
  game.preload([
    "./images/characters/dargan.png",
    "./images/characters/elda.png",
    "./images/characters/zyra.png",
  ]); // Preload de recursos, como imagens

  const setCharacterMenu = () => {
    const menu = new Group(); // Grupo para conter as opções de personagens
    menu.x = 100; // Posição horizontal do menu
    menu.y = 100; // Posição vertical do menu

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

    const label1 = new Label("Personagem 1");
    label1.x = 0;
    label1.y = 520;

    menu.addChild(option1);
    menu.addChild(label1);

    // Opção de Personagem 2 (semelhante às opções restantes)
    const option2 = new Sprite(imageSize, imageSize);
    option2.image = game.assets["./images/characters/elda.png"];
    option2.scaleX = 0.5;
    option2.scaleY = 0.5;
    option2.x = startX + imageHalfSize + spacing;
    option2.y = 0;

    const label2 = new Label("Personagem 2");
    label2.x = 200;
    label2.y = 520;

    menu.addChild(option2);
    menu.addChild(label2);

    // Opção de Personagem 3 (semelhante às opções restantes)
    const option3 = new Sprite(imageSize, imageSize);
    option3.image = game.assets["./images/characters/zyra.png"];
    option3.scaleX = 0.5;
    option3.scaleY = 0.5;
    option3.x = startX + (imageHalfSize + spacing) * 2;
    option3.y = 0;

    const label3 = new Label("Personagem 3");
    label3.x = 400;
    label3.y = 520;

    menu.addChild(option3);
    menu.addChild(label3);

    game.rootScene.addChild(menu);
  };

  game.onload = function () {
    setCharacterMenu();
  };

  game.start();
};
