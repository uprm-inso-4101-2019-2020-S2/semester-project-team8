import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import api.{ApiErrorHandler, TokenApi, UsersApi}
import ch.megard.akka.http.cors.scaladsl.CorsDirectives._

trait Routes extends ApiErrorHandler with TokenApi with UsersApi {

  val routes: Route =
    cors() {
      pathPrefix("v1") {
        login ~
        users
      }
    } ~ path("")(getFromResource("public/index.html"))

}
