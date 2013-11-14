package com.bge.lib

import scala.util._
import scala.collection.mutable._
import com.bge.lib._

class Player(private val id : Long) 
{
  val board       : Board = new Board()
  var listHand    : List[Card] = Nil
  var listCards   : List[Card] = Nil
  var listRes     : List[Int]  = List(0, 0, 0, 0, 0, 0, 0, 3)
  var listGoldRes : List[Int]  = List(0, 0, 0, 0, 0, 0, 0, 0)
  var leftBrown   : Int = 2
  var rightBrown  : Int = 2
  var leftGrey    : Int = 2
  var rightGrey   : Int = 2
  var strength    : Int = 0
  var wonderNum   : Int = 0

  def getId() : Long = { return id }

  def getNewHand(a : Card, b : Card, c : Card, d : Card, e : Card, f : Card, g : Card) = {
    listHand = List(a, b, c, d, e, f, g)
  }
}
