package com.bge.lib

import scala.collection.mutable._

object CardType extends Enumeration {
     type CardType = Value
     val Brown, Grey, Gold, Red, Green, Blue, Purple, Wonder = Value
}
import CardType._

// Cost Order: Clay, Ore, Stone, Wood, Glass, Paper, Silk, Gold

class Card(val id : Int, val name : String, val color : CardType, val successors : List[Int], val cost : List[Int])
{

}

