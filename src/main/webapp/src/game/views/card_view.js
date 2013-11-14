define(
  ['jquery'],
  function($) {

  function CardView(_card_id) {
    var self = this;

    var card_id = _card_id;

    var right = 400;
    var bottom = 1200;
    var width = 120;
    var height = 182;

    var card_img_jq = $('<img />', {"class": "hand_img",  
                                    "card_id": card_id,
                                    "src": "/img/cards/" + card_id + ".jpg"}).css({
                                    "position": "absolute",
                                    "width": width + "px",
                                    "height": height + "px",
                                    "z-index": "1"});

    var card_div_jq = $('<div></div>', {"class": "hand_div"}).css({
                                        "position": "absolute",
                                        "height": height + "px",
                                        "width": width + "px",
                                        "right": right + "px",
                                        "bottom": bottom + "px"}).append(card_img_jq); 

    self.getDivJQ = function() {
      return card_div_jq;
    };
    
    self.getImgJQ = function() {
      return card_img_jq;
    };    

    self.getCardId = function() {
      return card_id;
    };
  }

  return CardView;

});
