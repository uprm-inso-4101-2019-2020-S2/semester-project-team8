import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import api.{ApiErrorHandler, MenstrualApi, SharedUserApi, TokenApi, UsersApi}
import ch.megard.akka.http.cors.scaladsl.CorsDirectives._

import scala.concurrent.ExecutionContext

trait Routes extends ApiErrorHandler with TokenApi with UsersApi with MenstrualApi with SharedUserApi {

  def routes(implicit executor:ExecutionContext): Route =
    cors() {
      pathPrefix("v1") {
        login ~
        users ~
        menstrual ~
        sharedUser
      }
    } ~ path("")(getFromResource("public/index.html"))

}
