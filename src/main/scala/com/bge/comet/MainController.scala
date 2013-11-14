package com.bge.comet

import scala.xml.{NodeSeq,Text}
import net.liftweb.actor._
import net.liftweb.http._
import net.liftweb.util.Helpers._
import net.liftweb.common.{Box,Full,Empty}
import scala.collection.mutable._
import com.bge.model._
import com.bge.comet._
import com.bge.lib._

final case class AddUser(who: User)
final case class RemoveUser(who: User)
final case class ReturnHome(who: User)
final case class CreateLobby(who: User)
final case class JoinLobby(who: User, id: String)
final case class RemoveLobby(lobby: LobbyController)
final case class AskForLobbyController(view : LobbyUserListView, who : User)
final case class AskForGameController(view : GameView, who : User)
final case class StartGame(who : User)
final case class MoveUsersToGame(id : String, setUsers : Set[User])
final case class CheckIn(who : User)

object MainController extends LiftActor {

  private var setUsersHome:         Set[User]                    = Set()
  private var setLobbies:           Set[LobbyController]         = Set()
  private var setGames:             Set[GameController]          = Set()
  private var mapUserIdLobbyId:     Map[Long, String]            = Map()
  private var mapIdLobby:           Map[String, LobbyController] = Map()
  private var mapLobbyIdNumPlayers: Map[String, Int]             = Map()
  private var mapUserIdGameId:      Map[Long, String]            = Map()
  private var mapIdGame:            Map[String, GameController]  = Map()
  
  private var unique_id : Int = 0

  override def messageHandler = {
  
    case AddUser(who : User) => 
      setUsersHome += who
      HomeController ! UpdateUserList(setUsersHome.toList)
      
    case RemoveUser(who : User) =>
      setUsersHome -= who
      HomeController ! UpdateUserList(setUsersHome.toList)
    
    case ReturnHome(who : User) =>
			// User entering Home
      setUsersHome += who
      HomeController ! UpdateUserList(setUsersHome.toList)

			// User leaving Lobby
			// 	Need try in case user is not in a lobby
			try {
	      val lobby_id = mapUserIdLobbyId(who.primaryKeyField.is)
		    val lobby = mapIdLobby(lobby_id)
		    val size = lobby.numPlayers()
		    lobby ! RemoveLobbyUser(who)
        mapLobbyIdNumPlayers(lobby_id) = mapLobbyIdNumPlayers(lobby_id) - 1
		    mapUserIdLobbyId -= who.primaryKeyField.is
		    if (size == 1) {
		      mapIdLobby -= lobby_id
		      setLobbies -= lobby
		      HomeController ! UpdateLobbyList(setLobbies.toList)
				}
			}	catch {
				case e: Exception => () // System.out.println("User not in a lobby")
			}
    
    case CreateLobby(who : User) => 
      unique_id = unique_id + 1
      val lobby_id : String = unique_id.toString()      

      mapIdLobby(lobby_id) = new LobbyController(lobby_id, who)
      mapLobbyIdNumPlayers(lobby_id) = 1
      mapUserIdLobbyId(who.primaryKeyField.is) = lobby_id
      setLobbies += mapIdLobby(lobby_id)
      setUsersHome -= who
System.err.println("CreateLobby id: " + lobby_id + ", numPlayers: " + mapLobbyIdNumPlayers(lobby_id)) 
      HomeController ! UpdateUserList(setUsersHome.toList)
      HomeController ! UpdateLobbyList(setLobbies.toList)
      mapIdLobby(lobby_id) ! AddLobbyUser(who)
    
    case JoinLobby(who : User, lobby_id : String) => 
      mapUserIdLobbyId(who.primaryKeyField.is) = lobby_id
      mapLobbyIdNumPlayers(lobby_id) = mapLobbyIdNumPlayers(lobby_id) + 1
      setUsersHome -= who
      HomeController ! UpdateUserList(setUsersHome.toList)
      mapIdLobby(lobby_id) ! AddLobbyUser(who)
    
    case RemoveLobby(lobby : LobbyController) => 
      mapIdLobby -= lobby.getId
      mapLobbyIdNumPlayers -= lobby.getId
      setLobbies -= lobby
      HomeController ! UpdateLobbyList(setLobbies.toList)
    
    case AskForLobbyController(view : LobbyUserListView, who : User) => 
      view ! ReceiveLobbyController(mapIdLobby(mapUserIdLobbyId(who.primaryKeyField.is)))
      
    case AskForGameController(view : GameView, who : User) => 
      view ! ReceiveGameController(who.primaryKeyField.is, mapIdGame(mapUserIdGameId(who.primaryKeyField.is)))

    case StartGame(who : User) =>
      try {
        val id = mapUserIdLobbyId(who.primaryKeyField.is) 
System.err.println("StartGame lobby_id: " + id + ", numPlayers: " + mapLobbyIdNumPlayers(id))
        mapIdGame(id) = new GameController(id, mapLobbyIdNumPlayers(id))
        mapLobbyIdNumPlayers -= id
        setLobbies -= mapIdLobby(id)
        setGames += mapIdGame(id)
        HomeController ! UpdateLobbyList(setLobbies.toList)
        mapIdLobby(id) ! LobbyStartGame()
      } catch {
        case e: Exception => ()
      }
      
    case MoveUsersToGame(id : String, setUsers : Set[User]) =>
      setUsers.foreach(usr => {
                        mapUserIdLobbyId -= usr.primaryKeyField.is
                        mapUserIdGameId(usr.primaryKeyField.is) = id

                      })
      mapIdGame(id) ! GetUsers(setUsers.toList)

    case CheckIn(who : User) =>
      mapIdGame(mapUserIdGameId(who.primaryKeyField.is)) ! ReceiveCheckin(who)
  }  
}
