define(
  ['views/hand_view', 'views/tableau_view', 'views/neighbor_view', 'jquery'],
  function(HandView, TableauView, NeighborView, $) {

  function mod(n, k) {
    return ((n % k) + k) % k;
  }

  function GameView(_controller, _model) {

    var self = this;

    var controller = _controller;
    var model = _model;
    var hand_view = new HandView(controller, self, model);
    var left_neighbor_view = new NeighborView(false, model);
    var right_neighbor_view = new NeighborView(true, model);
    var tableau_views = [];

    for (var i=model.getNumPlayers()-1; i>=0; i--) {
      tableau_views[i] = new TableauView();
    }

    var num_players;
    var player_index;
    var board_index;

    var overlay_list = [];

    var scroll_queue = $({});
    var scrolling = false;

    /* scrollLeft
      *   Adds all the logic to scroll the boards to the left to a queue and
     * then begins the process of executing said queue.
     */
    function scrollLeftGenerator(dur, ease)
    {
      return function() {
        scroll_queue.queue("scroll", function() {
          board_index = mod(board_index - 1, num_players);
          $("#player_name_right").find("ul").prepend($("#player_name_main").find("li").clone());
          $("#player_name_right").find("ul").css("left", "-80px");

          $("#player_name_main").find("ul").prepend($("#player_name_left").find("li").clone().get(-1));
          $("#player_name_main").find("ul").css("left", "-240px");

          $("#player_name_left").find("ul").prepend($("#player_name_right").find("li").clone().get(-1));
          $("#player_name_left").find("ul").css("left", "-80px");

          $("#player_board_list").prepend($("#player_board_list li:last"));
          $("#player_board_list").css("left", "-960px");
          $("#player_board_list li:first").css("display", "inline-block"); 

          $("#player_board_list").animate({left : "0px"},
            { duration: dur,
              easing: ease,
              complete: function() { $("player_board_list li").eq(1).css("display", "none"); }
            });

          $("#player_name_main ul").animate({left : "0px"}, 
            { duration: dur, 
              easing: ease,
              complete: function() { $("#player_name_main li:last").remove(); }
            });

          $("#player_name_left ul").animate({left : "0px"}, 
            { duration: dur, 
              easing: ease,
              complete: function() { $("#player_name_left li:last").remove(); }
            });

          $("#player_name_right ul").animate({left : "0px"}, 
            { duration: dur, 
              easing: ease,
              complete: function() { $("#player_name_right li:last").remove(); 
                                     if (scrolling && scroll_queue.queue("scroll").length > 0) {
                                       scroll_queue.dequeue("scroll");
                                     } else {
                                       scrolling = false;
                                     }
                                   }
            });
          $("#debug").html(scroll_queue.queue("scroll").length);
        });
        $("#debug").html(scroll_queue.queue("scroll").length);
        if (!scrolling && scroll_queue.queue("scroll").length > 0) {
          scroll_queue.dequeue("scroll");
          scrolling = true;
        }
      };
    }

    /* scrollRight
     *   Adds all the logic to scroll the boards to the right to a queue and
     * then begins the process of executing said queue.
     */
    function scrollRightGenerator(dur, ease)
    {
      return function() {
        scroll_queue.queue("scroll", function() {
          board_index = mod(board_index + 1, num_players);
          $("#player_name_right").find("ul").append($("#player_name_left li:first").clone());

          $("#player_name_main").find("ul").append($("#player_name_right li:first").clone());

          $("#player_name_left").find("ul").append($("#player_name_main li:first").clone());

          $("#player_board_list li").eq(1).css("display", "inline-block"); 

          $("#player_board_list").animate({left : "-960px"},
            { duration: dur,
              easing: ease,
              complete: function() { $("#player_board_list").append($("#player_board_list li:first"));
                                     $("#player_board_list").css("left", "0px");
                                     $("#player_board_list li:last").css("display", "none"); }
            });

          $("#player_name_main ul").animate({left : "-240px"}, 
            { duration: dur, 
              easing: ease,
              complete: function() { $("#player_name_main li:first").remove();
                                     $("#player_name_main ul").css("left", "0px"); }
            });
          $("#player_name_left ul").animate({left : "-80px"}, 
            { duration: dur, 
              easing: ease,
              complete: function() { $("#player_name_left li:first").remove();
                                     $("#player_name_left ul").css("left", "0px"); }
            }); 
          $("#player_name_right ul").animate({left : "-80px"}, 
            { duration: dur, 
              easing: ease,
              complete: function() { $("#player_name_right li:first").remove(); 
                                     $("#player_name_right ul").css("left", "0px"); 
                                     if (scrolling && scroll_queue.queue("scroll").length > 0) {
                                       scroll_queue.dequeue("scroll");
                                     } else {
                                       scrolling = false;
                                     }
                                   }
            }); 
            $("#debug").html(scroll_queue.queue("scroll").length);
        });
        $("#debug").html(scroll_queue.queue("scroll").length);
        if (!scrolling && scroll_queue.queue("scroll").length > 0) {
          scroll_queue.dequeue("scroll");
          scrolling = true;
        }
      };
    }

    function addBoards(board_list) {
      // Add the board html elements
      for (var i=0; i<num_players; i++) {
        $('#player_board_list').append(
          $('<li></li>', {"class": "player_board"}).append(
            $('<img />', {"class": "board_image",
                          "src"  : "img/boards/" + board_list[i] + ".jpg"})
          )
        );
      }

      // Align the board elements
      for (i=0; i<player_index; i++) {
        $("#player_board_list").append($("#player_board_list li:first"));
      }
      $("#player_board_list li:first").css("display", "inline-block");
    }

    function addNames(name_list) {
      // Add the player names to the top
      // -- main name
      $('#player_name_main ul').append(
        $('<li>' +  name_list[player_index] + '</li>')
      );
      // -- right names
      for(var i=0; i<Math.floor((num_players-1)/2); i++) {
        $('#player_name_right ul').append(
          $('<li>' + name_list[(player_index + i+1) % num_players] + '</li>')
        );
      }
      // -- left names
      for(var i=0; i<Math.ceil((num_players-1)/2); i++) {
        $('#player_name_left ul').append(
          $('<li>' + name_list[(player_index + Math.floor((num_players-1)/2) + i+1) % num_players] + '</li>')
        );
      }
      
      // Align names
      $("#player_name").
        css("left",  (360 - Math.floor(num_players/2)*80) + "px").
        css("width", (240 + (num_players-1)*80) + "px");
      $("#player_name_main").
        css("left",  (Math.floor(num_players/2)*80) + "px");
      $("#player_name_left").
        css("width", (Math.floor(num_players/2)*80) + "px");
      $("#player_name_right").
        css("left",  (Math.floor(num_players/2)*80+240) + "px").
        css("width", ((Math.ceil(num_players/2)-1)*80) + "px");
    }

    // init function to expose
    /*
     */
    self.init = function() {

      hand_view.init($("#player_hand")); 

      // Get constants
      num_players = model.getNumPlayers();
      player_index = model.getPlayerIndex();
      board_index = player_index;

      addBoards(model.getBoardIds());

      addNames(model.getNames());

      left_neighbor_view.init(
        model.getTableau(mod(player_index - 1, num_players)).getName(),
        model.getTableau(mod(player_index - 1, num_players)).getResources().getArray()
      );
      right_neighbor_view.init(
        model.getTableau((player_index + 1) % num_players).getName(), 
        model.getTableau((player_index + 1) % num_players).getResources().getArray()
      );   

      // Attach the scrolling functions
      $("#scroll_left").hover(
        function() { $(this).attr("src", "/img/left_arrow_over.png"); },
        function() { $(this).attr("src", "/img/left_arrow.png"); }
      ).click(scrollLeftGenerator(500, "swing"));

      $("#scroll_right").hover(
        function() { $(this).attr("src", "/img/right_arrow_over.png"); },
        function() { $(this).attr("src", "/img/right_arrow.png"); }
      ).click(scrollRightGenerator(500, "swing"));

      $("#debug").html(scroll_queue.queue("scroll").length);
    };

    /* returnToPlayerBoard
     *   Scroll the boards so that the player's own board is in view
     */
    self.returnToPlayerBoard = function(dur) {
      var dest = player_index - board_index;
      if ((0 < dest && dest <= num_players/2) || (dest + num_players <= num_players/2)) {
        if (dest < 0) { dest += num_players; }
        for (var i=0; i<dest; i++) {
          (scrollRightGenerator(dur/dest))();
        }
      }
      else if (player_index != board_index) {
        dest = -dest;
        if (dest < 0) { dest += num_players; }
        for (var i=0; i<dest; i++) {
          (scrollLeftGenerator(dur/dest))();
        }
      }
    };

    self.addOverlay = function(_z_index, _opacity, _dur) {
      // Create element and add to array
      var overlay =       
        $('<div></div>', 
          {'id': 'overlay'}).css(
          {'background-color': 'black',
           'position': 'absolute',
           'left': '0px',
           'top': '0px',
           'width': '100%',
           'height': $(document).height(),
           'z-index': _z_index,
           'opacity': '0'});

      overlay_list.push(overlay);

      // Add to the dom
      overlay.appendTo($('#board')).hide();

      // Fade in effect
      overlay.toggle().fadeTo(_dur, _opacity);
    };

    self.removeOverlay = function(dur) {
      var overlay = overlay_list.pop();
      overlay.fadeTo(dur, 0.0).delay(dur).remove();
    };

    self.getNeighborView = function(_side) {
      return _side ? right_neighbor_view : left_neighbor_view;   
    }
  }

  return GameView;
});
