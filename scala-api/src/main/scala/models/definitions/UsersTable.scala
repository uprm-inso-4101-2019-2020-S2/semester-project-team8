package models.definitions
import models.UserModels.Users
import slick.jdbc.PostgresProfile.api._

class UsersTable(tag:Tag) extends Table[Users](tag, "users"){
  
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def imageUrl = column[String]("image_url", O.Unique)
  def email = column[String]("email", O.Unique)
  def * =
    (id.?, email, imageUrl) <> ((Users.apply _).tupled, Users.unapply)


}
