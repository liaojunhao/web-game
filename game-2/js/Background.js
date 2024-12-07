(function () {
  let Background = (window.Background = function () {
    /* 所有图像所依赖的x点，他的变化表示3张背景图片也跟着变化 */
    this.x = 0;
    /* 背景图片的宽高 */
    this.width = 288;
    this.height = 512;
  });
  Background.prototype.render = function () {
    /*
     *
     * drawImage方法在执行前要确保图片是加载完毕的，而且他传的参数不同，呈现效果也不同
     *
     * drawImage(el,x,y)
     * drawImage(el,x,y,w,h)
     * drawImage(el,sx,sy,sw,sh,dx,dy,dw,dh)
     *
     * drawImage(图片/画布上的横坐标/画布上的纵坐标/显示在画布上的宽/显示在画布上的高)
     *
     * */

    game.draw.drawImage(game.allImg['bg_day'], this.x, game.canvas.height - this.height);
    game.draw.drawImage(game.allImg['bg_day'], this.x + this.width, game.canvas.height - this.height);
    // 为了实现无缝衔接加多一个背景图
    game.draw.drawImage(game.allImg['bg_day'], this.x + this.width * 2, game.canvas.height - this.height);
    game.draw.fillStyle = '#4ec0ca';
    game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height - this.height);
  };
  Background.prototype.update = function () {
    this.x--;
    this.x < -this.width ? (this.x = 0) : null;
  };
})();
