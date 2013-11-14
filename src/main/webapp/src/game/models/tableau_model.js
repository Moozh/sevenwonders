define(
  ['models/resource_list_model', 'models/boardlist_data'], 
  function(ResourceList, BoardList) {

  // constructor
  function Tableau() {
    var self = this;
 
    // private members
    var board_id = 0;
    var name = "";
    var cards = [[], [], [], [], [], [], []];
    var wonders = [];
    var resources = new ResourceList();
    var num_coins = 4;
    var num_minus1 = 0;
    var num_plus1 = 0;
    var num_plus3 = 0;
    var num_plus5 = 0;
 
    var left_brown_cost = 2;
    var right_brown_cost = 2;
    var left_grey_cost = 2;
    var right_grey_cost = 2;

    // public members

    // public methods
    self.getBoardId = function() {
      return board_id;
    };

    self.getName = function() {
      return name;
    };

    self.getCards = function() {
      return cards;
    };
 
    self.getWonders = function() {
      return wonders;
    };

    self.getNextWonder = function() {
      var all_wonders = BoardList.getWonders(board_id);
      var num_wonders = all_wonders.length;
      var built_wonders = wonders.length;
      if (built_wonders < num_wonders) {
        return all_wonders[built_wonders];
      }
      else {
        return null;
      }
    };

    self.getCoins = function() {
      return num_coins;
    };

    self.getPlus1 = function() {
      return num_plus1;
    };
 
    self.getPlus3 = function() {
      return num_plus3;
    };
 
    self.getPlus5 = function() {
      return num_plus5;
    };
 
    self.getMinus1 = function() {
      return num_minus1;
    };

    self.getResources = function() {
      return resources;
    };

    self.getBrownCost = function(_side) {
      return _side ? right_brown_cost : left_brown_cost;
    };

    self.getGreyCost = function(_side) {
      return _side ? right_grey_cost : left_grey_cost;
    };

    self.setBoard = function(_id) {
      board_id = _id;
    };

    self.setName = function(_name) {
      name = _name;
    };

    self.addResource = function(_card_id) {
      resources.addResource(_card_id);
    };
  }
 
  // return constructor
  return Tableau;
});
