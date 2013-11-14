define(
  ['models/game_model', 'views/game_view', 'views/select_card_view'],
  function(GameModel, GameView, SelectView) {

  function GameController() {
    var self = this;

    var game_model = new GameModel();
    var game_view = new GameView(self, game_model);

    var select_view = null;
    var turn_summary = null;

    self.init = function(json) {
      game_model.init(json);
      
      // --- TEST ---
      var test_array = [
        { index: 0, card_id: 1101},
        { index: 0, card_id: 1103},
        { index: 0, card_id: 1104},
        { index: 0, card_id: 1203},
        { index: 0, card_id: 1109},
        { index: 1, card_id: 1102},
        { index: 1, card_id: 1102},
        { index: 1, card_id: 1202},
        { index: 1, card_id: 1201},
        { index: 2, card_id: 1110},
        { index: 2, card_id: 1101},
        { index: 2, card_id: 1101},
        { index: 2, card_id: 2303},
        { index: 2, card_id: 1201},
        { index: 3, card_id: 2304},
        { index: 3, card_id: 1103},
        { index: 3, card_id: 1101}
      ];
      game_model.addResources(test_array);
      // --- /TEST ---

      game_view.init();
    };

    self.selectCard = function(_game_view, _hand_view, _card, _card_index) {
      return function() {
        select_view = new SelectView(self, game_model, _game_view, _hand_view, _card, _card_index);
        select_view.init(game_view.getNeighborView(false), game_view.getNeighborView(true));
      };
    };

    self.cancelSelect = function() {
      select_view = null;
    }

    self.submitChoice = function(_id) {
      
    }; 

    self.confirmChoice = function() {
      select_view = null;
    };
  }

  return GameController;
});  
