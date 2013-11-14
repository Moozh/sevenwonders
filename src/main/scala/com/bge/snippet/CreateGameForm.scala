package com.bge.snippet

import scala.xml.{NodeSeq,Text}
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.http._
import net.liftweb.http.S._
import net.liftweb.util.Helpers._
import com.bge.model._
import com.bge.comet._

class CreateGameForm {

  def create(xhtml : NodeSeq) : NodeSeq = {
  
    def createGame() = User.currentUser match {
      case Full(usr) =>
        MainController ! CreateLobby(usr)
        redirectTo("lobby")
      case _ => {}
    }
    
    bind("create", xhtml, 
      "submit" -> SHtml.submit("Create Game", createGame))
  }
}
