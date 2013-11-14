define(
  ['jquery'],
  function($) {

  function CoinView(_parent, _num_coins, _div, _bottom, _right) {
    var self = this;

    var parent = _parent;
    var num_coins = _num_coins;
    var spent_coins = 0;
    var div = _div;
    var bottom = _bottom;
    var right = _right;

    var coin_amount_list = [];
    var coin_img_list = [];
    var coin_timer_list = [];

    var spent_coin_amount_list = [];
    var spent_coin_img_list = [];
    var spent_coin_timer_list = [];

    var label;

    // Private Functions

    function exchange3for1s(_amount, _delay) {
      if (coin_amount_list[coin_amount_list.length-1] === 3) {
        var old_coin_img = coin_img_list.pop();
        coin_amount_list.pop();

        old_coin_img.delay(_delay).stop().animate(
                             {'right': (400-right) + 'px',
                              'bottom': (1000-bottom) + 'px'},
                             { duration: 500,
                               complete: function() { $(this).detach(); }
                             });

        for (var i=0; i<3; i++) {
          var temp_img = $('<img/>', 
                            {'src': 'img/tokens/coin_1.png'}).css({
                             'position': 'absolute',
                             'height': '80px',  
                             'width': '80px', 
                             'right': (400-right)+'px',  
                             'bottom': (1000-bottom)+'px'  
                            }
                          ).appendTo(div);


          if (i < amount) {
            spent_coin_amount_list.push(1);
            spent_coin_img_list.push(temp_img);
          }
          else {
            coin_amount_list.push(1);
            coin_img_list.push(temp_img);
            var r = Math.floor(20 + (Math.random()*40));
            var theta = Math.random() * 6.2832;
            temp_img.delay(_delay + 300*(i-_amount+1)).animate(
              {'right':  (60 + r*Math.cos(theta)) + 'px',
               'bottom': (80 + r*Math.sin(theta)) + 'px' 
              },
              500);
          }
        }
      }
    }

    function exchange1sfor3() {

    }

    function discardCoin(_index) {

    }

    function createCoin(_amount) {

    }

    // Public Functions

    self.init = function() {
      div.css({'bottom': bottom + 'px',
               'right':  right + 'px',
               'width':  '200px',
               'height': '220px'});
      var temp_count = 0;
      var i=0;
      while (temp_count < num_coins) {
        coin_timer_list[i] = null;
        coin_amount_list[i] = num_coins - temp_count > 4 ? 3 : 1;
        temp_count += coin_amount_list[i];

        var r = Math.floor(20 + (Math.random()*40));
        var theta = Math.random() * 6.2832;
        if (coin_amount_list[i] === 3) {
          coin_img_list[i] = $('<img/>', 
                                {'src': 'img/tokens/coin_3.png'}).css({
                                 'position': 'absolute',
                                 'height': '100px',  
                                 'width': '100px', 
                                 'right': (40+Math.floor(r * Math.cos(theta))) + 'px',  
                                 'bottom': (60+Math.floor(r * Math.sin(theta))) + 'px'  
                                }
                              ).appendTo(div);

        }
        else {
          coin_img_list[i] = $('<img/>', 
                                {'src': 'img/tokens/coin_1.png'}).css({
                                 'position': 'absolute',
                                 'height': '80px',  
                                 'width': '80px', 
                                 'right': (60+Math.floor(r * Math.cos(theta))) + 'px',  
                                 'bottom': (80+Math.floor(r * Math.sin(theta))) + 'px'  
                                }
                              ).appendTo(div);
        }
        i++;  
      }

      label = $('<div></div>').text('Coins: ' + num_coins).css(
                 {'position': 'absolute',
                  'bottom': '0px',
                  'left': '67px',
                  'font-family': '"Veranda", sans-serif',
                  'font-size': '20px',
                  'color': 'white'                       
                 }
               ).appendTo(div);
    };

    self.pay = function(_amount) {
      // bot 450, right 360, width 240, height 364.
      var delay_time = 0;
      while (_amount <= num_coins && _amount > 0) {
        var current_amount = coin_amount_list[coin_amount_list.length-1];
        // coin value is too high
        if (current_amount === 3 && _amount < 3) {
          exchange3for1s(_amount, delay_time);
        }
        // Assume coin can be spent
        else {
          var coin_img = coin_img_list.pop();
          var timer = coin_timer_list.pop();
          clearTimeout(timer);
          coin_amount_list.pop();
          num_coins -= current_amount;
          spent_coins += current_amount;
          spent_coin_amount_list.push(current_amount);
          spent_coin_img_list.push(coin_img)

          var r = Math.floor(20 + (Math.random()*40));
          var theta = Math.random() * 6.2832;

//          function complete_fn() { label.text("Coins: " + num_coins);
//                                   _parent.payCoin(current_amount);
//                                   self.pay(_amount - current_amount, _parent); }

          // Create closure
          var animate_fn = (function(_coin_img, _r, _theta, _num_coins) { 
            return function() {
              _coin_img.stop().animate(
                               { 'right':  (360 - right + 120 - 50 + _r*Math.cos(_theta)) + 'px',
                                 'bottom': (450 - bottom - 250 + 182 - 50 + _r*Math.sin(_theta)) + 'px'
                               }, 500);
              label.text("Coins: " + _num_coins);
            };
          })(coin_img, r, theta, num_coins);

          timer = setTimeout(animate_fn, delay_time);
          spent_coin_timer_list.push(timer);
          delay_time += 300;
          _amount -= current_amount;
        }
      }
    };

    self.refund = function(_amount) {
      var delay_time = 0;
      while (_amount <= spent_coins && _amount > 0) {
        var current_amount = spent_coin_amount_list[spent_coin_amount_list.length-1];
        // coin value is too high
//        if (current_amount === 3 && _amount < 3) {
//          exchange3for1s(_amount, _parent);
//       }
        // Assume coin can be returned
//        else {
          var coin_img = spent_coin_img_list.pop();
          var timer = spent_coin_timer_list.pop();
          clearTimeout(timer);
          spent_coin_amount_list.pop();
          num_coins += current_amount;
          spent_coins -= current_amount;
          coin_amount_list.push(current_amount);
          coin_img_list.push(coin_img)

          var r = Math.floor(20 + (Math.random()*40));
          var theta = Math.random() * 6.2832;

          var animate_fn = (function(_coin_img, _r, _theta, _num_coins) { 
            return function() {
              _coin_img.stop().animate({ 'right':  (60+Math.floor(_r * Math.cos(_theta))) + 'px',
                                  'bottom': (80+Math.floor(_r * Math.sin(_theta))) + 'px'
                               }, 500);
              label.text("Coins: " + _num_coins);
            }
          })(coin_img, r, theta, num_coins);

          timer = setTimeout(animate_fn, delay_time);
          coin_timer_list.push(timer);
          delay_time += 300;
          _amount -= current_amount;
      }
    };
  }

  return CoinView;

});
