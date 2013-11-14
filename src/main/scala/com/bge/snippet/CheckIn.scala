package com.bge.snippet

import scala.xml.{NodeSeq, Text}
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.util.Helpers._
import net.liftweb.http._
import net.liftweb.http.js._
import net.liftweb.http.js.JsCmds._
import JE._
import com.bge.model._
import com.bge.comet._

class CheckIn {
  def render = {
    def checkIn() = User.currentUser match {
      case Full(usr) =>
        MainController ! CheckIn(usr)
      case _ => {}
    }
  
    Script(OnLoad(SHtml.ajaxInvoke(checkIn _)._2));
  }
}

