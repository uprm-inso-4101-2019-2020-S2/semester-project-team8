package api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mappings.JsonMappings
import models.MenstrualCycleModels.{AddCycle, InitialCycle, UpdateCycle}
import repositories.TokenRepository
import repositories.dao.{MenstrualDao, UserDao}
import spray.json._

import scala.concurrent.ExecutionContext

trait MenstrualApi extends TokenRepository with JsonMappings {


  def menstrual(implicit executor:ExecutionContext): Route =
    // authenticated urls
    authenticated(claims => {

      (path("menstrual"/"init") & post) {
        entity(as[InitialCycle])(cycle => {
            complete(
              MenstrualDao.initialCycle(cycle, claims("id").toLong)
                .flatMap( _ =>
                  UserDao.findUserWCycle(claims("email")).map(_.toJson)
                )
            )
          }
        )
      } ~
      (path("menstrual"/"add_period") & post) {
        entity(as[AddCycle])(cycle => {
          complete(
            MenstrualDao.add_period(cycle, claims("id").toLong)
              .flatMap( _ =>
                UserDao.findUserWCycle(claims("email")).map(_.toJson)
              )
          )
        })
      } ~
      (path("menstrual") & get){
        complete(
          MenstrualDao.findAll(claims("id").toLong).map(_.toJson)
        )
      } ~
      (path("menstrual"/"update") & put ){
        entity(as[UpdateCycle])(cycle => {
          complete(
            MenstrualDao.update_cycle(cycle, claims("id").toLong)
            .flatMap( _ => 
              UserDao.findUserWCycle(claims("email")).map(_.toJson)
            )
          )
        })
      }

    })

}
