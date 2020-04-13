package api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mappings.JsonMappings
import models.MenstrualCycleModels.InitialCycle
import repositories.TokenRepository
import repositories.dao.{MenstrualDao, UserDao}
import spray.json._

import scala.concurrent.ExecutionContext.Implicits.global

trait MenstrualApi extends TokenRepository with JsonMappings {


  val menstrual: Route =
    // authenticated urls
    authenticated(claims => {

      (path("menstrual_init") & post) {
        entity(as[InitialCycle])(cycle => {
            complete(
              MenstrualDao.initialCycle(cycle, claims("id").toLong)
                .flatMap( _ =>
                  UserDao.findUserWCycle(claims("email")).map(_.toJson)
                )
            )
          }
        )
      }

    })

}
