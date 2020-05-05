import actors.{CycleAdderActor, NotificationSenderActor}
import akka.actor.{ActorSystem, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import utils.{DatabaseConfig, LoggingConfig, MigrationConfig}

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

object Main extends App with MigrationConfig with DatabaseConfig with Routes with LoggingConfig {

  implicit val system:ActorSystem = ActorSystem("FlovverApi")
  implicit val executor: ExecutionContext = system.dispatcher
  
  migrate()

  val cycleAdder = system.actorOf(Props[CycleAdderActor])
  val notificationSender = system.actorOf(Props[NotificationSenderActor])

  system.scheduler.scheduleAtFixedRate(0 milliseconds, 24 hours, cycleAdder, "tick")
  system.scheduler.scheduleAtFixedRate(0 milliseconds, 24 hours, notificationSender, "tick")

  logRequestResult(rejectionLogger)

  val bindingFuture = Http().bindAndHandle(handler=logRequestResult(requestMethodAndResponseStatusAsInfo _)(routes), interface="0.0.0.0", port=sys.env("PORT").toInt )

  println("Server online at http://0.0.0.0:8080/")

}
