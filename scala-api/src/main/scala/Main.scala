import akka.actor.ActorSystem
import akka.event.{Logging, LoggingAdapter}
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import api.ApiErrorHandler
import utils.{DatabaseConfig, MigrationConfig}

import scala.concurrent.ExecutionContext

object Main extends App with ApiErrorHandler with MigrationConfig with DatabaseConfig with Routes {

  private implicit val system = ActorSystem()
  protected implicit val executor: ExecutionContext = system.dispatcher
  protected val log: LoggingAdapter = Logging(system, getClass)
  protected implicit val materializer: ActorMaterializer = ActorMaterializer()

  // Just simple hello world in future concat al Routes in Routs.scala and add to Main using the with keyword
  migrate()
  
  val bindingFuture = Http().bindAndHandle(routes, "0.0.0.0", 8080)

  println(s"Server online at http://0.0.0.0:8080/")

}
