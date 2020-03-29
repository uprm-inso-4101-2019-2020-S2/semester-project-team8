package models.definitions
import models.CalendarModels.Calendar
import slick.jdbc.PostgresProfile.api._

class CalendarTable(tag:Tag) extends Table[Calendar](tag, "calendar"){
  
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def owner_id = column[Long]("owner_id", O.Unique)
  def * =
    (id.?, owner_id.?) <> ((Calendar.apply _).tupled, Calendar.unapply)

}
