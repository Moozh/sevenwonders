define(
  ['models/cardlist_data', 'jquery'],
  function(CardList, $) {

  function ResourceCardView(_parent, _resource, _div, _x, _y) {

    var self = this;

    var parent = _parent;
    var resource = _resource;
    var div = _div;
    var left = _x + 'px';
    var top = _y + 'px';

    var id = resource.getCardId();
    var num_resources = resource.getNumResources();

    var selected = false;
    var selected_index = -1;
    var selected_element = null;
    var resource_list = resource.getResources();
    var resource_num = resource.getNumResources();
    var resource_img = [];

    var card = $('<div></div>', { 
                   'class': 'resource_card'
                 }).css({
                   'top': top,
                   'left': left,
                   'border': '1px solid red'
                 }).append(
               $('<img/>', {
                 'src': 'img/cards/' + id + '.jpg'
                }).css({
                 'position': 'absolute',
                 'width': '120px'
                }));

    var selected_element = $('<img/>', {
                              'src': 'img/circle_selected.png'
                            }).css({
                              'position': 'absolute',
                              'z-index': '1'
                            });

    for (var i=0; i<num_resources; i++) {
      resource_img[i] = $('<img/>', {
                            'src': 'img/empty.png'
                          }).css({
                            'position': 'absolute',
                            'z-index' : '2',
                            'width': resource.getRectangles()[i].width,
                            'height': resource.getRectangles()[i].height,
                            'left': resource.getRectangles()[i].left,
                            'top': resource.getRectangles()[i].top
                          }).appendTo(card);
    }


    function selectResourceGenerator(_resource_index) {
      return function() {
        parent.checkAddResource(_resource_index, resource_list[_resource_index], self);
      };
    }

    function deselectResourceGenerator(_resource_index) {
      return function() {
        selected = false;
        selected_index = -1;
        selected_element.detach();
        resource_img[_resource_index].unbind('click').click(selectResourceGenerator(_resource_index));
        parent.deselectResource(resource_list[_resource_index]);
      };
    }

    self.confirmAddResource = function(_resource_index) {
      selected = true;
      selected_index = _resource_index;
      selected_element.css({
        'width': resource.getRectangles()[selected_index].width,
        'height': resource.getRectangles()[selected_index].height,
        'left': resource.getRectangles()[selected_index].left,
        'top': resource.getRectangles()[selected_index].top
      }).appendTo(card);
      resource_img[_resource_index].unbind('click').click(deselectResourceGenerator(_resource_index));
    };

    self.attach = function() {
      div.append(card);
    };

    self.enable = function() {
      for (var i=0; i<num_resources; i++) {
        resource_img[i].hover(
                          function() { $(this).attr("src", "/img/circle_highlight.png"); },
                          function() { $(this).attr("src", "/img/empty.png"); }
                        ).click(selectResourceGenerator(i));
        card.append(resource_img[i]);
      }
    };

    self.disable = function() {
      for (var i=0; i<num_resources; i++) {
        resource_img[i].unbind().detach();
      }
      selected_element.animate({"opacity": "0"},
                               { duration: 500,
                                 complete: function() { 
                                             $(this).detach().css({"opacity": "1"}); 
                                           }
                               });
      selected = false;
      selected_index = -1;
    };

    self.getSelected = function() {
      if (selected) {
        return resource_list[selected_index];
      } 
      else {
        return null;
      }
    };

  }

  return ResourceCardView;  

});
