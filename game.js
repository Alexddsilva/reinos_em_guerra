enchant();

window.onload = function () {
  var game = new Game(800, 600);
  game.preload("caminho/para/spritesheet.png"); // Preload de recursos, como imagens

  // Lógica do jogo

  game.start();
};
