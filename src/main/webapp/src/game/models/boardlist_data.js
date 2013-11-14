define(['models/cardlist_data'], 
  function(CardList) {

  var BoardList = {
    10: { 
      resource: 3,
      wonders: [100, 101, 102]
    },
    11: { 
      resource: 3,
      wonders: [110, 111, 112, 113]
    },
    20: { 
      resource: 6,
      wonders: [200, 201, 202]
    },
    21: { 
      resource: 6,
      wonders: [210, 211, 212]
    },
    30: { 
      resource: 4,
      wonders: [300, 301, 302]
    },
    31: { 
      resource: 4,
      wonders: [310, 311, 312]
    },
    40: { 
      resource: 7,
      wonders: [400, 401, 402]
    },
    41: { 
      resource: 7,
      wonders: [410, 411, 412]
    },
    50: { 
      resource: 5,
      wonders: [200, 201, 202]
    },
    51: { 
      resource: 5,
      wonders: [210, 211, 212]
    },
    60: { 
      resource: 1,
      wonders: [600, 601, 602]
    },
    61: { 
      resource: 1,
      wonders: [610, 611, 612]
    },
    70: { 
      resource: 2,
      wonders: [700, 701, 702]
    },
    71: { 
      resource: 2,
      wonders: [710, 711, 712]
    }
  };

  var getResource = function(id) {
    return BoardList[id].resource;
  };

  var getWonders = function(id) {
    return BoardList[id].wonders;
  };

  return {
    getResource: getResource,
    getWonders: getWonders
  };
});
