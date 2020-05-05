package repositories

import java.util.concurrent.TimeUnit

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directive1
import authentikat.jwt.{JsonWebToken, JwtClaimsSet, JwtClaimsSetMap, JwtHeader}
import akka.http.scaladsl.server.Directives._

trait TokenRepository {

  protected val tokenExpirePeriodInDays:Int = if (sys.env("ENV") == "PRODUCTION") 31 else 365
  protected val secretKey:String = sys.env("SECRET_KEY")
  protected val header:JwtHeader = JwtHeader("HS256")

  protected def setClaims(email: String,id: Option[Long], expirePeriodInDays: Long): JwtClaimsSetMap =
    JwtClaimsSet(
      Map("email" -> email,
        "id" -> id.getOrElse("").toString ,
        "expiredAt" -> (System.currentTimeMillis() + TimeUnit.DAYS
          .toMillis(expirePeriodInDays)).toString)
    )

  private def getClaims(jwt: String): Map[String, String] = jwt match {
    case JsonWebToken(_, claims, _) => claims.asSimpleMap.getOrElse(Map.empty[String, String])
  }

  private def isTokenExpired(jwt: String): Boolean =
    getClaims(jwt).get("expiredAt").exists(_.toLong < System.currentTimeMillis)

  protected def authenticated: Directive1[Map[String, String]] =
    optionalHeaderValueByName("Authorization").flatMap {
      case Some(jwt) if isTokenExpired(jwt) =>
        complete(StatusCodes.Unauthorized -> "Session expired.")

      case Some(jwt) if JsonWebToken.validate(jwt, secretKey) =>
        provide(getClaims(jwt))

      case _ => complete(StatusCodes.Forbidden)
    }

}
