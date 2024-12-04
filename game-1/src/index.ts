import { Square } from './core/Square';
import { SquareGroup } from './core/SquareGroup';
import { createTeris } from './core/Teris';
import { TerisRule } from './core/TerisRule';
import { MoveDirection } from './core/types';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery';

const teris = createTeris({ x: 3, y: 2 });
console.log('teris', teris);

teris.squares.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
});

$('#btnDown').click(function () {
  //更改中心点坐标
  TerisRule.moveDirectly(teris, MoveDirection.down);
});
