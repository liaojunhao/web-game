import { SquareGroup } from './SquareGroup';
import { createTeris } from './Teris';
import { TerisRule } from './TerisRule';
import { GameStatus, GameViewer, MoveDirection } from './types';

export class Game {
  //游戏状态
  private _gameStatus: GameStatus = GameStatus.init;

  //当前玩家操作的方块
  private _curTeris?: SquareGroup;

  //下一个方块
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });

  //计时器
  private _timer?: number;

  //自动下落的间隔时间
  private _duration: number = 1000;

  constructor(private _viewer: GameViewer) {
    this._viewer.showNext(this._nextTeris);
  }

  /**
   * 游戏开始
   */
  start() {
    //游戏状态的改变
    if (this._gameStatus === GameStatus.playing) {
      return;
    }
    this._gameStatus = GameStatus.playing;
    if (!this._curTeris) {
      this.switchTeris();
    }
    this.autoDrop();
  }

  /**
   * 当前方块自由下落
   */
  private autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._curTeris) {
        TerisRule.move(this._curTeris, MoveDirection.down);
      }
    }, this._duration);
  }

  /**
   * 切换方块
   */
  private switchTeris() {
    this._curTeris = this._nextTeris;
    this._nextTeris = createTeris({ x: 0, y: 0 });
  }

  /**
   * 设置中心点坐标，已达到让该方块出现在区域的中上方
   * @param width
   * @param teris
   */
  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    teris.centerPoint = { x, y };
    while (teris.squares.some((it) => it.point.y < 0)) {
      teris.squares.forEach(
        (sq) =>
          (sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1
          })
      );
    }
  }
}
