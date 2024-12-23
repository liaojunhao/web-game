(function () {
  let Game = (window.Game = function () {
    this.canvas = document.getElementById('canvas');
    this.draw = this.canvas.getContext('2d');
    let W = document.documentElement.clientWidth;
    let H = document.documentElement.clientHeight;
    this.canvas.width = W > 420 ? 420 : W;
    this.canvas.height = H > 750 ? 750 : H;
    this.scene = 0; // 初始化场景的编号
    //开辟本地存储
    if (!localStorage.getItem('flappybird')) {
      localStorage.setItem('flappybird', '[]');
    }
    // 加载图片
    this.loadImg();
  });

  /* 清屏方法 */
  Game.prototype.clear = function () {
    this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  /* 启动游戏 */
  Game.prototype.start = function () {
    this.frame = 0;
    this.draw.font = '14px consolas';
    this.draw.textAlign = 'left';
    this.sm = new SceneManage();
    this.sm.enter(0);

    this.timer = setInterval(() => {
      this.clear();
      this.frame++;
      this.sm.updateAndRender();
      this.draw.fillStyle = '#333';
      this.draw.textAlign = 'left';
      game.draw.font = '16px consolas';
      //显示场景编号
      this.draw.fillText('场景号' + this.scene, 10, 40);
    }, 20);
  };

  /* 加载图片 */
  Game.prototype.loadImg = function () {
    /* 预加载图片管理 */
    this.allImg = {
      bg_day: '/game-2/img/bg_day.png',
      land: '/game-2/img/land.png',
      pipe_down: '/game-2/img/pipe_down.png',
      pipe_up: '/game-2/img/pipe_up.png',
      bird0_0: '/game-2/img/bird0_0.png',
      bird0_1: '/game-2/img/bird0_1.png',
      bird0_2: '/game-2/img/bird0_2.png',
      title: '/game-2/img/title.png',
      button_play: '/game-2/img/button_play.png',
      tutorial: '/game-2/img/tutorial.png',
      shuzi0: '/game-2/img/font_048.png',
      shuzi1: '/game-2/img/font_049.png',
      shuzi2: '/game-2/img/font_050.png',
      shuzi3: '/game-2/img/font_051.png',
      shuzi4: '/game-2/img/font_052.png',
      shuzi5: '/game-2/img/font_053.png',
      shuzi6: '/game-2/img/font_054.png',
      shuzi7: '/game-2/img/font_055.png',
      shuzi8: '/game-2/img/font_056.png',
      shuzi9: '/game-2/img/font_057.png',
      baozha1: '/game-2/img/1.png',
      baozha2: '/game-2/img/2.png',
      baozha3: '/game-2/img/3.png',
      baozha4: '/game-2/img/4.png',
      baozha5: '/game-2/img/5.png',
      baozha6: '/game-2/img/6.png',
      baozha7: '/game-2/img/7.png',
      baozha8: '/game-2/img/8.png',
      baozha9: '/game-2/img/9.png',
      text_game_over: '/game-2/img/text_game_over.png',
      score_panel: '/game-2/img/score_panel.png',
      medals_0: '/game-2/img/medals_0.png',
      medals_1: '/game-2/img/medals_1.png',
      medals_2: '/game-2/img/medals_2.png',
      medals_3: '/game-2/img/medals_3.png'
    };
    /* 计算图片的加载个数 */
    let count = 0;
    /* 获取图片的长度（这个不是数组是对象，对象获取长度的方法Object.keys().length） */
    let picAmount = Object.keys(this.allImg).length;

    /* 创建进度条 */
    // let progress = new Progress(this.draw, W / 2 - 150, H / 3, 0, 30);
    /* 遍历对象中所有图片 */
    for (let K in this.allImg) {
      ((src) => {
        this.allImg[K] = new Image();
        this.allImg[K].src = src;
        this.allImg[K].onload = () => {
          count++;
          this.clear();
          // progress.update((count / picAmount) * 300);
          // progress.render();
          if (count == picAmount) {
            this.start();
          }
        };
      })(this.allImg[K]);
    }
  };
})();
