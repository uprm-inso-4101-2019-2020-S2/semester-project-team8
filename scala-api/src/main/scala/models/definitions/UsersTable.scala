package models.definitions
import models.UserModels.Users
import slick.jdbc.PostgresProfile.api._

class UsersTable(tag:Tag) extends Table[Users](tag, "users"){
  
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def email = column[String]("email", O.Unique)
  def isRegular = column[Boolean]("isRegular")
  def * =
    (id.?, email, isRegular) <> ((Users.apply _).tupled, Users.unapply)

}
