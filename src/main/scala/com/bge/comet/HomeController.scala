package com.bge.comet

import scala.xml.{NodeSeq,Text}
import net.liftweb.actor._
import net.liftweb.http._
import net.liftweb.util.Helpers._
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.http.js._
import net.liftweb.http.js.JsCmds._
import JE.{JsRaw,Str}
import com.bge.model._

final case class RegisterUserListView(view: HomeUserListView)
final case class RegisterLobbyListView(view: HomeLobbyListView)
final case class UnregisterUserListView(view: HomeUserListView)
final case class UnregisterLobbyListView(view: HomeLobbyListView)
final case class UpdateUserList(users: List[User])
final case class UpdateLobbyList(users: List[LobbyController])

object HomeController extends LiftActor 
{
  private var listUserListViews: List[HomeUserListView] = Nil
  private var listUsers: List[User] = Nil
  
  private var listLobbyListViews: List[HomeLobbyListView] = Nil
  private var listLobbies: List[LobbyController] = Nil
  
  override def messageHandler = {
    case RegisterUserListView(view : HomeUserListView) =>
      listUserListViews ::= view
      sendUpdateUserList
      
    case UnregisterUserListView(view : HomeUserListView) =>
      listUserListViews = listUserListViews.filter(_ ne view)
      sendUpdateUserList
  
    case RegisterLobbyListView(view : HomeLobbyListView) =>
      listLobbyListViews ::= view
      sendUpdateLobbyList
      
    case UnregisterLobbyListView(view  : HomeLobbyListView) =>
      listLobbyListViews = listLobbyListViews.filter(_ ne view)
      sendUpdateLobbyList
  
    case UpdateUserList(users : List[User]) => 
        listUsers = users
        sendUpdateUserList
       
    case UpdateLobbyList(lobbies : List[LobbyController]) => 
        listLobbies = lobbies
        sendUpdateLobbyList

  }

  def sendUpdateUserList = {
    listUserListViews.foreach(_ ! listUsers.map(u => u.firstName.is))
  }
  
  def sendUpdateLobbyList = {
    listLobbyListViews.foreach(_ ! listLobbies)
  }

}

class HomeUserListView extends CometActor 
{
  private var names: List[String] = Nil
  
  override def lifespan = Full(1 minutes)
  
  override def localSetup = { 
    super.localSetup
//    User.currentUser.foreach(usr => MainController ! AddUser(usr)) 
    HomeController ! RegisterUserListView(this)
  }
                                      
  override def localShutdown = { 
    User.currentUser.foreach(usr => MainController ! RemoveUser(usr)) 
    HomeController ! UnregisterUserListView(this)
    super.localShutdown
  }
  
  override def lowPriority = {
    case l: List[String] => names = l; reRender()
  }
  
  def render = "li *" #> names
}


class HomeLobbyListView extends CometActor 
{
  private var lobbies: List[LobbyController] = Nil
  
  override def lifespan = Full(1 minutes)
  
  override def localSetup = { 
    super.localSetup
    HomeController ! RegisterLobbyListView(this)
  }
                                      
  override def localShutdown = { 
    HomeController ! UnregisterLobbyListView(this)
    super.localShutdown
  }
  
  override def lowPriority = {
    case l: List[LobbyController] => lobbies = l; reRender()
  }
  
  def joinLobby(id: String) = {
    User.currentUser match {
      case Full(usr) =>
        MainController ! JoinLobby(usr, id)
        JsCmds.RedirectTo("/lobby")
      case _ => 
        JsCmds.Noop
    }
  }

  def render = "li" #> { lobbies.map(lobby => {
                             "li *"         #> { lobby.getOwner.firstName.is + "'s Game" } &
                             "li [id]"      #> Text(lobby.getId) &
                             "li [onclick]" #> Text(SHtml.ajaxCall(Str(lobby.getId), joinLobby _)._2.toJsCmd)
                           })
                         }

}
