(function () {
  let Bird = function () {
    this.x = 100;
    this.y = 100;
    this.changeY = 0;
    this.rotate = 0;
    this.img = [game.allImg['bird0_0'], game.allImg['bird0_1'], game.allImg['bird0_2']];
    this.status = 'drop';
    this.wing = 0;
  };
  Bird.prototype.update = function () {
    if (this.status === 'drop') {
      // 下落
      this.changeY += 0.6;
      this.y += this.changeY;
      this.rotate += 0.05;
    } else if (this.status === 'up') {
      // 上升
      this.changeY -= 0.8;
      if (this.changeY <= 0) {
        this.status = 'drop';
        return;
      }
      this.y -= this.changeY;
      this.y <= 0 ? (this.y = 0) : null;
      this.wing++;
      this.wing > 2 ? (this.wing = 0) : null;
    }

    //落地检测
    if (this.y > game.canvas.height - 112) {
      clearInterval(game.timer);
    }
  };
  Bird.prototype.render = function () {
    game.draw.save();
    game.draw.translate(this.x, this.y);
    game.draw.rotate(this.rotate);
    game.draw.drawImage(this.img[this.wing], -24, -24);
    game.draw.restore();
  };
  Bird.prototype.fly = function () {
    this.status = 'up';
    // 头上扬
    this.rotate = -1.2;
    this.changeY = 10;
  };
  window.Bird = Bird;
})();
