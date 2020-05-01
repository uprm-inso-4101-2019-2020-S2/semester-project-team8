package models.definitions
import models.SharedUsersModels.SharedUsers
import slick.jdbc.PostgresProfile.api._

class SharedUsersTable(tag:Tag) extends Table[SharedUsers](tag, "shared_users"){
  
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def users_id = column[Long]("users_id")
  def calendar_id = column[Long]("calendar_id")
  def isAllowed = column[Boolean]("is_allowed")
  def approved = column[Boolean]("approved")
  def * =
    (id.?, users_id.?, calendar_id.?, isAllowed, approved) <> ((SharedUsers.apply _).tupled, SharedUsers.unapply)

}
