package com.bge.snippet

import scala.xml.{NodeSeq,Text}
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.http._
import net.liftweb.http.S._
import net.liftweb.util.Helpers._
import com.bge.model._
import com.bge.comet._

class StartGameForm {

  def start(xhtml : NodeSeq) : NodeSeq = {
  
    def startGame() = User.currentUser match {
      case Full(usr) =>
        MainController ! StartGame(usr)
//        redirectTo("game")
      case _ => {}
    }
    
    bind("start", xhtml, 
      "submit" -> SHtml.submit("Start Game", startGame))
  }
}
