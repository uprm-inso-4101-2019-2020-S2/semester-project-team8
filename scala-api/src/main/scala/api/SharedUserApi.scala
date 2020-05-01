package api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mappings.JsonMappings
import models.SharedUsersModels.AddSharedUser
import repositories.TokenRepository
import repositories.dao.SharedUsersDao
import spray.json._

import scala.concurrent.ExecutionContext

trait SharedUserApi extends TokenRepository with JsonMappings {

  def sharedUser(implicit executor:ExecutionContext):Route = {

    authenticated (claims => {

      (path("shared_users") & get){
        complete(
          SharedUsersDao.get_shared_users(claims("id").toLong).map(_.toJson)
        )
      } ~
      (path("shared_users"/"add") & post){
        entity(as[AddSharedUser]){ sh =>
          complete(
            SharedUsersDao.add_shared_user(sh, claims("id").toLong)
              .flatMap(_ =>
                SharedUsersDao.get_shared_users(claims("id").toLong).map(_.toJson)
              )
          )
        }
      }

    })

  }

}
