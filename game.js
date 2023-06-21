enchant();

window.onload = function () {
  const game = new Game(800, 600);
  game.preload("caminho/para/spritesheet.png"); // Preload de recursos, como imagens

  const setCharacterMenu = () => {
    const menu = new enchant.Group(); // Grupo para conter as opções de personagens
    menu.x = 100; // Posição horizontal do menu
    menu.y = 100; // Posição vertical do menu

    // Opção de Personagem 1
    const option1 = new enchant.Sprite(512, 512);
    option1.image = game.assets["character1.png"];
    option1.scaleX = 0.5; // Redimensiona pela metade na horizontal
    option1.scaleY = 0.5; // Redimensiona pela metade na vertical
    option1.x = 0;
    option1.y = 0;

    const label1 = new enchant.Label("Personagem 1");
    label1.x = 0;
    label1.y = 520;

    menu.addChild(option1);
    menu.addChild(label1);

    // Opção de Personagem 2 (semelhante às opções restantes)
    const option2 = new enchant.Sprite(512, 512);
    option2.image = game.assets["character2.png"];
    option2.scaleX = 0.5;
    option2.scaleY = 0.5;
    option2.x = 200;
    option2.y = 0;

    const label2 = new enchant.Label("Personagem 2");
    label2.x = 200;
    label2.y = 520;

    menu.addChild(option2);
    menu.addChild(label2);

    // Opção de Personagem 3 (semelhante às opções restantes)
    const option3 = new enchant.Sprite(512, 512);
    option3.image = game.assets["character3.png"];
    option3.scaleX = 0.5;
    option3.scaleY = 0.5;
    option3.x = 400;
    option3.y = 0;

    const label3 = new enchant.Label("Personagem 3");
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
