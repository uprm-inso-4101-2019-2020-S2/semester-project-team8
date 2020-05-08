import java.sql.Date

import authentikat.jwt.JsonWebToken
import models.CalendarModels.Calendar
import models.MenstrualCycleModels.InitialCycle
import models.UserModels.Users
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import repositories.TokenRepository
import repositories.dao.BaseDao
import slick.jdbc.PostgresProfile.api._
import utils.MigrationConfig

import scala.concurrent.Await
import scala.concurrent.duration.Duration

trait BaseTestSpec extends AnyFlatSpec with Matchers with BaseDao with MigrationConfig with TokenRepository {

  import utils.DatabaseConfig._

  println("Entered Here")

  protected val claimsUser1 = setClaims("test@test.com", Some(1), tokenExpirePeriodInDays)

  protected val jwt:String = JsonWebToken(header, claimsUser1, secretKey)

  // User 1 Persona
  protected val testUser1 = Users(
    email="test@test.com",
    image_url="https://forums.oscommerce.com/uploads/monthly_2017_12/J_member_17188.png",
    id=Some(1),
    cycle_avg=0,
    isRegular=true
  )

  protected val init = InitialCycle(
    bleed_start = new Date(java.util.Calendar.getInstance().getTime.getTime),
    bleed_duration = 6,
    cycle_duration = 31,
    is_regular = Some(true)
  )

  protected val calendar1 = Calendar(
    owner_id=Some(1),
    id=Some(1)
  )
  // end USer Persona 1

  // Persona 2
  protected val testUser2 = Users(
    email="test@test2.com",
    image_url="https://forums.oscommerce.com/uploads/monthly_2017_12/J_member_17188.png",
    id=Some(2),
    cycle_avg=0,
    isRegular=true
  )

  protected val init2 = InitialCycle(
    bleed_start = new Date(java.util.Calendar.getInstance().getTime.getTime),
    bleed_duration = 8,
    cycle_duration = 28,
    is_regular = Some(true)
  )

  protected val calendar2 = Calendar(
    owner_id=Some(2),
    id=Some(2)
  )

  // End Persona 2
  reloadSchema()
  
  Await.result( db.run(usersTable += testUser1) , Duration.Inf)
  Await.result( db.run(usersTable += testUser2) , Duration.Inf)
  Await.result( db.run(calendarTable += calendar1) , Duration.Inf )
  Await.result( db.run(calendarTable += calendar2) , Duration.Inf )

}
