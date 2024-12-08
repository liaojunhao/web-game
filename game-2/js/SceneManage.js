(function () {
  let SceneManage = function () {
    this.bindEvent();
  };

  SceneManage.prototype.enter = function (number) {
    game.scene = number;

    switch (number) {
      case 0:
        this.titleY = 0;
        this.buttonX = (game.canvas.width - 116) / 2;
        this.buttonY = game.canvas.height;
        this.birdY = 300;
        this.birdChangeY = 1.2;
        break;
      case 1:
        this.tutorialAlpha = 0;
        this.tutorialAlphaChange = 0.05;
        break;
      case 2:
        game.bg = new Background();
        game.land = new Land();
        game.bird = new Bird();
        game.pipeArr = [];
        //分数清零
        game.score = 0;
        break;
      case 3:
        //爆炸序号
        this.showbomb = false;
        this.baozha = 1;
        //音乐
        document.getElementById('hit').load();
        document.getElementById('hit').play();
        document.getElementById('die').load();
        document.getElementById('die').play();
        break;
      case 4:
        this.gameoverY = -54;
        this.showjiangpai = false;

        // 我们现在要将分数数组去重然后排序
        var arr = JSON.parse(localStorage.getItem('flappybird'));
        arr = _.uniq(arr);
        arr = _.sortBy(arr, function (item) {
          return item;
        });
        this.best = arr[arr.length - 1] || 0;

        // 决定发什么奖牌
        if (game.score >= this.best) {
          this.model = 'medals_1';
          this.best = game.score;
        } else if (game.score >= arr[arr.length - 2]) {
          this.model = 'medals_2';
        } else if (game.score >= arr[arr.length - 2]) {
          this.model = 'medals_3';
        } else {
          this.model = 'medals_0';
        }

        //将分数推入数组
        arr.push(game.score);
        localStorage.setItem('flappybird', JSON.stringify(arr));

        //颁奖
        this.score_panelY = game.canvas.height;
        break;
    }
  };

  SceneManage.prototype.updateAndRender = function () {
    // 根据此时的场景编号来判断是第几个场景，然后做出响应
    switch (game.scene) {
      case 0: // 欢迎页面场景
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
      case 1: // 新手教程场景
        game.draw.fillStyle = '#4ec0ca';
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.draw.drawImage(game.allImg['bg_day'], 0, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['bg_day'], 288, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['land'], 0, game.canvas.height - 112);
        game.draw.drawImage(game.allImg['land'], 336, game.canvas.height - 112);
        game.draw.drawImage(game.allImg['bird0_0'], (game.canvas.width - 48) / 2, 150);
        if (this.tutorialAlpha > 1 || this.tutorialAlpha < 0) {
          this.tutorialAlphaChange *= -1;
        }
        this.tutorialAlpha += this.tutorialAlphaChange;
        game.draw.save();
        game.draw.globalAlpha = this.tutorialAlpha;
        game.draw.drawImage(game.allImg['tutorial'], (game.canvas.width - 114) / 2, 250);
        game.draw.restore();
        break;
      case 2: // 游戏进行场景
        //渲染背景、大地、小鸟
        game.bg.update();
        game.bg.render();
        game.land.update();
        game.land.render();
        game.bird.update();
        game.bird.render();

        //每120帧实例化管子
        if (game.frame % 120 == 0) {
          new Pipe();
        }

        //渲染所有管子
        for (var i = 0; i < game.pipeArr.length; i++) {
          game.pipeArr[i].update();
          game.pipeArr[i] && game.pipeArr[i].render();
        }

        scoreRender();
        break;
      case 3: // 死掉了的场景
        //场景3的所有东西，不需要重新实例化
        game.bg.render();
        game.land.render();
        for (var i = 0; i < game.pipeArr.length; i++) {
          game.pipeArr[i].render();
        }

        //如果没有爆炸中
        if (!this.showbomb) {
          game.bird.render();
          //让小鸟落地
          game.bird.y += 16;
          if (game.bird.y > game.canvas.height - 112) {
            //已经落地之后，渲染爆炸动画
            // 只有掉在地上才爆炸
            this.showbomb = true;
          }
        } else {
          // 爆炸了
          game.draw.drawImage(game.allImg['baozha' + this.baozha], game.bird.x - 50, game.bird.y - 100, 100, 100);
          game.frame % 3 == 0 && this.baozha++;
          if (this.baozha > 9) {
            this.enter(4);
          }
        }
        scoreRender();
        break;
      case 4: // 记分榜场景
        //场景3的所有东西，不需要重新实例化
        game.bg.render();
        game.land.render();
        for (var i = 0; i < game.pipeArr.length; i++) {
          game.pipeArr[i].render();
        }
        //gameover的y位置
        this.gameoverY += 10;
        if (this.gameoverY > 120) {
          this.gameoverY = 120;
        }
        game.draw.drawImage(game.allImg['text_game_over'], (game.canvas.width - 204) / 2, this.gameoverY);

        //颁奖
        this.score_panelY -= 10;
        if (this.score_panelY < 270) {
          this.score_panelY = 270;
          this.showjiangpai = true;
        }
        game.draw.drawImage(game.allImg['score_panel'], (game.canvas.width - 238) / 2, this.score_panelY);

        //显示奖牌
        if (this.showjiangpai) {
          game.draw.drawImage(game.allImg[this.model], game.canvas.width / 2 - 88, this.score_panelY + 44);
          game.draw.textAlign = 'right';
          game.draw.font = '20px consolas';
          game.draw.fillStyle = '#333';
          game.draw.fillText(game.score, game.canvas.width / 2 + 93, this.score_panelY + 50);
          game.draw.fillText(this.best, game.canvas.width / 2 + 93, this.score_panelY + 96);
        }
        break;
    }
  };

  SceneManage.prototype.bindEvent = function () {
    // 只能给canvas绑定事件因为页面上只有一个canvas元素，其他都是画上去的
    game.canvas.onclick = (e) => {
      var x = e.offsetX;
      var y = e.offsetY;
      switch (game.scene) {
        case 0:
          if (x > this.buttonX && y > this.buttonY && x < this.buttonX + 116 && y < this.buttonY + 70) {
            this.enter(1);
          }
          break;
        case 1:
          this.enter(2);
          break;
        case 2:
          game.bird.fly();
          break;
        case 3:
          break;
        case 4:
          this.enter(0);
          break;
      }
    };
  };

  function scoreRender() {
    //渲染分数
    //拆掉每一位
    var score = game.score.toString();
    //基准位置
    var baseX = game.canvas.width / 2 - (score.length / 2) * 30;
    for (var i = 0; i < score.length; i++) {
      var char = score[i];
      //渲染这一位，基准位置是
      game.draw.drawImage(game.allImg['shuzi' + char], baseX + i * 30, 100);
    }
  }
  window.SceneManage = SceneManage;
})();
