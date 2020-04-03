package repositories.dao

import models.UserModels.{ Users, UsersWCycle}
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext.Implicits.global

import scala.concurrent.Future

object UserDao extends BaseDao {

  def findById(id:Long):Future[Users] = usersTable.filter(_.id === id).result.head
  def findByEmail(email:String):Future[Users] = usersTable.filter(_.email === email).result.head
  def create(user:Users):Future[Long] = usersTable returning usersTable.map(_.id) += user

  def findUserWCycle(email:String) = {

    val query1  = for {
      (u, c)  <-
        usersTable.filter(_.email === email) join calendarTable on (_.id === _.owner_id)
    } yield (u, c)

    val query2 =  for {

      ( (u ,c) , m) <-
      query1 join menstrualTable.sortBy(_.start_date.desc) on (_._2.id === _.calendar_id)

    } yield (u, m)

    db.run( query2.result.head )
      .map( value =>  UsersWCycle(email=value._1.email, id=value._1.id, cycle=value._2) )

  }

  /*
    GET localhost:8080/user/shared_users
    
    
    ApiMessage(  data: Seq( (Users) ) message: .... )
    
    
    {
      "data": {
        "id":""
        "email":""
      }
      "message": "SUCCESS"
    }
    {
      "data": [
        "id":""
        "email":""
      ]
      "message": "SUCCESS"
    }

  */


}
