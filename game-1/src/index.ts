import { Game } from './core/Game';
import { GamePageViewer } from './core/viewer/GamePageViewer';
import $ from 'jquery';
var g = new Game(new GamePageViewer());

$('#btnStart').click(function () {
  g.start();
});
