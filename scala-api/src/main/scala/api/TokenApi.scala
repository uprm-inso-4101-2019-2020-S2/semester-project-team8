package api

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mappings.JsonMappings
import models.LoginRequest
import repositories.{GoogleSignIn, TokenRepository}


trait TokenApi  extends TokenRepository with JsonMappings{

  import authentikat.jwt._

  val login:Route =
     ( path("token") & post ) {
       entity(as[LoginRequest]) { lr =>
         val signIn = GoogleSignIn.readIdToken(lr.id_token)
         if (signIn != null) {
           val claims = setClaims(signIn._1,Some(signIn._2) , tokenExpirePeriodInDays)
             respondWithHeader(RawHeader("Access-Token", JsonWebToken(header, claims, secretKey))) {
               complete(StatusCodes.OK)
             }
         } else complete(StatusCodes.Forbidden -> "Access Forbidden!!!")
       }
     }


}
