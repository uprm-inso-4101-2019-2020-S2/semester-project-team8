package api

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import models.LoginRequest
import repositories.{GoogleSignIn, TokenRepository}


trait TokenApi  extends TokenRepository {

  import authentikat.jwt._
  import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
  import io.circe.generic.auto._

  val login:Route =
    ( path("token") & post ) {
      entity(as[LoginRequest]) { lr =>
        val email = GoogleSignIn.readIdToken(lr.id_token)
        if (email != null) {
          val claims = setClaims(email, tokenExpirePeriodInDays)
            respondWithHeader(RawHeader("Access-Token", JsonWebToken(header, claims, secretKey))) {
              complete(StatusCodes.OK)
            }
        } else complete(StatusCodes.Forbidden -> "Access Forbidden!!!")
      }
    }

}
