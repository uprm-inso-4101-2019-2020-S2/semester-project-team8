package utils

import java.net.URI


case class FlywayConfig(jdbcUrl:String) {

  private val dbUri:URI = new URI(jdbcUrl)
  val username = dbUri.getUserInfo.split(":")(0)
  val password = dbUri.getUserInfo.split(":")(1)
  val dbUrl: String = "jdbc:postgresql://" + dbUri.getHost + ':' + dbUri.getPort + dbUri.getPath + "?sslmode=require"

}

object FlywayConfig {
  def apply(jdbcUrl:String): FlywayConfig = new FlywayConfig(jdbcUrl)
}
