define(
  ['models/cardlist_data'],
  function(CardList) {

  var id_counter = 0;

  /* object = { 
   *          "resources": [4, 3, 2, 1],     // ordered 
   *          "purchasable": false,
   *          "and": false,
   *          "rectangles": [{left: '20px', top: '10px', width: '20px', height: '20px'},
   *                         {left: '40px', top: '10px', width: '20px', height: '20px'},
   *                         {left: '60px', top: '10px', width: '20px', height: '20px'},
   *                         {left: '80px', top: '10px', width: '20px', height: '20px'}]
   *        }
   */
  function Resource(_card_id) {
    var self = this;
    var id = id_counter++;

//    var object = _object;
    var card_id = _card_id;

    var resource_object = CardList.getResources(card_id);
    var resources = resource_object.resources;
    var num_resources = resources.length;
    var purchasable = resource_object.purchasable;
    var and = resource_object.and;
    var rectangles = resource_object.rectangles;

    self.next = null;

    self.getId = function() {
      return id;
    };

    self.getCardId = function() {
      return card_id;
    };

    self.equals = function(_res) {
      return _res === null ? false : id == _res.getId();
    };

    self.getResources = function() {
      return resources;
    };

    self.getNumResources = function() {
      return num_resources;
    };

    self.getAnd = function() {
      return and;
    };

    self.getPurchasable = function() {
      return purchasable;
    };

    self.getRectangles = function() {
      return rectangles;
    };

    self.getOrder = function() {
      var total = 0;
      for (var i=0; i<resources.length; i++) {
        total += resources[i];
      }
      return total;
    };
/*
    self.getObject = function() {
      return object;
    };
*/
    self.lessThan = function(_res) {
      return (purchasable && ! _res.getPurchasable() ? true :
               (_res.getPurchasable() && ! purchasable ? false :
                 (num_resources < _res.getNumResources() ? true :
                    (_res.getNumResources() < num_resources ? false :
                      (self.getOrder() < _res.getOrder() ? true : false)))));
    };
  }

  function ResourceList() {

    var self = this;

    var head = null;
    var len = 0;
/*
    function print_log() {
      var str = '{ ';
      var temp = head;
      var res;
      while (temp != null) {
        str += '[';
        res = temp.getResources();
        for (var i=0; i<res.length; i++) {
          str += res[i];
          if (i < res.length - 1) {
            str += ', ';
          }
        }
        str += '] ';
        temp = temp.next;
      }
      str += '}';
      console.log(str);
    }
*/
    self.addResource = function(_card_id) {
      var current = new Resource(_card_id);
      var temp = head;
      var prev = null;

      if (head === null) {
        head = current;
      }
      else {
        while (temp.lessThan(current)) {
          prev = temp;
          temp = temp.next;
          if (temp === null) {
            break;
          }
        }
        current.next = temp;
        if (head.equals(temp)) {
          head = current;
        }
        else {
          prev.next = current;
        } 
      }
      len++;
//      print_log();
    };

    self.getArray = function() {
      var out = [];
      var index = 0;
      var current = head;

      while (current != null) {
        out[index] = current;
        current = current.next;
        index++;
      }
      return out;
    };
  }

  return ResourceList;
});
