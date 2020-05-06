package api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mappings.JsonMappings
import repositories.TokenRepository
import repositories.dao.SharedUsersDao
import spray.json._

import scala.concurrent.ExecutionContext


// TODO:Add get_cycle_info route
trait SharedUserApi extends TokenRepository with JsonMappings {

  def sharedUser(implicit executor:ExecutionContext):Route = {

    authenticated (claims => {

      // All users that can view your calendar if they accept the request
      (path("shared_users"/"with_access") & get){
        complete(
          SharedUsersDao.get_shared_users(claims("id").toLong).map(_.toJson)
        )
      } ~ // All users you can view there calendar
      (path("shared_users"/"accessible") & get){
        complete(
          SharedUsersDao.get_shared_with_me(claims("id").toLong)
        )
      } // Give access on approval to you calendar
      (path("shared_users"/"add"/LongNumber) & post){ record_id =>
        
        complete(
          SharedUsersDao.add_shared_user(record_id, claims("id").toLong)
            .flatMap(_ =>
              SharedUsersDao.get_shared_users(claims("id").toLong).map(_.toJson)
            )
        )

      } ~ // Revoke access to yourself from a calendar shared with you
      (path("shared_users"/"revoke_me"/LongNumber) & delete){ record_id =>
        complete(
          SharedUsersDao.remove_shared_with_me(record_id, claims("id").toLong)
            .flatMap( _ =>
              SharedUsersDao.get_shared_with_me(claims("id").toLong).map(_.toJson)
            )
        )
      } ~ // Revoke access to your calendar
      (path("shared_users"/"revoke"/LongNumber) & delete){ record_id =>
        complete(
          SharedUsersDao.remove_shared_user(record_id, claims("id").toLong)
            .flatMap( _ =>
              SharedUsersDao.get_shared_users(record_id).map(_.toJson)
            )
        )
      } ~ // Get all unapproved calendar share request
      (path("shared_users"/"unapproved") & get) {
        complete(
          SharedUsersDao.get_unapproved_requests(claims("id").toLong)
            .flatMap(_ =>
              SharedUsersDao.get_shared_with_me(claims("id").toLong)
            )
        )
      } ~ // Approve shared request
      (path("shared_users"/"approve"/LongNumber) & post ) { record_id =>
        complete(
          SharedUsersDao.approve_shared_request(record_id, claims("id").toLong)
            .flatMap(_ => 
              SharedUsersDao.get_shared_with_me(claims("id").toLong).map(_.toJson)
            )
        )
      } ~ // Get cycle Info of target shared user
      (path("shared_users"/"cycles"/LongNumber ) & get) { record_id =>
        complete(
          SharedUsersDao.get_cycle_info(record_id, claims("id").toLong)
            .map(_.toJson)
        )
      }

    })

  }

}
