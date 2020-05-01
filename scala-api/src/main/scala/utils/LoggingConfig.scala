package utils

import akka.event.Logging
import akka.http.scaladsl.model.HttpRequest
import akka.http.scaladsl.server.RouteResult
import akka.http.scaladsl.server.RouteResult.{Complete, Rejected}
import akka.http.scaladsl.server.directives.LogEntry

trait LoggingConfig {

  def requestMethodAndResponseStatusAsInfo(req: HttpRequest): RouteResult => Option[LogEntry] = {
    case Complete(res) => Some(LogEntry(req.method.name + " to " + req.uri + " : " + res.status, Logging.InfoLevel))
    case _ => None // no log entries for rejections
  }

  val rejectionLogger: HttpRequest => RouteResult => Option[LogEntry] = req => {
    case Rejected(rejections) => Some(LogEntry(s"Request: $req\nwas rejected with rejections:\n$rejections", Logging.DebugLevel))
    case Complete(req)        => None
  }

}
