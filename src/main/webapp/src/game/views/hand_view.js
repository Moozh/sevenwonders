define(
  ['views/card_view', 'jquery'],
  function(CardView, $) {

  function HandView(_controller, _game_view, _model) {

    var self = this;

    var controller = _controller;
    var game_view = _game_view;
    var model = _model;

    var hand_jq = null;

    var card_list = [];

    function initCards(_card_id_list) {
      for (var i=0; i<_card_id_list.length; i++) {
        card_list[i] = new CardView(_card_id_list[i]);
      }
    }

    /* dealCards
     *   Animate cards into the player's hand, then attach mouseover and click handlers to each.
     * Uses a closure because the cards wait for the callback to attach the handlers and thus the
     * handler generators are not executed immediately inside the for loop.
     */
    function dealCards()
    {
      for (var j=0; j<card_list.length; j++) {
        (function(i) {      
          hand_jq.prepend(card_list[i].getDivJQ());
          card_list[i].getDivJQ().delay(150*i).animate({"right": (30*i) + "px", "bottom": "0px"}, 
            {   
              duration: 800,
              complete: function () {
                if (i == card_list.length - 1) {
                  attachFunctionality();
                }
              }
            }
          );
        })(j);
      }
    }

    /* fanCardsGenerator
     *   Creates a mouseover function for each individual card based on the card's index.  Each card's
     * mouseover function must also animate the other cards in the player's hands.  There is a unique
     * function for the first card because it does not need to move to the left as it is selected.
     * Uses a closure because the mouseover function is called from outside the for loop.
     */
    function fanCardsGenerator(index)
    {
      if (index == 0) {
        return function() {
          for (var i=0; i<card_list.length; i++) {
            var div_jq = card_list[i].getDivJQ();
            if (i == index) {
              div_jq.stop().animate({"right": (30*i) + "px", "bottom": "30px"}, 200);
            } else if (i == index+1) {
              div_jq.stop().animate({"right": (30*(i+2)) + "px", "bottom": "5px"}, 200);
            } else {
              div_jq.stop().animate({"right": (30*(i+2)) + "px", "bottom": "0px"}, 200);
            }
          } 
        };
      }
      else {
        return function() {
          for (var i=0; i<card_list.length; i++) {
            var div_jq = card_list[i].getDivJQ();
            if (i < index-1) {
              div_jq.stop().animate({"right": (30*i) + "px", "bottom": "0px"}, 200);
            } else if (i == index-1) {
              div_jq.stop().animate({"right": (30*i) + "px", "bottom": "5px"}, 200);
            } else if (i == index) {
              div_jq.stop().animate({"right": (30*(i+2)) + "px", "bottom": "30px"}, 200);
            } else if (i == index+1) {
              div_jq.stop().animate({"right": (30*(i+4)) + "px", "bottom": "5px"}, 200);
            } else {
              div_jq.stop().animate({"right": (30*(i+4)) + "px", "bottom": "0px"}, 200);
            }
          } 
        };
      }
    }

    function attachFunctionality() {
      // Attach hand hover function
      hand_jq.hover(handMouseenterGenerator(), 
                    handMouseleaveGenerator());

      // Attach fan effects and click functionality
      for (var i=0; i < card_list.length; i++) {
        var div_jq = card_list[i].getDivJQ();
        div_jq.mouseover(fanCardsGenerator(i));
        div_jq.click(controller.selectCard(game_view, self, card_list[i], i));
      }
    }

    function handMouseenterGenerator() {
      return function () {
        hand_jq.stop().animate({bottom : '2px'}, 500);
      };
    }

    function handMouseleaveGenerator() {
      return function () {
        hand_jq.stop().animate({bottom : '-150px'}, 500);
        for (var i=0; i<card_list.length; i++) {
          card_list[i].getDivJQ().stop().animate({"bottom": "0px", "right": (30*i)+"px"}, 500);
        }
      };
    }

    self.init = function(_jq_element) {
      hand_jq = _jq_element;

      initCards(model.getHandIds());

      dealCards();
    };

    self.hideHand = function(_card_jq) {
      // Remove the hover function from player_hand
      hand_jq.unbind('mouseenter mouseleave');

      // Remove fanCard and selectCard events from the cards
      for (var i=0; i<card_list.length; i++) {
        var div_jq = card_list[i].getDivJQ();
        div_jq.unbind('mouseenter').unbind('mouseover').unbind('click');
        if (div_jq != _card_jq) {
          div_jq.stop().animate({"right": (30*i) + "px", "bottom": "0px"}, 200);
        }
      }

      // Hide the hand
      hand_jq.stop().animate({"bottom": "-250px"}, 500);
    };

    self.showHand = function(dur) {
      // Return all cards to the hand and then restore their functionality
      for (var j=0; j<card_list.length; j++) {
        (function(i) {
          card_list[i].getDivJQ().stop().animate(
            {"right": (30*i) + "px", 
             "bottom": "0px",
             "height": "182px",
             "width": "120px",
             "opacity": "1"},
            { duration: dur,
              complete: function() {
                if (i == card_list.length - 1) {
                  attachFunctionality();
                }
              }
            }
          );
          card_list[i].getImgJQ().stop().animate(
            {"height": "182px",
             "width": "120px"}, dur);
        })(j);
      }

      // Raise the hand back to its default position 
      hand_jq.stop().animate({"bottom": "-150px"}, dur); 
    };

    self.reattach = function(_card_div, _card_index) {
      if (_card_index === 0) {
        hand_jq.append(_card_div);
      }
      else {
        $("#player_hand .hand_div").eq(-(_card_index)).before(_card_div);
      }
      _card_div.css({"bottom": "450px"//, 
//                     "right": ( $(this).css("right") - 2 ) + "px"
                    }); 
    }
  }

  return HandView;
});
