package utils

import java.net.URI


case class JdbcUriConfig(Url:String) {

  private val dbUri:URI = new URI(Url)
  val username:String = dbUri.getUserInfo.split(":")(0)
  val password:String = dbUri.getUserInfo.split(":")(1)
  val dbUrl: String =
    if (sys.env("ENV") == "PRODUCTION"){
      "jdbc:postgresql://" + dbUri.getHost + ':' + dbUri.getPort + dbUri.getPath + "?sslmode=require"
    } else  "jdbc:postgresql://" + dbUri.getHost + ':' + dbUri.getPort + dbUri.getPath

}

object JdbcUriConfig {
  def apply(Url:String): JdbcUriConfig = new JdbcUriConfig(Url)
}
