package com.bge.snippet

import scala.xml.{NodeSeq, Text}
import net.liftweb.common.{Box,Full,Empty}
import net.liftweb.util.Helpers._
import net.liftweb.http._
import net.liftweb.http.js._
import net.liftweb.http.js.JsCmds._
import net.liftweb.json._
import JE._
import com.bge.model._
import com.bge.comet._

class AjaxCalls {
  def sendMove(json : Any) = {
    implicit val formats = DefaultFormats;
    val j : JValue = Extraction.decompose(json);
System.err.println("--- Converted to: " + j);
    JsCmds.Noop;

//    current_game_view ! checkMove();
  }

  def render(in : NodeSeq) : NodeSeq = {
    val ajax : JsCmd = SHtml.jsonCall(JsRaw("_json"), sendMove _)._2

    Script(Function("ajaxSendMove", List("_json"), ajax))
  }
}



