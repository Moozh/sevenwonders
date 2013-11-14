define("Person", [], function() {

  // static variable
  var id = 0;
 
  // static method
  function nextId() {
    return ++id;
  }
 
  // constructor
  function Person(name) {
    var self = this;
 
    // private members
    var color = 'everything';
 
    // private methods
    function likes() {
      return self.name + ' likes ' + color;
    }
 
    // public members
    self.id = nextId();
    self.name = name;
 
    // public methods
    self.setColor = function(c) {
      color = c;
    };
 
    self.print = function() {
      console.log(likes());
    };
  }
 
  // return constructor
  return Person;
});
