package repositories.dao

import models.CalendarModels.Calendar
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Future

object CalendarDao extends BaseDao {

  def findById(id:Long):Future[Calendar] = calendarTable.filter(_.id === id).result.head
  def findByOwnerId(owner_id:Long):Future[Calendar] = calendarTable.filter(_.owner_id === owner_id).result.head


}