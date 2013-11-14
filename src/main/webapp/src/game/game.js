define(["tableau", "card", "jquery"], function(Tableau, Card, $) {

  var card_left = [280, 383, 487, 590, 175, 700, 800];
  var card_top = [250, 250, 250, 250, 300, 300, 300];

  // static functions
  var init = function(json) {

  board_index = player_index;

/*
    init_dom();
  };

  function init_dom() {

    dealCards();    

    addBoards();

    addNames();



    // Attach scrolling functions



  }
*/


  return { 
    init: init 
  };
});
