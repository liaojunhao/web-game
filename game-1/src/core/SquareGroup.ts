import { Square } from './Square';
import { Shape, Point } from './types';
/**
 * 组合方块
 */
export class SquareGroup {
  private _squares: readonly Square[]; // 根据形状构建出来的每个小方块

  /**
   *
   * @param _shape 他的形状基本参数
   * @param _centerPoint 中心点坐标
   * @param _color
   */
  constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
    //设置小方块的数组
    const arr: Square[] = [];
    this._shape.forEach((p) => {
      const sq = new Square();
      sq.color = this._color;
      sq.point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y
      };
      arr.push(sq);
    });
    this._squares = arr;
    this.setSquarePoints();
  }
  // 根据中心的计算后每一个方块
  public get squares() {
    return this._squares;
  }

  // 每一个形状的坐标
  public get shape() {
    return this._shape;
  }

  public get centerPoint(): Point {
    return this._centerPoint;
  }

  public set centerPoint(v: Point) {
    this._centerPoint = v;
    this.setSquarePoints();
    //同时设置所有小方块对象的坐标
    // this._shape.forEach((p, i) => {
    //   this._squares[i].point = {
    //     x: this._centerPoint.x + p.x,
    //     y: this._centerPoint.y + p.y
    //   };
    // });
  }

  /**
   * 旋转方向是否为顺时针
   */
  protected isClock = true;

  /**
   * 旋转之后的坐标
   */
  afterRotateShape() {
    if (this.isClock) {
      return this._shape.map((p) => {
        const newP: Point = {
          x: -p.y,
          y: p.x
        };
        return newP;
      });
    } else {
      return this._shape.map((p) => {
        const newP: Point = {
          x: p.y,
          y: -p.x
        };
        return newP;
      });
    }
  }

  rotate() {
    // 先得到旋转后的方块
    const newShape = this.afterRotateShape();
    // 进行替换
    this._shape = newShape;
    // 真正去修改每个坐标
    this.setSquarePoints();
  }

  /**
   * 根据中心点坐标，以及形状，设置每一个小方块的坐标
   */
  private setSquarePoints() {
    this._shape.forEach((p, i) => {
      console.log('p --->', p, this._centerPoint);
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y
      };
    });
  }
}
