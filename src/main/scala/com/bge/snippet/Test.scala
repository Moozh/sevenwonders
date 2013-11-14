package com.bge.snippet

import scala.xml.{NodeSeq, Text}
import net.liftweb.util.Helpers._
import com.bge.model._

class Test {
  def hello = "#hello *" #> <strong>{Text(User.currentUser.map(_.firstName.is) openOr "")}</strong>
}
