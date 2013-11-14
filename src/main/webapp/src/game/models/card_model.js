define(
  ['models/cardlist_data', 'jquery'], 
  function(CardList, $) {
 
  // constructor
  function Card(_id) {
    var self = this;

    // private members
    var id = _id;
    var color = CardList.getColor(id);
    var cost = CardList.getCost(id);
    var prereq = CardList.getPrereq(id);
    var onPlace = CardList.getOnPlace(id);

    // public members
 
    // public methods
    self.getId = function() {
      return id;
    };

    self.getColor = function() {
      return color;
    };

    self.getCost = function() {
      return cost;
    };

    self.getPrereq = function() {
      return prereq;
    };
  }
 
  // return constructor
  return Card;  
});
