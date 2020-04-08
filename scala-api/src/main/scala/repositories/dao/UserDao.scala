package repositories.dao

import models.CalendarModels.Calendar
import models.MenstrualCycleModels.MenstrualCycle
import models.UserModels.{Users, UsersWCycle}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

object UserDao extends BaseDao {

  def findById(id:Long):Future[Users] = usersTable.filter(_.id === id).result.head
  def findByEmail(email:String):Future[Users] = usersTable.filter(_.email === email).result.head

  def create(user:Users) = {
    db.run(usersTable returning usersTable.map(_.id) += user)
      .flatMap( id => {
        db.run(calendarTable returning calendarTable.map(_.owner_id) += Calendar(owner_id = Some(id), id = None))
      })
  }

  def findUserWCycle(email:String) = {

    val query1  = for {
      (u, c)  <-
        usersTable.filter(_.email === email) join calendarTable on (_.id === _.owner_id)
    } yield (u, c)

    val query2 =  for {

      ( (u ,c) , m) <-
      query1 joinLeft menstrualTable.sortBy(_.start_date.desc) on (
        _._2.id === _.calendar_id) take 2

    } yield (u, m)

    db.run( query2.result )
      .map( value =>  {
        val first:(Users, Option[MenstrualCycle]) = value.head

        UsersWCycle(email=first._1.email, id=first._1.id, cycle={
          value.collect{
            case (u, m) if m.isDefined => m.get
          }
        })

      })

  }


}

