package api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mappings.JsonMappings
import repositories.TokenRepository
import repositories.dao.UserDao
import spray.json._

import scala.concurrent.ExecutionContext.Implicits.global

trait UsersApi extends TokenRepository with JsonMappings{

  val users:Route =
    // authenticated urls
    authenticated (claims => {

      (path("user") & get) {
        complete(
          UserDao.findUserWCycle(claims.getOrElse("email", "")).map(_.toJson)
        )
      }

    })

}
