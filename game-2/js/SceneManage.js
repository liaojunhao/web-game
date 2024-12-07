(function () {
  let SceneManage = function () {
    this.bindEvent();
  };

  SceneManage.prototype.enter = function (number) {
    switch (number) {
      case 0:
        this.titleY = 0;
        this.buttonY = game.canvas.height;
        this.birdY = 300;
        this.birdChangeY = 1.2;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
    }
  };

  SceneManage.prototype.updateAndRender = function () {
    // 根据此时的场景编号来判断是第几个场景，然后做出响应
    switch (game.scene) {
      case 0:
        game.draw.fillStyle = '#4ec0ca';
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.draw.drawImage(game.allImg['bg_day'], 0, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['bg_day'], 288, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['land'], 0, game.canvas.height - 112);
        game.draw.drawImage(game.allImg['land'], 336, game.canvas.height - 112);

        this.titleY += 5;
        this.buttonY -= 10;
        if (this.titleY >= 160) this.titleY = 160;
        if (this.buttonY <= 370) this.buttonY = 370;
        game.draw.drawImage(game.allImg['title'], (game.canvas.width - 178) / 2, this.titleY);
        game.draw.drawImage(game.allImg['button_play'], (game.canvas.width - 116) / 2, this.buttonY);
        if (this.birdY <= 250 || this.birdY >= 300) {
          this.birdChangeY *= -1;
        }
        this.birdY += this.birdChangeY;
        game.draw.drawImage(game.allImg['bird0_0'], (game.canvas.width - 48) / 2, this.birdY);

        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
    }
  };

  SceneManage.prototype.bindEvent = function () {
    // 只能给canvas绑定事件因为页面上只有一个canvas元素，其他都是画上去的
    game.canvas.onclick = (e) => {
      // console.log('点击 ---> Y', e.clientY, this.buttonY, this.buttonY + 70);
      console.log('点击 ---> X', e.clientX);

      switch (game.scene) {
        case 0:
          if (
            e.clientY > this.buttonY &&
            e.clientY < this.buttonY + 70 &&
            e.clientX > game.canvas.width / 2 - 58 &&
            e.clientX < game.canvas.width / 2 + 58
          ) {
            // 点击play按钮
            this.enter(1);
            game.scene = 1;
          }
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
      }
    };
  };

  window.SceneManage = SceneManage;
})();
