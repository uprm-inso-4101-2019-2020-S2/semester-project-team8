package mappings

import java.text._
import java.sql._
import scala.util.Try
import spray.json._

trait DateMarshling {

  implicit object DateOptionFormat extends JsonFormat[Option[Date]] {
    def write(date: Option[Date]) = {
      if(date.isDefined) JsString(dateToIsoString(date.get))
      else{ JsNull }
    }
    def read(json: JsValue) = json match {
      case JsString(rawDate) =>
        Some(parseIsoDateString(rawDate))
          .fold(deserializationError(s"Expected ISO Date format, got $rawDate"))(identity)
      case JsNull => None
      case error => deserializationError(s"Expected JsString, got $error")
    }
  }

  implicit object DateFormat extends JsonFormat[Date] {
    def write(date: Date) = JsString(dateToIsoString(date))
    def read(json: JsValue) = json match {
      case JsString(rawDate) =>
        parseIsoDateString(rawDate)
          .fold(deserializationError(s"Expected ISO Date format, got $rawDate"))(identity)
      case error => deserializationError(s"Expected JsString, got $error")
    }
  }

  private val localIsoDateFormatter = new ThreadLocal[SimpleDateFormat] {
    override def initialValue() = new SimpleDateFormat("yyyy-MM-dd")
  }

  private def dateToIsoString(date: Date) =
    localIsoDateFormatter.get().format(date)
  private def parseIsoDateString(date: String): Option[Date] =
    Try{ Date.valueOf(date) }.toOption



}
