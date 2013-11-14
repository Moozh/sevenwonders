define(
  ['models/cardlist_data', 'views/resource_view', 'views/coin_view', 'jquery'],
  function(CardList, ResourceView, CoinView, $) {
   
  function mod(n, k) {
    return ((n % k) + k) % k;
  }

  function SelectCardView(_controller, _model, _game_view, _hand_view, _card, _card_index) {

    // Private Members
    var self = this;

    var controller = _controller;
    var model = _model;
    var game_view = _game_view;
    var hand_view = _hand_view;
    var card_index = _card_index;
    var left_neighbor_view = null;
    var right_neighbor_view = null;
    var resource_view = null;
    var coin_view = null;

    var item_div = [];
    item_div[0] = _card.getDivJQ();           // Card
    item_div[1] = $('<div></div>', {          // Coin
                       "id": "sell_div"
                  }).css({
                      "position": "absolute",
                      "width": "100px",
                      "height": "100px",
                      "background-image": 'url("/img/tokens/coin_3.png")',
                      "background-size": "cover", 
                      "background-repeat": "no-repeat",
                      "z-index": "10"
                  });
    item_div[2] = $('<div></div>', {          // Wonder
                     "id": "wonder_div"
                   }).css({
                     "position": "absolute",
                     "width": "240px",
                     "height": "110px",
                     "z-index": "10",
                     "background-size": "contain",
                     "background-repeat": "no-repeat"
                   });

    card_img_jq = _card.getImgJQ();  
    var card_id = _card.getCardId();
    var wonder_id = model.getTableau(model.getPlayerIndex()).getNextWonder();

    var option_id = 0;

    var cost = CardList.getCost(card_id);
    var card_coin_cost = 0;
      for (var i=0; i<cost.length; i++) { if (cost[i] === 8) { card_coin_cost++; } }
    var paid = [];
      for (var i=0; i<cost.length; i++) { paid[i] = false; }
    var checkmark_list = [];
      for (var i=0; i<cost.length; i++) { checkmark_list[i] = null; }
    var num_coins = model.getTableau(model.getPlayerIndex()).getCoins();
    var paid_coins = 0;

    cost_rectangles = [];
    cost_rectangles[0] = CardList.getCostRectangles(card_id);
    cost_rectangles[1] = [];
    cost_rectangles[2] = CardList.getCostRectangles(wonder_id);

    var confirm_enabled = false;

    var button_cancel = null;
    var button_confirm = null;
    var select_left = null;
    var select_right = null;
    var resource_ul = null;
    var resource_div = null;
    var coin_div = null;

    var old_z_index = 0;

    button_cancel = $('<img />', 
                       {"id": "button_cancel",
                        "src": "/img/cancel_up.png"
                       }).css({
                        "position": "absolute",      
                        "height": "40px",
                        "width": "120px",
                        "left": "360px",
                        "bottom": "160px",
                        "z-index": "6",
                        "opacity": 0}
                      ).hover(
                          function() { $(this).attr("src", "/img/cancel_over.png"); },
                          function() { $(this).attr("src", "/img/cancel_up.png"); }
                      ).click(cancel());

    button_confirm = $('<div></div>', 
                        {"id": "button_confirm"}).css({      
                         "position": "absolute",      
                         "height": "40px",
                         "width": "120px",
                         "right": "360px",
                         "bottom": "160px",
                         "z-index": "6",
                         "opacity": 0}
                       );

    if (cost.length === 0) { 
      confirm_enabled = true;
      button_confirm.css(
        {"background-image": "url('/img/confirm_up.png')"}
      ).hover(
        function() { $(this).css("background-image", "url('/img/confirm_over.png')"); },
        function() { $(this).css("background-image", "url('/img/confirm_up.png')"); }
      );
    }
    else {
      confirm_enabled = false;
      button_confirm.css(
        {"background-image": "url('/img/unpaid_up.png')"}
      ).hover(
        function() { $(this).css("background-image", "url('/img/unpaid_over.png')"); },
        function() { $(this).css("background-image", "url('/img/unpaid_up.png')"); }
      );
    }

    select_left = $('<div></div>', 
                     {"id": "select_left"}).css({
                      "background-image": "url('/img/wonder_left.png')", 
                      "background-size": "cover",
                      "position": "absolute",
                      "width": "120px",
                      "height": "120px",
                      "left": "220px",
                      "bottom": "300px",
                      "z-index": "6",
                      "opacity": 0.0}
                   );

    select_right = $('<div></div>', 
                      {"id": "select_right"}).css({
                       "background-image": "url('/img/coin_right.png')",
                       "background-size": "cover",
                       "position": "absolute",
                       "width": "120px",
                       "height": "120px",
                       "right": "220px",
                       "bottom": "300px",
                       "z-index": "6",
                       "opacity": 0.0}
                    );

    resource_div = $('<div></div>', {"id": "resource_div"});

    coin_div = $('<div></div>', 
                   {"id": "coin_div"}
                ).css({
                    "position": "absolute",
                    "border": "1px solid red",
                    "z-index": "11",
                    "opacity": 0.0
                   }
                );

    // Private Methods

    /* cancel
     *   Undo the changes of init
     * 1) The overlay is faded out and removed.
     * 2) The selected card is detached, retached, and returned to the deck, z-index decreased.
     * 3) The cards click and mouseover functions are restored
     * 4) The hand element hover function is restored
     * 5) The neighbor trade good tables are returned
     * 6) Accept, Cancel, Sell, and Wonder buttons are removed.
     */
    function cancel() {
      return function () {

        option_id = 0;

        left_neighbor_view.disconnect();
        right_neighbor_view.disconnect();

        // Cancel all selected resources and clear payment info
        cancelResources();

        // 1) The overlay is faded out and removed.
        game_view.removeOverlay(500);

        // Restore the old z-index
        item_div[0].css("z-index", old_z_index);

        // 2) The selected card returned to the deck, z-index decreased.
        item_div[0].detach();
        hand_view.reattach(item_div[0], card_index);
        hand_view.showHand(500);

        // 5) The neighbor trade good tables are returned
        $('#neighbor_view_left').stop().animate({'left': '2px',
                                                 'top': '2px'}, 500);
        $('#neighbor_view_right').stop().animate({'right': '2px',
                                                  'top': '2px'}, 500);

        // Remove the resource list
        resource_div.detach();

        // Remove the coin div
        coin_div.detach();

        // 6) Accept, Cancel, Sell, and Wonder buttons are removed.
        button_cancel.animate({"opacity": 0 }, 
                              { duration: 500,
                                complete: function() { $(this).remove(); }
                              });
        button_confirm.animate({"opacity": 0 },
                               { duration: 500,
                                 complete: function() { $(this).remove(); }
                               });
        select_left.animate({"opacity": 0},
                             { duration: 500,
                               complete: function() { $(this).remove(); }
                             });
        select_right.animate({"opacity": 0},
                           { duration: 500,
                             complete: function() { $(this).remove(); }
                           });
        item_div[1].animate({"opacity": 0},
                             { duration: 500,
                               complete: function() { $(this).remove(); }
                           });
        item_div[2].animate({"opacity": 0},
                             { duration: 500,
                               complete: function() { $(this).remove(); }
                           });
          
        // Tell the controller to remove this object
        controller.cancelSelect();
      };
    }

    /* fadeSelector
     *   _side: true -> right, false -> left
     *   _old: old option_id
     *   _new: new option_id
     *   _dur: animation duration
     */
    function fadeSelector(_side, _old, _new, _next, _dur) {
      var div = _side ? select_right : select_left;
      old_img = getSelectorImg(_old, _side);
      new_img = getSelectorImg(_new, _side);

      div.unbind();
      var temp_img = $('<img/>', 
                        {'src': old_img}).css(
                        {'position': 'absolute',
                         'width': '120px',
                         'height': '120px'
                        }
                      ).appendTo(div);
      div.css({'background-image': 'url(' + new_img + ')'});
      temp_img.animate({'opacity': '0'},
                       { duration: _dur,
                         complete: function() { $(this).remove(); 
                                                div.click(selectLeftGenerator(_next, _side));
                                              }
                       });
    }

    function getSelectorImg(_id, _side) {
      var age = model.getAge();
      var prefix = _id === 0 ? 
                     (age === 1 ? 'age1' :
                       (age === 2 ? 'age2' : 'age3')
                     ) :
                     (_id === 1 ?
                       'coin' :
                       'wonder');
      return '/img/' + prefix + (_side ? '_right' : '_left') + '.png';
    }

    function cancelResources() {
      for (var i=0; i<paid.length; i++) {
        if (paid[i]) {
//          checkmark_list[i].detach();
          animateRemoveCheckmark(i);
          checkmark_list[i] = null;
        }
        paid[i] = false;
      }
      left_neighbor_view.disableResources();
      right_neighbor_view.disableResources();
      resource_view.disableResources();      
    }

    function enableResources() {
      left_neighbor_view.enableResources();
      right_neighbor_view.enableResources();
      resource_view.enableResources();      
    }

    function disableConfirm() {
      if (confirm_enabled) {
        var temp_img = $('<img/>', {'src': 'img/confirm_up.png'}).css({'position': 'absolute',
                                                                       'top': '0px',
                                                                       'left': '0px'});
        button_confirm.append(temp_img);
        button_confirm.css(
          {"background-image": "url('/img/unpaid_up.png')"}
        ).hover(
          function() { $(this).css("background-image", "url('/img/unpaid_over.png')"); },
          function() { $(this).css("background-image", "url('/img/unpaid_up.png')"); }
        );
        temp_img.animate({'opacity': '0'}, { duration: 200, complete: function() { $(this).detach(); } }); 
        confirm_enabled = false;
      }
    }

    function enableConfirm() {
      if (!confirm_enabled) {
        var temp_img = $('<img/>', { 'src': 'img/unpaid_up.png' }).css({'position': 'absolute',
                                                                       'top': '0px',
                                                                       'left': '0px'});
        button_confirm.append(temp_img);
        button_confirm.css(
          {"background-image": "url('/img/confirm_up.png')"}
        ).hover(
          function() { $(this).css("background-image", "url('/img/confirm_over.png')"); },
          function() { $(this).css("background-image", "url('/img/confirm_up.png')"); }
        );
        temp_img.animate({'opacity': '0'}, { duration: 200, complete: function() { $(this).detach(); } });
        confirm_enabled = true;
      }
    }

    function animateAddCheckmark(_index) {
      var top = cost_rectangles[option_id][_index].top;
      var left = cost_rectangles[option_id][_index].left;
      checkmark_list[_index] = $('<img/>', 
                             { 'src': '/img/resource_check.png' }
                           ).css(
                             { 'position': 'absolute',
                               'left': left + 'px',
                               'top': top + 'px',
                               'z-index': '2' }) 
      item_div[option_id].append(checkmark_list[_index]);
      checkmark_list[_index].animate(
        {
          'width':  '30px',
          'height': '40px',
          'top':    (top-20) + 'px',
          'left':   (left-5) + 'px'
        },
        { duration: 100, 
          complete: function() { $(this).animate(
                                 {
                                   'width':  '20px',
                                   'height': '20px',
                                   'top':    top + 'px',
                                   'left':   left + 'px'
                                 }, 100);
                               } 
        }
      );
    }

    function animateRemoveCheckmark(_index) {
      checkmark_list[_index].stop().animate(
        {
          'width': '2px',
          'height': '2px',
          'left': '29px'
        },
        { duration: 150,
          complete: function() { $(this).detach(); }
        }
      );
    }

    function isPaid() {
      for (var j=0; j<paid.length; j++) {
        if (paid[j] === false) {
          return false;
        }
      }
      return true;
    }
    
    function checkCardCoinPayment(_coin_cost) {
      if (_coin_cost > 0 && _coin_cost <= num_coins - paid_coins) {
        for (var i=0; i<paid.length; i++) {
          if (cost[i] === 8 && !paid[i]) {
            paid_coins += _coin_cost;
            coin_view.pay(_coin_cost);
            animateAddCheckmark(i);
            paid[i] = true;
            if (isPaid()) {
              enableConfirm();
            }
            break;
          }
        }        
      }
    }

    function checkNeighborCoinPayment(_cost) {
      if (_cost > 0 && _cost <= num_coins - paid_coins) {
        paid_coins += _cost;
        coin_view.pay(_cost);
        return true;
      }
      else if (_cost === 0) {
        return true;
      }
      return false;
    }

    /* selectLeftGenerator
     *   Change option_id to reflect new choice.
     *     option_id: 
     *       0: card
     *       1: coin
     *       2: wonder
     *   What needs to happen:
     *     Current item slides and fades out
     *     New item slides and fades in
     *     Allocated coins are returned
     *     Cost is updated
     *     Paid is cleared, checkmarks removed
     *     Confirm button enabled/disabled
     *     option_id updated
     *   What needs to be updated
     *     Coordinates for coins to go on top of wonder
     *     Deselect resources in resource_card_view
     */
    function selectLeftGenerator(_id, _side) {
      return function() {
        var next_id = mod(_id+(_side?1:-1),3);
        item_div[_id].animate(
          { 'right': (_side?0:720) + 'px',
            'opacity': 0
          }, {
            duration: 500,
            complete: function () { $(this).detach(); }
          }
        );

        var bottom = next_id === 0 ? 200 : 300; 
        var right = next_id === 1 ? 430 : 360;
        item_div[next_id].css(
          { 'right': (_side?720:0) + 'px',
            'bottom': bottom + 'px',
            'opacity': 0
          }
        ).appendTo('#board').animate(
          { 'right': right + 'px',
            'opacity': 1
          },
          500
        );

        if (paid_coins > 0) {
          coin_view.refund(paid_coins);
          paid_coins = 0;        
        }

        // Clear selected resources
        cancelResources();
        enableResources();

        // If choosing the card
        if (next_id === 0) {
          // Update cost array
          cost = CardList.getCost(card_id);
        }
        // If choosing money
        else if (next_id === 1) {
          cost = [];
        }
        // If choosing the wonder
        else if (next_id === 2) {
          cost = CardList.getCost(wonder_id);
        }
    
        // Reset other cost arrays
        paid = [];
          for (var i=0; i<cost.length; i++) { paid[i] = false; }
        checkmark_list = [];
          for (var i=0; i<cost.length; i++) { checkmark_list[i] = null; }

        // Pay card coin costs if necessary
        checkCardCoinPayment(card_coin_cost);

// old new
//        fadeSelector(false, next_id, mod(next_id+(_side?1:-1),3), 500);
//        fadeSelector(true, mod(next_id-1,3), mod(next_id+1,3), 500);
        fadeSelector(false, mod(_id-1,3), mod(_id+(_side?0:1),3), next_id, 500);
        fadeSelector(true, mod(_id+1,3), mod(_id+(_side?-1:0),3), next_id, 500);

        if (isPaid()) {
          enableConfirm();
        }
        else {
          disableConfirm();
        }
        option_id = next_id;
      };
    }
/*
    function selectRightGenerator() {
      return function() {
        var old_option_id = option_id;
        option_id = (option_id + 1) % 3;
      };
    }
*/
    function getMove(_card_id, _opt_id, _lnv, _rnv) {
      var temp =
        { "card_index": _card_id,
          "option_id": _opt_id,
          "left_neighbor_resources": _lnv.getSelected(),
          "right_neighbor_resources": _rnv.getSelected() 
        };
console.log(temp);
      return temp;
    }

    // Public Methods
    
    /* init
     *   Creates a function to be called when a card is selected from a player's hand.  Several things
     * happen at this point.
     * 1) The overlay is added and faded in to bring attention to the selected card.
     * 2) The selected card is enlarged and moved to the middle of the screen, z-index increased.
     * 3) The other cards are returned to their tucked position and the hand element is lowered
     * 4) The board_list is returned to the player's board (and neighbor good tables).
     * 5) The neighbor trade good tables are brought forward (and colored?)
     * 6) Accept, Cancel, Sell, and Wonder buttons are added. (and accept is color coded?)
     */
    self.init = function(_left_neighbor_view, _right_neighbor_view) {
      left_neighbor_view = _left_neighbor_view;
      right_neighbor_view = _right_neighbor_view;

      left_neighbor_view.connect(self);
      right_neighbor_view.connect(self);
      left_neighbor_view.enableResources();
      right_neighbor_view.enableResources();

      // 1) Return cards      
      hand_view.hideHand(item_div[0]);

      // Lift the selected card above the overlay
      old_z_index = item_div[0].css('z-index');
      item_div[0].css('z-index', 10);

      // 4) Add the overlay
      game_view.addOverlay(5, 0.75, 500);

      // 3) Move the selected card to the middle (+250px extra from bottom)
      item_div[0].stop().animate({"right":  "358px", 
                                  "bottom": "450px",
                                  "height": "364px", 
                                  "width":  "240px"}, 
                                 {duration: 500,
                                  complete: function() {
                                              $(this).detach().appendTo($('#board')).css({"right": "360px",
                                                                                          "bottom": "200px"
                                              }); 
                                            }
                                 });
      card_img_jq.stop().animate({"height": "364px", 
                                  "width":  "240px"}, 500);

      // Return to the player's board
      game_view.returnToPlayerBoard(500);

      // Bring the neighbor summaries forward
      $('#neighbor_view_left').stop().animate({'left': '50px',
                                               'top': '50px'}, 500);
      $('#neighbor_view_right').stop().animate({'right': '50px',
                                                'top': '50px'}, 500);

      // Add elements
      button_cancel.delay(500).appendTo('#board').animate({"opacity": 1}, 500);
      button_confirm.delay(500).appendTo('#board').animate({"opacity": 1}, 500);
      select_left.delay(500).appendTo('#board').animate({"opacity": 1}, 500);
      select_right.delay(500).appendTo('#board').animate({"opacity": 1}, 500);      


//      addResources();    
      resource_div.css(
        {"width": "720px",
         "left": "120px"
        }        
      ).appendTo($('#board'));

      resource_view = new ResourceView(self, model, resource_div);
      resource_view.init();

      coin_view = new CoinView(self, model.getTableau(model.getPlayerIndex()).getCoins(), coin_div, 120, 80);
      coin_view.init();
      coin_div.delay(500).appendTo('#board').animate({"opacity": 1}, 
                                                     { duration: 500, 
                                                       complete: function() { checkCardCoinPayment(card_coin_cost); }
                                                     });

      item_div[2].css('background-image', 'url("/img/wonders/' + wonder_id + '.png")'); 

      select_left.click(selectLeftGenerator(option_id, false));
      select_right.click(selectLeftGenerator(option_id, true));

      // Create confirm action
      button_confirm.click(function() { if (confirm_enabled) 
                                          ajaxSendMove(getMove(card_index, option_id,
                                                               left_neighbor_view,
                                                               right_neighbor_view));
                                      });
    };

    /* checkAddResource
     *   
     */
    self.checkAddResource = function(_resource_index, _resource_id, _neighbor_cost, _card, _view) {
      for (var i=0; i<paid.length; i++) {
        if (cost[i] == _resource_id && !paid[i]) {
          if (checkNeighborCoinPayment(_neighbor_cost)) {
            animateAddCheckmark(i);
            paid[i] = true;
            if (isPaid()) {
              enableConfirm();
            }
            _view.confirmAddResource(_resource_index, _card);
            break;
          }
        }
      }
    };

    self.deselectResource = function(_resource_id, _coin_cost) {
      if (isPaid()) {
        disableConfirm();
      }
      if (_coin_cost > 0) {
        coin_view.refund(_coin_cost);
        paid_coins -= _coin_cost;        
      }
      for (var i=0; i<paid.length; i++) {
        if (cost[i] == _resource_id && paid[i]) {
          animateRemoveCheckmark(i);
          checkmark_list[i] = null;
          paid[i] = false;
          break;
        }
      }
    };

  }

  return SelectCardView;  
});
