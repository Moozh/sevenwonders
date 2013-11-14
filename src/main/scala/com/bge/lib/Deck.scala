package com.bge.lib

import scala.util._
import com.bge.lib._
import com.bge.lib.CardType._

abstract class Deck(rand : Random) {

  protected var listAge1 : List[Card] = List()
  protected var listAge2 : List[Card] = List()
  protected var listAge3 : List[Card] = List()
  
  protected var listGuilds : List[Card] = List(
    new Card(3704,
             "Spies Guild",
             Purple,
             Nil,
             List(3, 0, 0, 0, 1, 0, 0, 0)),
    new Card(3701,
             "Workers Guild",
             Purple,
             Nil,
             List(1, 2, 1, 1, 0, 0, 0, 0)),
    new Card(3705,
             "Philosophers Guild",
             Purple,
             Nil,
             List(3, 0, 0, 0, 0, 1, 1, 0)),
    new Card(3706,
             "Magistrates Guild",
             Purple,
             Nil,
             List(0, 0, 1, 3, 0, 0, 1, 0)),
    new Card(3703,
             "Traders Guild",
             Purple,
             Nil,
             List(0, 0, 0, 0, 1, 1, 1, 0)),
    new Card(3708,
             "Shipowners Guild",
             Purple,
             Nil,
             List(0, 0, 0, 3, 1, 1, 0, 0)),
    new Card(3702,
             "Craftsmens Guild",
             Purple,
             Nil,
             List(0, 2, 2, 0, 0, 0, 0, 0)),
    new Card(3711,
             "Strategists Guild",
             Purple,
             Nil,
             List(0, 2, 1, 0, 0, 0, 1, 0)),
    new Card(3709,
             "Builders Guild",
             Purple,
             Nil,
             List(2, 0, 2, 0, 1, 0, 0, 0)),
    new Card(3712,
             "Scientists Guild",
             Purple,
             Nil,
             List(0, 2, 0, 2, 0, 1, 0, 0)),
    new Card(3710,
             "Gamers Guild",
             Purple,
             Nil,
             List(0, 2, 0, 2, 0, 1, 0, 0)),
    new Card(3707,
             "Architects Guild",
             Purple,
             Nil,
             List(0, 2, 0, 2, 0, 1, 0, 0))
  )
  
  def shuffle(deck : List[Card]) : List[Card] = {
    Random.shuffle(deck)
  }         

  def deal(listPlayers : List[Player], age : Int) = {
    age match {
      case 1 => 
        listPlayers.foreach(player => listAge1 match {
          case a :: b :: c :: d :: e :: f :: g :: deck =>
            player.getNewHand(a, b, c, d, e, f, g)
            listAge1 = deck
        })
      case 2 => 
        listPlayers.foreach(player => listAge2 match {
          case a :: b :: c :: d :: e :: f :: g :: deck =>
            player.getNewHand(a, b, c, d, e, f, g)
            listAge2 = deck
        })
      case 3 => 
        listPlayers.foreach(player => listAge3 match {
          case a :: b :: c :: d :: e :: f :: g :: deck =>
            player.getNewHand(a, b, c, d, e, f, g)
            listAge3 = deck
        })
    }
  }
  
  def init()
}

class Deck3(rand : Random) extends Deck(rand)
{
  def init() = {
  
    listGuilds = shuffle(listGuilds)
  
    listAge1 = new Card(1104, 
                        "Lumber Yard",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(1101, 
                        "Clay Pool",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1102, 
                        "Ore Vein",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1103, 
                        "Stone Pit",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1105, 
                        "Clay Pit",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 1)) :: 
               new Card(1110, 
                        "Timber Yard",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 1)) :: 
               new Card(1201, 
                        "Glassworks",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1202, 
                        "Press",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1203, 
                        "Loom",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1302,               
                        "East Trading Post",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1301, 
                        "West Trading Post",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1303, 
                        "Marketplace",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1403, 
                        "Stockade",
                        Red, 
                        Nil, 
                        List(0, 0, 0, 1, 0, 0, 0, 0)) :: 
               new Card(1401, 
                        "Guard Tower",
                        Red, 
                        Nil, 
                        List(1, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1402, 
                        "Barracks",
                        Red, 
                        Nil, 
                        List(0, 1, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1502, 
                        "Workshop", // Gear
                        Green, 
                        Nil, 
                        List(0, 0, 0, 0, 1, 0, 0, 0)) :: 
               new Card(1501, 
                        "Scriptorium",
                        Green, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 1, 0, 0)) :: 
               new Card(1503, 
                        "Apothecary",
                        Green, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 1, 0)) :: 
               new Card(1604, 
                        "Baths",
                        Blue, 
                        Nil, 
                        List(0, 0, 1, 0, 0, 0, 0, 0)) :: 
               new Card(1602, 
                        "Theater",
                        Blue, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1601, 
                        "Altar",
                        Blue, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
              listAge1      
              
    listAge2 = new Card(2101,
                        "Brick Yard",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(2103,
                        "Quary",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(2102,
                        "Foundry",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(2104,
                        "Sawmill",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(1201, 
                        "Glassworks",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1202, 
                        "Press",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1203, 
                        "Loom",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(2304,
                        "Forum",
                        Gold,
                        Nil,
                        List(2, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(2303,
                        "Caravansery",
                        Gold,
                        Nil,
                        List(0, 0, 0, 2, 0, 0, 0, 0)) ::
               new Card(2301,
                        "Vineyard",
                        Gold,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(2403,
                        "Archery Range",
                        Red,
                        Nil,
                        List(0, 2, 0, 2, 0, 0, 0, 0)) ::
               new Card(2404,
                        "Walls",
                        Red,
                        Nil,
                        List(0, 0, 3, 0, 0, 0, 0, 0)) ::
               new Card(2401,
                        "Stables",
                        Red,
                        Nil,
                        List(1, 1, 0, 1, 0, 0, 0, 0)) ::
               new Card(2504,
                        "School",
                        Green,
                        Nil,
                        List(0, 0, 0, 1, 0, 1, 0, 0)) ::
               new Card(2503,
                        "Dispensary",
                        Green,
                        Nil,
                        List(0, 2, 0, 0, 1, 0, 0, 0)) ::
               new Card(2501,
                        "Library",
                        Green,
                        Nil,
                        List(0, 0, 2, 0, 0, 0, 1, 0)) ::
               new Card(2502,
                        "Laboratory",
                        Green,
                        Nil,
                        List(2, 0, 0, 0, 0, 1, 0, 0)) ::
               new Card(2602,
                        "Courthouse",
                        Blue,
                        Nil,
                        List(2, 0, 0, 0, 0, 0, 1, 0)) ::
               new Card(2604,
                        "Aqueduct",
                        Blue,
                        Nil,
                        List(0, 0, 3, 0, 0, 0, 0, 0)) ::
               new Card(2603,
                        "Statue",
                        Blue,
                        Nil,
                        List(0, 2, 0, 1, 0, 0, 0, 0)) ::
               new Card(2601,
                        "Temple",
                        Blue,
                        Nil,
                        List(1, 0, 0, 1, 1, 0, 0, 0)) ::
               listAge2
               
    listAge3 = new Card(3301,
                        "Haven",
                        Gold,
                        Nil,
                        List(0, 1, 0, 1, 0, 0, 1, 0)) ::
               new Card(3303,
                        "Lighthouse",
                        Gold,
                        Nil,
                        List(0, 0, 1, 0, 1, 0, 0, 0)) ::
               new Card(3304,
                        "Arena",
                        Gold,
                        Nil,
                        List(0, 1, 2, 0, 0, 0, 0, 0)) ::
               new Card(3402,
                        "Fortifications",
                        Red,
                        Nil,
                        List(0, 3, 1, 0, 0, 0, 0, 0)) ::
               new Card(3401,
                        "Siege Workshop",
                        Red,
                        Nil,
                        List(3, 0, 0, 1, 0, 0, 0, 0)) ::
               new Card(3404,
                        "Arsenal",
                        Red,
                        Nil,
                        List(0, 1, 0, 2, 0, 0, 1, 0)) ::
               new Card(3503,
                        "Lodge",
                        Green,
                        Nil,
                        List(2, 0, 0, 0, 0, 1, 1, 0)) ::
               new Card(3505,
                        "Academy",
                        Green,
                        Nil,
                        List(0, 0, 3, 0, 1, 0, 0, 0)) ::
               new Card(3501,
                        "University",
                        Green,
                        Nil,
                        List(0, 0, 0, 2, 1, 1, 0, 0)) ::
               new Card(3502,
                        "Observatory",
                        Green,
                        Nil,
                        List(0, 2, 0, 0, 1, 0, 1, 0)) ::
               new Card(3504,
                        "Study",
                        Green,
                        Nil,
                        List(0, 0, 0, 1, 0, 1, 1, 0)) ::
               new Card(3603,
                        "Town Hall",
                        Blue,
                        Nil,
                        List(0, 1, 2, 0, 1, 0, 0, 0)) ::
               new Card(3602,
                        "Senate",
                        Blue,
                        Nil,
                        List(0, 1, 1, 2, 0, 0, 0, 0)) ::
               new Card(3601,
                        "Gardens",
                        Blue,
                        Nil,
                        List(2, 0, 0, 1, 0, 0, 0, 0)) ::
               new Card(3605,
                        "Palace",
                        Blue,
                        Nil,
                        List(1, 1, 1, 1, 1, 1, 1, 0)) ::
               new Card(3604,
                        "Pantheon",
                        Blue,
                        Nil,
                        List(2, 1, 0, 0, 1, 1, 1, 0)) ::
               listGuilds(0) :: listGuilds(1) :: listGuilds(2) ::
                 listGuilds(3) :: listGuilds(4) ::
               listAge3
               
    listAge1 = shuffle(listAge1)
    listAge2 = shuffle(listAge2)
    listAge3 = shuffle(listAge3)
  }
}

class Deck4(rand : Random) extends Deck3(rand)
{
  override def init() = {
    super.init()
    listAge1 = new Card(1104,
                        "Lumber Yard",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1102,
                        "Ore Vein",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1106, 
                        "Excavation",
                        Brown, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 1)) :: 
               new Card(1304, 
                        "Tavern",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1401,
                        "Guard Tower",
                        Red, 
                        Nil, 
                        List(1, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1501,
                        "Scriptorium",
                        Green, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 1, 0, 0)) :: 
               new Card(1603, 
                        "Pawnshop",
                        Blue, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               listAge1
               
    listAge2 = new Card(2101,
                        "Brickyard",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(2103,
                        "Quary",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(2102,
                        "Foundry",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(2104,
                        "Sawmill",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(2302,
                        "Bazar",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(2402,
                        "Training Ground",
                        Red, 
                        Nil, 
                        List(0, 2, 0, 1, 0, 0, 0, 0)) :: 
               new Card(2503,
                        "Dispensary",
                        Green,
                        Nil,
                        List(0, 2, 0, 0, 1, 0, 0, 0)) ::
               listAge2

    listAge3 = new Card(3301,
                        "Haven",
                        Gold,
                        Nil,
                        List(0, 1, 0, 1, 0, 0, 1, 0)) ::
               new Card(3302,
                        "Chamber of Commerce",
                        Gold,
                        Nil,
                        List(2, 0, 0, 0, 0, 1, 0, 0)) ::
               new Card(3404,
                        "Arsenal",
                        Red,
                        Nil,
                        List(0, 1, 0, 2, 0, 0, 1, 0)) ::
               new Card(3403,
                        "Circus",
                        Red,
                        Nil,
                        List(0, 1, 3, 0, 0, 0, 0, 0)) ::
               new Card(3501,
                        "University",
                        Green,
                        Nil,
                        List(0, 0, 0, 2, 1, 1, 0, 0)) ::
               new Card(3601,
                        "Gardens",
                        Blue,
                        Nil,
                        List(2, 0, 0, 1, 0, 0, 0, 0)) ::
               listGuilds(5) ::
               listAge3

    listAge1 = shuffle(listAge1)
    listAge2 = shuffle(listAge2)
    listAge3 = shuffle(listAge3)
  }
}

class Deck5(rand : Random) extends Deck4(rand)
{
  override def init() = {
    super.init()
    listAge1 = new Card(1101,
                        "Clay Pool",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(1103,
                        "Stone Pit",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(1109,
                        "Forest Cave",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(1304,
                        "Tavern",
                        Gold,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(1402,
                        "Barracks",
                        Red,
                        Nil,
                        List(0, 1, 0, 0, 0, 0, 0, 0)) ::
               new Card(1503,
                        "Apothecary",
                        Green,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 1, 0)) ::
               new Card(1601,
                        "Altar",
                        Blue,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               listAge1
               
    listAge2 = new Card(1201, 
                        "Glassworks",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1202, 
                        "Press",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1203, 
                        "Loom",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(2303,
                        "Caravansery",
                        Gold,
                        Nil,
                        List(0, 0, 0, 2, 0, 0, 0, 0)) ::
               new Card(2401,
                        "Stables",
                        Red,
                        Nil,
                        List(1, 1, 0, 1, 0, 0, 0, 0)) ::
               new Card(2502,
                        "Laboratory",
                        Green,
                        Nil,
                        List(2, 0, 0, 0, 0, 1, 0, 0)) ::
               new Card(2602,
                        "Courthouse",
                        Blue,
                        Nil,
                        List(2, 0, 0, 0, 0, 0, 1, 0)) ::
               listAge2

    listAge3 = new Card(3304,
                        "Arena",
                        Gold,
                        Nil,
                        List(0, 1, 2, 0, 0, 0, 0, 0)) ::
               new Card(3403,
                        "Circus",
                        Red,
                        Nil,
                        List(0, 1, 3, 0, 0, 0, 0, 0)) ::
               new Card(3401,
                        "Siege Workshop",
                        Red,
                        Nil,
                        List(3, 0, 0, 1, 0, 0, 0, 0)) ::
               new Card(3504,
                        "Study",
                        Green,
                        Nil,
                        List(0, 0, 0, 1, 0, 1, 1, 0)) ::
               new Card(3603,
                        "Town Hall",
                        Blue,
                        Nil,
                        List(0, 1, 2, 0, 1, 0, 0, 0)) ::
               new Card(3602,
                        "Senate",
                        Blue,
                        Nil,
                        List(0, 1, 1, 2, 0, 0, 0, 0)) ::
               listGuilds(6) ::
               listAge3

    listAge1 = shuffle(listAge1)
    listAge2 = shuffle(listAge2)
    listAge3 = shuffle(listAge3)
  }
}

class Deck6(rand : Random) extends Deck5(rand)
{
  override def init() = {
    super.init()
    listAge1 = new Card(1107,
                        "Tree Farm",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(1108,
                        "Mine",
                        Brown,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 1)) ::
               new Card(1201, 
                        "Glassworks",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1202, 
                        "Press",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1203, 
                        "Loom",
                        Grey, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1303, 
                        "Marketplace",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1602, 
                        "Theater",
                        Blue, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               listAge1
               
    listAge2 = new Card(2304,
                        "Forum",
                        Gold,
                        Nil,
                        List(2, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(2303,
                        "Caravansery",
                        Gold,
                        Nil,
                        List(0, 0, 0, 2, 0, 0, 0, 0)) ::
               new Card(2301,
                        "Vineyard",
                        Gold,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(2403,
                        "Archery Range",
                        Red,
                        Nil,
                        List(0, 2, 0, 2, 0, 0, 0, 0)) ::
               new Card(2402,
                        "Training Ground",
                        Red, 
                        Nil, 
                        List(0, 2, 0, 1, 0, 0, 0, 0)) :: 
               new Card(2501,
                        "Library",
                        Green,
                        Nil,
                        List(0, 0, 2, 0, 0, 0, 1, 0)) ::
               new Card(2601,
                        "Temple",
                        Blue,
                        Nil,
                        List(1, 0, 0, 1, 1, 0, 0, 0)) ::
               listAge2               

    listAge3 = new Card(3303,
                        "Lighthouse",
                        Gold,
                        Nil,
                        List(0, 0, 1, 0, 1, 0, 0, 0)) ::
               new Card(3302,
                        "Chamber of Commerce",
                        Gold,
                        Nil,
                        List(2, 0, 0, 0, 0, 1, 0, 0)) ::
               new Card(3403,
                        "Circus",
                        Red,
                        Nil,
                        List(0, 1, 3, 0, 0, 0, 0, 0)) ::
               new Card(3503,
                        "Lodge",
                        Green,
                        Nil,
                        List(2, 0, 0, 0, 0, 1, 1, 0)) ::
               new Card(3603,
                        "Town Hall",
                        Blue,
                        Nil,
                        List(0, 1, 2, 0, 1, 0, 0, 0)) ::
               new Card(3604,
                        "Pantheon",
                        Blue,
                        Nil,
                        List(2, 1, 0, 0, 1, 1, 1, 0)) ::
               listGuilds(7) ::
               listAge3

    listAge1 = shuffle(listAge1)
    listAge2 = shuffle(listAge2)
    listAge3 = shuffle(listAge3)
  }
}

class Deck7(rand : Random) extends Deck6(rand)
{
  override def init() = {
    super.init()
    listAge1 = new Card(1302,               
                        "East Trading Post",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1301, 
                        "West Trading Post",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(1304,
                        "Tavern",
                        Gold,
                        Nil,
                        List(0, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(1403, 
                        "Stockade",
                        Red, 
                        Nil, 
                        List(0, 0, 0, 1, 0, 0, 0, 0)) :: 
               new Card(1502, 
                        "Workshop",
                        Green, 
                        Nil, 
                        List(0, 0, 0, 0, 1, 0, 0, 0)) :: 
               new Card(1604, 
                        "Baths",
                        Blue, 
                        Nil, 
                        List(0, 0, 1, 0, 0, 0, 0, 0)) :: 
               new Card(1603, 
                        "Pawnshop",
                        Blue, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               listAge1
               
    listAge2 = new Card(2304,
                        "Forum",
                        Gold,
                        Nil,
                        List(2, 0, 0, 0, 0, 0, 0, 0)) ::
               new Card(2302,
                        "Bazar",
                        Gold, 
                        Nil, 
                        List(0, 0, 0, 0, 0, 0, 0, 0)) :: 
               new Card(2404,
                        "Walls",
                        Red,
                        Nil,
                        List(0, 0, 3, 0, 0, 0, 0, 0)) ::
               new Card(2402,
                        "Training Ground",
                        Red, 
                        Nil, 
                        List(0, 2, 0, 1, 0, 0, 0, 0)) :: 
               new Card(2504,
                        "School",
                        Green,
                        Nil,
                        List(0, 0, 0, 1, 0, 1, 0, 0)) ::
               new Card(2604,
                        "Aqueduct",
                        Blue,
                        Nil,
                        List(0, 0, 3, 0, 0, 0, 0, 0)) ::
               new Card(2603,
                        "Statue",
                        Blue,
                        Nil,
                        List(0, 2, 0, 1, 0, 0, 0, 0)) ::
               listAge2                              

    listAge3 = new Card(3304,
                        "Arena",
                        Gold,
                        Nil,
                        List(0, 1, 2, 0, 0, 0, 0, 0)) ::
               new Card(3402,
                        "Fortifications",
                        Red,
                        Nil,
                        List(0, 3, 1, 0, 0, 0, 0, 0)) ::
               new Card(3404,
                        "Arsenal",
                        Red,
                        Nil,
                        List(0, 1, 0, 2, 0, 0, 1, 0)) ::
               new Card(3505,
                        "Academy",
                        Green,
                        Nil,
                        List(0, 0, 3, 0, 1, 0, 0, 0)) ::
               new Card(3502,
                        "Observatory",
                        Green,
                        Nil,
                        List(0, 2, 0, 0, 1, 0, 1, 0)) ::
               new Card(3605,
                        "Palace",
                        Blue,
                        Nil,
                        List(1, 1, 1, 1, 1, 1, 1, 0)) ::
               listGuilds(8) ::
               listAge3

    listAge1 = shuffle(listAge1)
    listAge2 = shuffle(listAge2)
    listAge3 = shuffle(listAge3)
  }
}
