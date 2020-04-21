import actors.{CycleAdderActor, NotificationSenderActor}
import akka.actor.{ActorSystem, Props}
import akka.event.{Logging, LoggingAdapter}
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import utils.{DatabaseConfig, MigrationConfig}

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

object Main extends App with MigrationConfig with DatabaseConfig with Routes {

  private implicit val system:ActorSystem = ActorSystem("FlovverApi")
  protected implicit val executor: ExecutionContext = system.dispatcher
  protected val log: LoggingAdapter = Logging(system, getClass)
  
  migrate()

  val cycleAdder = system.actorOf(Props[CycleAdderActor])
  val notificationSender = system.actorOf(Props[NotificationSenderActor])

  system.scheduler.scheduleAtFixedRate(0 milliseconds, 24 hours, cycleAdder, "tick")
  system.scheduler.scheduleAtFixedRate(0 milliseconds, 24 hours, notificationSender, "tick")

  val bindingFuture = Http().bindAndHandle(handler=logRequestResult("log")(routes), interface="0.0.0.0", port=8080)

  println(s"Server online at http://0.0.0.0:8080/")

}
