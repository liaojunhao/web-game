function Progress(draw, x, y, w, h) {
  this.draw = draw;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}
Progress.prototype.render = function () {
  /* fillStyle后面图像填充的背景色 */
  this.draw.fillStyle = 'blue';
  /* fillRect(x,y,w,h) 矩形xy是坐标，wh是宽高 */
  this.draw.fillRect(this.x, this.y, this.w, this.h);
};
Progress.prototype.update = function (w) {
  this.w = w;
};
