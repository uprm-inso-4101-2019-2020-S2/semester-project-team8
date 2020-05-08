package utils

object DatabaseConfig extends Config {
  val driver = slick.jdbc.PostgresProfile

  import driver.api._

  val db = Database.forConfig("databaseUrl")

  implicit val session: Session = db.createSession()

}
