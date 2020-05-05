package utils

trait DatabaseConfig extends Config {
  val driver = slick.jdbc.PostgresProfile

  import driver.api._

  val db = if(sys.env("ENV") == "PRODUCTION")  Database.forConfig("databaseUrl") else Database.forConfig("database")

  implicit val session: Session = db.createSession()

}
