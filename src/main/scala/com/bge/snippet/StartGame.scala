package com.bge.snippet

import scala.xml.{NodeSeq,Text}
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.http._
import net.liftweb.http.js._
import net.liftweb.http.S._
import net.liftweb.util.Helpers._
import com.bge.model._
import com.bge.comet._

class StartGame {

  def start(xhtml : NodeSeq) : NodeSeq = {
  
    def startGame() : JsCmd = User.currentUser match {
      case Full(usr) =>
        MainController ! StartGame(usr)
        JsCmds.Noop
      case _ => JsCmds.Noop
    }
    
    bind("start", xhtml, 
      "button" -> SHtml.ajaxButton("Start Game", startGame _))
  }
}
