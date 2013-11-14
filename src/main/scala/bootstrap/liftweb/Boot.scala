package bootstrap.liftweb

import net.liftweb._
import net.liftweb.common.{Full,Box,Empty,Failure}
import http.{LiftRules, NotFoundAsTemplate, ParsePath, RedirectResponse}
import sitemap.{SiteMap, Menu, Loc}
import sitemap.Loc._
import util.{ NamedPF }
import net.liftweb.util.{Helpers,Props}
import net.liftweb.mapper.{MapperRules,DefaultConnectionIdentifier,
  DBLogEntry,DB,Schemifier,StandardDBVendor}
import net.liftweb.common.{Full,Box,Empty,Failure}
import com.bge.model._
import com.bge.comet._

class Boot {
  def boot {
  
    // where to search snippet
    LiftRules.addToPackages("com.bge")


    // handle JNDI not being avalible
    if (!DB.jndiJdbcConnAvailable_?){
      DB.defineConnectionManager(DefaultConnectionIdentifier, Database)
      LiftRules.unloadHooks.append(() => Database.closeAllConnections_!()) 
    }
    
    // automatically create the tables
    if(Props.devMode)
      Schemifier.schemify(true, Schemifier.infoF _, 
        User)
    
    // build sitemap
    val entries = List(
      Menu("Home") / "index" >>
        EarlyResponse(() =>
          User.currentUser match {
            case Full(usr) =>
              MainController ! ReturnHome(usr)
								// Currently redundant
//              MainController ! AddUser(usr)
              Empty
            case _ => Empty
          }),
      Menu("Lobby") / "lobby" >> Hidden >>
        TestAccess(() => User.currentUser.choice(_ => Empty)
          (Full(RedirectResponse("index")))) >>
				EarlyResponse(() => {
System.err.println("Lobby EarlyResponse")
					User.currentUser match {
						case Full(usr) =>
							current_lobby_view.foreach(clv => MainController ! AskForLobbyController(clv, usr))
							Empty
						case _ => 
							Empty}
					}),
      Menu("Game") / "game" >> Hidden >>
        EarlyResponse(() => { System.err.println("Game EarlyResponse"); Empty})
//        TestAccess(() => User.currentUser.choice(_ => Empty)
//          (Full(RedirectResponse("index"))))
    ) ::: User.menus
   
    LiftRules.uriNotFound.prepend(NamedPF("404handler") {
      case (req,failure) => NotFoundAsTemplate(
        ParsePath(List("exceptions","404"),"html",false,false))
    })
    
    LiftRules.setSiteMap(SiteMap(entries:_*))
    
    // set character encoding
    LiftRules.early.append(_.setCharacterEncoding("UTF-8"))
        
    // Enable User logged-in testing
    LiftRules.loggedInTest = Full(() => User.loggedIn_?)
  }
  
  object Database extends StandardDBVendor(
    Props.get("db.class").openOr("org.h2.Driver"),
    Props.get("db.url").openOr("jdbc:h2:database/chapter_11;FILE_LOCK=NO"),
    Props.get("db.user"),
    Props.get("db.pass"))
    
  /* Testing */
}
