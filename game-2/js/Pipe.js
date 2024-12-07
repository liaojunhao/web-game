(function () {
  let Pipe = (window.Pipe = function () {
    /* 上管子的高度（先确定上管字高度才能确定下管子） */
    this.h1 = parseInt(Math.random() * 220) + 100;
    /* 空隙固定 */
    this.space = 140;
    /* 下管子的高度 */
    this.h2 = game.canvas.height - 112 - this.h1 - this.space;
    /* 管子出现的X坐标位置 */
    this.x = game.canvas.width;

    game.pipeArr.push(this);
  });
  Pipe.prototype.render = function () {
    game.draw.drawImage(game.Img['pipe_down'], 0, 320 - this.h1, 52, this.h1, this.x, 0, 52, this.h1);
    game.draw.drawImage(
      game.Img['pipe_up'],
      0,
      0,
      52,
      this.h2,
      this.x,
      game.canvas.height - 112 - this.h2,
      52,
      this.h2
    );
  };
  Pipe.prototype.update = function () {
    this.x -= 1;
    // 一旦管子走出去了将他删除
    if (this.x <= -52) {
      for (let index = 0; index < game.pipeArr.length; index++) {
        const element = game.pipeArr[index];
        if (element === this) {
          game.pipeArr.splice(index, 1);
          i--;
        }
      }
    }
  };

  window.Pipe = Pipe;
})();
