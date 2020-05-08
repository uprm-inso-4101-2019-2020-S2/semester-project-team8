import actors.CycleAdderActor
import akka.actor.{ActorSystem, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import utils.{DatabaseConfig, LoggingConfig, MigrationConfig}

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

object Main extends App with MigrationConfig with Routes with LoggingConfig {

  implicit val system:ActorSystem = ActorSystem("FlovverApi")
  implicit val executor: ExecutionContext = system.dispatcher
  
  migrate()

  val cycleAdder = system.actorOf(Props[CycleAdderActor])

  system.scheduler.scheduleAtFixedRate(0 milliseconds, 24 hours, cycleAdder, "tick")

  logRequestResult(rejectionLogger)

  val bindingFuture = Http().bindAndHandle(handler=logRequestResult(requestMethodAndResponseStatusAsInfo _)(routes), interface="0.0.0.0", port=sys.env("PORT").toInt )

  println(s"Server online at 0.0.0.0:${sys.env("PORT")}")

}
