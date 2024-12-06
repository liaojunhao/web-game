(function () {
  let Pipe = (window.Pipe = function () {
    /* 管子出现的X坐标位置 */
    this.x = game.canvas.width;
    /* 上管子的高度（先确定上管字高度才能确定下管子） */
    this.height = parseInt(Math.random() * 220) + 100;
    /* 空隙固定 */
    this.space = 140;
    /* 下管子的高度 */
    this.h = game.canvas.height - 112 - this.height - this.space;
  });
  Pipe.prototype.render = function () {};
  Pipe.prototype.update = function () {};
})();
