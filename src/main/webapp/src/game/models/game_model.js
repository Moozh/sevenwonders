define(
  ['models/card_model', 'models/tableau_model'],
  function(Card, Tableau) {

  function GameModel() {

    var self = this;

    var num_players = 0;
    var player_index = 0;  // zero-based

    var age = 0;
    var turn = 0;
    var tableaus = [];
    var hand = [];

    /* init
     * json = { "num_players"   : # , 
     *          "player_index"  : # ,
     *          "player_names"  : ["A", "B", "C", ..., "Z"],
     *          "player_boards" : [60, 40, 21, ..., 71], 
     *          "player_hand"   : [1104, 1105, 1202, 1301, 1403, 1501, 1502]
     *        }
     */
    self.init = function(json) {
      age = 1;
      turn = 1;
       
      num_players = json.num_players;
      player_index = json.player_index;

      // Create empty tableau objects for each player
      for (var i=0; i<num_players; i++) {
        tableaus[i] = new Tableau();
      }

      // Set player boards
      for (var i=0; i<num_players; i++) {
        tableaus[i].setBoard(json.player_boards[i]);
      }

      // Populate names
      for (var i=0; i<num_players; i++) {
        tableaus[i].setName(json.player_names[i]);
      }

      // Populate hand (7 cards to start)
      for (var i=0; i<7; i++) {
        hand[i] = new Card(json.player_hand[i]);      
      }
    };

    self.getAge = function() {
      return age;
    };

    self.getNames = function() {
      var names = [];
      for (var i=0; i<num_players; i++) {
        names[i] = tableaus[i].getName();
      }
      return names;
    };

    self.getNumPlayers = function() {
      return num_players;
    };

    self.getPlayerIndex = function() {
      return player_index;
    };

    self.getBoardIds = function() {
      var board_ids = [];
      for (var i=0; i<num_players; i++) {
        board_ids[i] = tableaus[i].getBoardId();
      }
      return board_ids;
    };

    self.getHand = function() {
      return hand;
    };

    self.getHandIds = function() {
      var ids = [];
      for (var i=0; i<hand.length; i++) {
        ids[i] = hand[i].getId();
      }
      return ids;
    };

    self.getTableau = function(_index) {
      return tableaus[_index];
    };

    /* addResources
     *   an array of objects that contains two elements:
     *     index: index of the player gaining the resource
     *     card_id: the array of possible resource choices
     */
    self.addResources = function(_res_array) {
      var cell;
      for (var i=0; i<_res_array.length; i++) {
        cell = _res_array[i];
        tableaus[cell.index].addResource(cell.card_id);
      }
    };
  }

  return GameModel;
});
