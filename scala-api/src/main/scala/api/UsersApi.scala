package api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mappings.JsonMappings
import repositories.TokenRepository
import repositories.dao.UserDao
import spray.json._

import scala.concurrent.ExecutionContext

trait UsersApi extends TokenRepository with JsonMappings{

  def users(implicit executor:ExecutionContext):Route =
    // authenticated urls
    /*
    
    */
    authenticated (claims => {

      (path("user") & get) {
        complete(
          UserDao.findUserWCycle(claims("email")).map(_.toJson)
        )
      } ~
      (path("user"/"all") & get){
        complete(
          UserDao.findAll().map(_.toJson)
        )
      } ~
      (path("user"/ Segment) & get){ email: String =>
        complete(
          UserDao.search_user(email, claims("id").toLong).map(_.toJson)
        )
      }

    })

}
