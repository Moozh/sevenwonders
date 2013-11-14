package com.bge.comet

import scala.xml.{NodeSeq,Text}
import net.liftweb.actor._
import net.liftweb.http._
import net.liftweb.util.Helpers._
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.http.js.JsCmds.{Alert,Script,RedirectTo}
import scala.collection.mutable._
import com.bge.model._
import com.bge.comet._

final case class RegisterLobbyUserListView(view : LobbyUserListView)
final case class UnregisterLobbyUserListView(view : LobbyUserListView)
final case class AddLobbyUser(who: User)
final case class RemoveLobbyUser(who: User)
final case class LobbyStartGame()

final case class ReceiveLobbyController(new_controller : LobbyController)
final case class MoveToGame()

object current_lobby_view extends SessionVar[Box[LobbyUserListView]](Empty)
// object current_lobby_controller extends SessionVar[Box[LobbyController]](Empty)

class LobbyController(id : String, owner : User) extends LiftActor {

  private var setLobbyUserListViews: Set[LobbyUserListView] = Set()
  private var setUsers: Set[User] = Set()

  def getId() = id  
  def getOwner() = owner
  def numPlayers() = setUsers.size
  
  override def messageHandler = {

    case RegisterLobbyUserListView(view : LobbyUserListView) =>
      setLobbyUserListViews += view
      sendUpdateUserList
      
    case UnregisterLobbyUserListView(view : LobbyUserListView) =>
      setLobbyUserListViews -= view
      sendUpdateUserList

    case AddLobbyUser(who) => 
      setUsers += who
      sendUpdateUserList
    
    case RemoveLobbyUser(who) => 
      setUsers -= who
      current_lobby_view.foreach(clv => this ! UnregisterLobbyUserListView(clv))
      sendUpdateUserList
      
    case LobbyStartGame() =>
      setLobbyUserListViews.foreach(_ ! MoveToGame())
      MainController ! MoveUsersToGame(getId(), setUsers)
  }
  
  def sendUpdateUserList = {
    setLobbyUserListViews.foreach(_ ! setUsers.toList.map(u => u.firstName.is))
  }
}

class LobbyUserListView extends CometActor 
{
  private var names: List[String] = Nil
  private var controller : Box[LobbyController] = Empty
  
  override def lifespan = Full(1 minutes)

  current_lobby_view.set(Full(this))
  
  override def localSetup = { 
		// This will only be called the first time the page is loaded.
		// Future responses will be initiated with the page's EarlyResponse
System.err.println("Lobby localSetup")
		User.currentUser.foreach(usr => MainController ! AskForLobbyController(this, usr))
    super.localSetup
  }
                                      
  override def localShutdown = { 
//    User.currentUser.foreach(usr => MainController ! RemoveUser(usr)) 
    controller.foreach(_ ! UnregisterLobbyUserListView(this))
    super.localShutdown
  }
  
  override def lowPriority = {
    case ReceiveLobbyController(new_controller : LobbyController) =>
      controller = Full(new_controller)
      controller.foreach(_ ! RegisterLobbyUserListView(this))
      
    case MoveToGame() => {
System.err.println("RedirectTo")
      partialUpdate(RedirectTo("/game"))
    }
  
    case l: List[String] => names = l; reRender()
  }
  
  def render = "li *" #> names               
}
