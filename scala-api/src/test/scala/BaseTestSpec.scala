import models.CalendarModels.Calendar
import models.UserModels.Users
import org.scalatest.matchers.must.Matchers
import repositories.dao.BaseDao
import slick.jdbc.PostgresProfile.api._
import utils.MigrationConfig

import scala.concurrent.Await
import scala.concurrent.duration.Duration

trait BaseTestSpec extends Matchers with BaseDao with MigrationConfig {

  private val testUser = Users(
    email="test@test.com",
    image_url="",
    id=Some(1),
    cycle_avg=0,
    isRegular=true
  )

  private val calendar = Calendar(
    owner_id=Some(1),
    id=Some(1)
  )

  reloadSchema()

  Await.result( db.run(usersTable += testUser) , Duration.Inf)
  Await.result( db.run(calendarTable += calendar) , Duration.Inf )

}
