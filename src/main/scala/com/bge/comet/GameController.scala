package com.bge.comet

import scala.util._
import scala.collection.mutable._
import scala.xml.{NodeSeq,Text}
import net.liftweb.actor._
import net.liftweb.http._
import net.liftweb.util.Helpers._
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.json._
import net.liftweb.http.js._
import net.liftweb.http.js.JsCmds._
import JE._
import com.bge.model._
import com.bge.comet._
import com.bge.lib._
	
final case class RegisterGameView(id : Long, view : GameView)
final case class UnregisterGameView(id : Long, view : GameView)
final case class GetUsers(listUsers: List[User])
final case class ReceiveCheckin(who : User)

final case class ReceiveGameController(id : Long, new_controller : GameController)
final case class InitGameView()
//                              num_players : Int,
//                              player_index : Int,
//                              player_names : JsArray,
//                              player_boards : JsArray,
//                              player_hand : JsArray)

object current_game_view extends SessionVar[Box[GameView]](Empty)

class GameController(id : String, numPlayers : Int) extends LiftActor {

  private var mapUserIdGameView : Map[Long, GameView] = Map()

  private var listUsers : List[User] = Nil
  private var listPlayers : List[Player] = Nil
  private val rand : Random = new Random(id.toInt) 
  private var age : Int = 1
  private var round : Int = 1
  private var checkin_count : Int = 0

  private def InitializeGame() = { 
System.err.println("GameController: InitializeGame");
    val deck = numPlayers match {
      case 3 => new Deck3(rand)
      case 4 => new Deck4(rand)
      case 5 => new Deck5(rand)
      case 6 => new Deck6(rand)
      case 7 => new Deck7(rand)
      case _ => new Deck3(rand)
    }
    deck.init()
      
    var board_order = Random.shuffle(List(0, 1, 2, 3, 4, 5, 6))

    listUsers.foreach(usr => listPlayers ::= new Player(usr.primaryKeyField.is)) 
    listPlayers.foreach(player => 
      board_order match {
        case board_id :: remainder =>
          board_order = remainder 
          rand.nextInt(2) match {
            case 0 => player.board.init(BoardType(board_id, "A"))
            case _ => player.board.init(BoardType(board_id, "B"))
          }
        case _ => Empty
      }
    )

    deck.deal(listPlayers, age)

    var i : Int = 0;
    for (i <- 0 until listPlayers.size) {
System.err.println("  Player Id: " + listPlayers(i).getId)
     mapUserIdGameView(listPlayers(i).getId) ! InitGameView()
    }
  }

  override def messageHandler = {

    case RegisterGameView(id : Long, view : GameView) =>
System.err.println("GameController: RegisterGameView")
      mapUserIdGameView(id) = view
      
    case UnregisterGameView(id : Long, view : GameView) =>
      mapUserIdGameView -= id

    case GetUsers(_listUsers : List[User]) =>
System.err.println("GameController: GetUsers")
      listUsers = _listUsers
      if (checkin_count == numPlayers)
        InitializeGame()

    case ReceiveCheckin(who : User) =>
System.err.println("GameController: RecieveCheckin")
      checkin_count += 1
      if (checkin_count == numPlayers && listUsers.size == numPlayers)
        InitializeGame()
  }  
}

class GameView extends CometActor
{
  private var controller : Box[GameController] = Empty

  current_game_view.set(Full(this))

  override def localSetup = { 
System.err.println("GameView: localSetup");

		// This will only be called the first time the page is loaded.
		// Future responses will be initiated with the page's EarlyResponse
		User.currentUser.foreach(usr => MainController ! AskForGameController(this, usr))
    super.localSetup
  }
                                      
  override def localShutdown = { 
    super.localShutdown
  }

  override def lowPriority = {
    case ReceiveGameController(id : Long, new_controller : GameController) =>
System.err.println("GameView: ReceiveGameController");
      controller = Full(new_controller)
      controller.foreach(_ ! RegisterGameView(id, this))

    case InitGameView() =>
System.err.println("InitGameView");
      partialUpdate(Call("window.Game.init", 
        JsObj(
          ("num_players", Num(4)),
          ("player_index", Num(2)),
          ("player_names", JsArray("Abigail", "Barbara", "Charlotte", "Dianora")),
          ("player_boards", JsArray(Num(11), Num(30), Num(51), Num(21))),
          ("player_hand", JsArray(Num(1102), Num(1104), Num(1203), Num(1301), Num(1402), Num(1503), Num(1602)))
        )
      ))
System.err.println("  After partialUpdate");
  }

  def render = "#player_handxxx *" #> List("")
}
