define(
  ['views/resource_card_view', 'jquery'],
  function(ResourceCardView, $) {

  function SelectResourceView(_parent, _model, _div) {

    var self = this;

    var parent = _parent;
    var model = _model;
    var div = _div;

    var resource_list = model.getTableau(model.getPlayerIndex()).getResources().getArray();
    var resource_view_list = [];

    self.init = function() {

      var top = 0;
      var left = 0;
      var temp;

      for (var i=0; i<resource_list.length; i++) {
        left = 130 * i;
        resource_view_list[i] = new ResourceCardView(self, resource_list[i], div, left, top);
        resource_view_list[i].enable();
        resource_view_list[i].attach();
      }
    };

    self.checkAddResource = function(_index, _resource_id, _card) {
      parent.checkAddResource(_index, _resource_id, 0, _card, self);
    };

    self.confirmAddResource = function(_index, _card) {
      _card.confirmAddResource(_index);
    };

    self.deselectResource = function(_resource_id) {
      parent.deselectResource(_resource_id, 0);
    };

    self.enableResources = function() {
      for (var i=0; i<resource_list.length; i++) {
        resource_view_list[i].enable();
      }
    };

    self.disableResources = function() {
      for (var i=0; i<resource_list.length; i++) {
        resource_view_list[i].disable();
      }
    };
  }

  return SelectResourceView;

});
