define(
  ['views/resource_card_view', 'jquery'],
  function(ResourceCardView, $) {

  function NeighborView(_side, _model) {

    var self = this;

    var side = _side;  // true: right,  false: left
    var model = _model;

    var name;
    var resource_list;
    var purchasable_list = [];

    var parent = null;

    var div;

    self.getSide = function() {
      return side;
    };

    self.init = function(_name, _resources) {
      name = _name;
      resource_list = _resources;
      div = $('<div></div>').attr(
        { 'class': 'neighbor_view', 
          'id': side ? 'neighbor_view_right' : 'neighbor_view_left' }
      );

      var top = 0;
      var left = 0;
      var temp;
      for (var i=0, j=0; i<resource_list.length; i++) {
        if (resource_list[i].getPurchasable()) {
          top = 45 * j;
          temp = new ResourceCardView(self, resource_list[i], div, 0, top);
          temp.attach();
          purchasable_list.push(temp);
          j++;
        }
      }

      $('#board').append(div);
    };

    self.connect = function(_select_card_view) {
      parent = _select_card_view;
    };

    self.disconnect = function() {
      parent = null;
    };

    self.checkAddResource = function(_index, _resource_id, _card) {
      if (parent !== null) {
        var cost = _resource_id <= 4 ? 
                     model.getTableau(model.getPlayerIndex()).getBrownCost(side)
                   : model.getTableau(model.getPlayerIndex()).getGreyCost(side);
        parent.checkAddResource(_index, _resource_id, cost, _card, self);
      }
    };

    self.confirmAddResource = function(_index, _card) {
      _card.confirmAddResource(_index);
    };

    self.deselectResource = function(_resource_id) {
      if (parent !== null) {
        var cost = _resource_id <= 4 ? 
                     model.getTableau(model.getPlayerIndex()).getBrownCost(side)
                   : model.getTableau(model.getPlayerIndex()).getGreyCost(side);
        parent.deselectResource(_resource_id, cost);
      }
    };

    self.enableResources = function() {
      for (var i=0; i<purchasable_list.length; i++) {
        purchasable_list[i].enable();
      }
    };

    self.disableResources = function() {
      for (var i=0; i<purchasable_list.length; i++) {
        purchasable_list[i].disable();
      }
    };

    self.getSelected = function() {
      var selected_resource_list = [];
      var temp = null;
      for (var i=0; i<purchasable_list.length; i++) {
        temp = purchasable_list[i].getSelected();
        if (temp != null) {
          selected_resource_list.push(temp);
        }
      }
      return selected_resource_list;
    };
  }

  return NeighborView;
});
