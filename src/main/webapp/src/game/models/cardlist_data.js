define([], function() {

  var CardList = {
    100: { 
      cost: { cost: [3, 3],
              rectangles: [ {left: 22, top: 35},
                            {left: 22, top: 60} ]
            },
      color: "wonder",
      prereq: [],
      resources: {},
      onplace: function() {}
    },
    210: {
      cost: { cost: [3, 3],
              rectangles: [ {left: 16, top: 40},
                            {left: 16, top: 68} ]
            },
      color: "wonder",
      prereq: [],
      resources: {},
      onplace: function() {}
    },
    1101: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "brown",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '41px', top: '6px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1102: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "brown",
      prereq: [],
      resources: { resources: [2], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1103: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "brown",
      prereq: [],
      resources: { resources: [3], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1104: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "brown",
      prereq: [],
      resources: { resources: [4], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1105: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [1, 2], and: false, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1106: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [3, 1], and: false, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1107: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [4, 1], and: false, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1108: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [3, 2], and: false, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1109: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [4, 2], and: false, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1110: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [3, 4], and: false, purchasable: true, rectangles: 
                   [ {left: '27px', top: '6px', width: '40px', height: '40px'}, 
                     {left: '66px', top: '6px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1201: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "grey",
      prereq: [],
      resources: { resources: [5], and: false, purchasable: true, rectangles: 
                   [ {left: '40px', top: '5px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1202: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "grey",
      prereq: [],
      resources: { resources: [6], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1203: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "grey",
      prereq: [],
      resources: { resources: [7], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1301: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "gold",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1302: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "gold",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1303: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "gold",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1401: { 
      cost: { cost: [1],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "red",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1402: { 
      cost: { cost: [2],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "red",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1403: { 
      cost: { cost: [4],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "red",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1501: { 
      cost: { cost: [6],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "green",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1502: { 
      cost: { cost: [5],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "green",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1503: { 
      cost: { cost: [7],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "green",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1601: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "blue",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1602: { 
      cost: { cost: [],
              rectangles: []
            },
      color: "blue",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    1604: { 
      cost: { cost: [3],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "blue",
      prereq: [],
      resources: { resources: [1], and: false, purchasable: true, rectangles: 
                   [ {left: '42px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    2101: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [1, 1], and: true, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    2102: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [2, 2], and: true, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    2103: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [3, 3], and: true, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    2104: { 
      cost: { cost: [8],
              rectangles: [ {left: 20, top: 20} ]
            },
      color: "brown",
      prereq: [],
      resources: { resources: [4, 4], and: true, purchasable: true, rectangles: 
                   [ {left: '32px', top: '7px', width: '40px', height: '40px'}, 
                     {left: '82px', top: '7px', width: '40px', height: '40px'} ]
                 },
      onplace: function() {}
    },
    2303: { 
      cost: { cost: [4, 4],
              rectangles: [ {left: 20, top: 20},
                            {left: 20, top: 50} ]
            },
      color: "gold",
      prereq: [],
      resources: { resources: [4, 3, 2, 1], and: false, purchasable: false, rectangles: 
                   [ {left: '30px', top: '16px', width: '20px', height: '20px'},
                     {left: '51px', top: '16px', width: '20px', height: '20px'},
                     {left: '72px', top: '16px', width: '20px', height: '20px'},
                     {left: '93px', top: '16px', width: '20px', height: '20px'} ],
                 },
      onplace: function() {}
    },
    2304: { 
      cost: { cost: [1, 1],
              rectangles: [ {left: 20, top: 20},
                            {left: 20, top: 50} ]
            },
      color: "blue",
      prereq: [],
      resources: { resources: [1, 3, 2], and: false, purchasable: false, rectangles: 
                   [ {left: '20px', top: '10px', width: '30px', height: '30px'}, 
                     {left: '50px', top: '10px', width: '30px', height: '30px'},
                     {left: '80px', top: '10px', width: '30px', height: '30px'} ],
                 },
      onplace: function() {}
    }
  };

  var getCost = function(id) {
    return CardList[id].cost.cost;
  };

  var getCostRectangles = function(id) {
    return CardList[id].cost.rectangles;
  };

  var getColor = function(id) {
    return CardList[id].color;
  };

  var getPrereq = function(id) {
    return CardList[id].prereq;
  };

  var getResources = function(id) {
    return CardList[id].resources;
  };

  var getOnPlace = function(id) {
    return CardList[id].onplace;
  };

  return {
    getCost: getCost,
    getCostRectangles: getCostRectangles,    
    getColor: getColor,
    getPrereq: getPrereq,
    getResources: getResources,
    getOnPlace: getOnPlace
  };
});
