require(["controllers/game_controller", "jquery"], function(GameController, $) {

  json = { "num_players"   : 4 , 
           "player_index"  : 2 ,
           "player_names"  : ["A", "B", "C", "Z"],
           "player_boards" : [60, 40, 21, 71], 
           "player_hand"   : [1104, 1105, 1202, 1301, 1403, 1501, 1502]
         };


  var game = new GameController();
  game.init(json);

  window.Game = {};

  window.Game.init = function(json) { console.log('Comet Call', json); };
});
