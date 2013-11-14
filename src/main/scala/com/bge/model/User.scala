package com.bge.model

import net.liftweb.common.{Full,Box,Empty,Failure}
import net.liftweb.mapper._
import net.liftweb.actor._
import net.liftweb.sitemap.Loc._
import scala.xml.{NodeSeq,Node}
import com.bge.comet._

object User extends User
    with KeyedMetaMapper[Long, User]
    with MetaMegaProtoUser[User] {

  override def dbTableName = "users"
  override val basePath = "account" :: Nil
  override def skipEmailValidation = true
  
  override def screenWrap: Box[Node] = Full(
    <lift:surround with="default" at="content">
      <div id="box1" class="topbg">
        <lift:msgs showAll="true" />
        <lift:bind />
      </div>
    </lift:surround>
  )
  
  override def logUserIn(who: User) {
    super.logUserIn(who)
    MainController ! AddUser(who)
  }
  
  override def logUserOut() {
    currentUser.foreach(usr => MainController ! RemoveUser(usr)); 
    super.logUserOut()
  }
  
}

class User extends MegaProtoUser[User] with CreatedUpdated {
  def getSingleton = User
}
