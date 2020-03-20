package repositories.dao

import models.UserModels.Users
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Future

object UserDao extends BaseDao {

  def findById(id:Long):Future[Users] = usersTable.filter(_.id === id).result.head
  def findByEmail(email:String):Future[Users] = usersTable.filter(_.email === email).result.head
  def create(user:Users):Future[Long] = usersTable returning usersTable.map(_.id) += user

}
