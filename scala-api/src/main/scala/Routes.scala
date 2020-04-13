import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import api.{ApiErrorHandler, TokenApi, UsersApi, MenstrualApi}
import ch.megard.akka.http.cors.scaladsl.CorsDirectives._

trait Routes extends ApiErrorHandler with TokenApi with UsersApi with MenstrualApi {

  val routes: Route =
    cors() {
      pathPrefix("v1") {
        login ~
        users ~
        menstrual
      }
    } ~ path("")(getFromResource("public/index.html"))

}
