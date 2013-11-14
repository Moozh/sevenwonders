package com.bge.lib

import com.bge.lib._
import com.bge.lib.CardType._

final case class BoardType(_id : Int, _side : String)

class Board
{
  var built : Int = 0
  var id : Int = 0
  var side : String = "INIT"
  var listCards : List[Card] = Nil

  def init(boardtype : BoardType) {
    listCards = boardtype match {
      case BoardType(0, "A") =>
                id = 0
                side = "A" 
                new Card(100,
                         "Pyramids A1",
                         Wonder,
                         Nil,
                         List(0, 0, 2, 0, 0, 0, 0, 0)) ::
                new Card(101,
                         "Pyramids A2",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 3, 0, 0, 0, 0)) :: 
                new Card(102,
                         "Pyramids A3",
                         Wonder,
                         Nil,
                         List(0, 0, 4, 0, 0, 0, 0, 0)) :: 
                Nil
      case BoardType(0, "B") =>
                id = 0
                side = "B" 
                new Card(110,
                         "Pyramids B1",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 0, 0, 0, 0)) ::
                new Card(111,
                         "Pyramids B2",
                         Wonder,
                         Nil,
                         List(0, 0, 3, 0, 0, 0, 0, 0)) :: 
                new Card(112,
                         "Pyramids B3",
                         Wonder,
                         Nil,
                         List(3, 0, 0, 0, 0, 0, 0, 0)) :: 
                new Card(113,
                         "Pyramids B4",
                         Wonder,
                         Nil,
                         List(0, 0, 4, 0, 0, 1, 0, 0)) :: 
                Nil    
      case BoardType(1, "A") =>
                id = 1
                side = "A" 
                new Card(200,
                         "Artemis A1",
                         Wonder,
                         Nil,
                         List(0, 0, 2, 0, 0, 0, 0, 0)) ::
                new Card(201,
                         "Artemis A2",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 0, 0, 0, 0)) :: 
                new Card(202,
                         "Artemis A3",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 0, 0, 2, 0, 0)) :: 
                Nil    
      case BoardType(1, "B") =>
                id = 1
                side = "B" 
                new Card(210,
                         "Artemis B1",
                         Wonder,
                         Nil,
                         List(0, 0, 2, 0, 0, 0, 0, 0)) ::
                new Card(211,
                         "Artemis B2",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 0, 0, 0, 0)) :: 
                new Card(212,
                         "Artemis B3",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 0, 1, 1, 1, 0)) :: 
                Nil    
      case BoardType(2, "A") =>
                id = 2
                side = "A" 
                new Card(300,
                         "Zeus A1",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 0, 0, 0, 0)) ::
                new Card(301,
                         "Zeus A2",
                         Wonder,
                         Nil,
                         List(0, 0, 2, 0, 0, 0, 0, 0)) :: 
                new Card(302,
                         "Zeus A3",
                         Wonder,
                         Nil,
                         List(0, 2, 0, 0, 0, 0, 0, 0)) :: 
                Nil    
      case BoardType(2, "B") =>
                id = 2
                side = "B" 
                new Card(310,
                         "Zeus B1",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 0, 0, 0, 0)) ::
                new Card(311,
                         "Zeus B2",
                         Wonder,
                         Nil,
                         List(0, 0, 2, 0, 0, 0, 0, 0)) :: 
                new Card(312,
                         "Zeus B3",
                         Wonder,
                         Nil,
                         List(0, 2, 0, 0, 0, 0, 1, 0)) :: 
                Nil    
      case BoardType(3, "A") =>
                id = 3
                side = "A" 
                new Card(400,
                         "Mausoleum A1",
                         Wonder,
                         Nil,
                         List(2, 0, 0, 0, 0, 0, 0, 0)) ::
                new Card(401,
                         "Mausoleum A2",
                         Wonder,
                         Nil,
                         List(0, 3, 0, 0, 0, 0, 0, 0)) :: 
                new Card(402,
                         "Mausoleum A3",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 0, 0, 0, 2, 0)) :: 
                Nil    
      case BoardType(3, "B") =>
                id = 3
                side = "B" 
                new Card(410,
                         "Mausoleum B1",
                         Wonder,
                         Nil,
                         List(0, 2, 0, 0, 0, 0, 0, 0)) ::
                new Card(411,
                         "Mausoleum B2",
                         Wonder,
                         Nil,
                         List(3, 0, 0, 0, 0, 0, 0, 0)) :: 
                new Card(412,
                         "Mausolem B3",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 0, 1, 1, 1, 0)) :: 
                Nil    
      case BoardType(4, "A") =>
                id = 4
                side = "A" 
                new Card(500,
                         "Lighthouse A1",
                         Wonder,
                         Nil,
                         List(0, 0, 2, 0, 0, 0, 0, 0)) ::
                new Card(501,
                         "Lighthouse A2",
                         Wonder,
                         Nil,
                         List(0, 2, 0, 0, 0, 0, 0, 0)) :: 
                new Card(502,
                         "Lighthouse A3",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 0, 2, 0, 0, 0)) :: 
                Nil    
      case BoardType(4, "B") =>
                id = 4
                side = "B" 
                new Card(510,
                         "Lighthouse B1",
                         Wonder,
                         Nil,
                         List(2, 0, 0, 0, 0, 0, 0, 0)) ::
                new Card(511,
                         "Lighthouse B2",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 0, 0, 0, 0)) :: 
                new Card(512,
                         "Lighthouse B3",
                         Wonder,
                         Nil,
                         List(0, 0, 2, 0, 0, 0, 0, 0)) :: 
                Nil    
      case BoardType(5, "A") =>
                id = 5
                side = "A" 
                new Card(600,
                         "Gardens A1",
                         Wonder,
                         Nil,
                         List(2, 0, 0, 0, 0, 0, 0, 0)) ::
                new Card(601,
                         "Gardens A2",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 3, 0, 0, 0, 0)) :: 
                new Card(602,
                         "Gardens A3",
                         Wonder,
                         Nil,
                         List(4, 0, 0, 0, 0, 0, 0, 0)) :: 
                Nil    
      case BoardType(5, "B") =>
                id = 5
                side = "B" 
                new Card(610,
                         "Gardens B1",
                         Wonder,
                         Nil,
                         List(1, 0, 0, 0, 0, 0, 1, 0)) ::
                new Card(611,
                         "Gardens B2",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 1, 0, 0, 0)) :: 
                new Card(612,
                         "Gardens B3",
                         Wonder,
                         Nil,
                         List(3, 0, 0, 0, 0, 1, 0, 0)) :: 
                Nil    
      case BoardType(6, "A") =>
                id = 6
                side = "A" 
                new Card(700,
                         "Colossus A1",
                         Wonder,
                         Nil,
                         List(0, 0, 0, 2, 0, 0, 0, 0)) ::
                new Card(701,
                         "Colossus A2",
                         Wonder,
                         Nil,
                         List(3, 0, 0, 0, 0, 0, 0, 0)) :: 
                new Card(702,
                         "Colossus A3",
                         Wonder,
                         Nil,
                         List(0, 4, 0, 0, 0, 0, 0, 0)) :: 
                Nil    
      case BoardType(6, "B") =>
                id = 6
                side = "B" 
                new Card(710,
                         "Colossus B1",
                         Wonder,
                         Nil,
                         List(0, 0, 3, 0, 0, 0, 0, 0)) ::
                new Card(711,
                         "Colossus B2",
                         Wonder,
                         Nil,
                         List(0, 4, 0, 0, 0, 0, 0, 0)) :: 
                Nil    
    }
  }  
}
