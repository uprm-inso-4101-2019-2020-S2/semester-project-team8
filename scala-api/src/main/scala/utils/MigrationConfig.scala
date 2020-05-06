package utils

import org.flywaydb.core.Flyway

trait MigrationConfig extends Config{

  private val flyway = new Flyway()

  private val uriConfig = JdbcUriConfig(sys.env("DATABASE_URL"))
  flyway.setDataSource(uriConfig.dbUrl, uriConfig.username, uriConfig.password)

  def migrate() = {
    flyway.migrate()
  }

  def reloadSchema() = {
    flyway.clean()
    flyway.migrate()
  }

}
