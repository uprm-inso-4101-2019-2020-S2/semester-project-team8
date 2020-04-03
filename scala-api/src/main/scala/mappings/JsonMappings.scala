package mappings

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import models.MenstrualCycleModels.MenstrualCycle
import models.UserModels.{Users, UsersWCycle}
import spray.json.DefaultJsonProtocol
import DateMarshling._

trait JsonMappings extends SprayJsonSupport with DefaultJsonProtocol{

  // Users JSON FORMATS
  implicit val usersFormat = jsonFormat3(Users)

  implicit val menstrualCycle = jsonFormat6(MenstrualCycle)

  implicit val usersWcycle = jsonFormat3(UsersWCycle)

  // MenstrualCycle JSON FORMATS

  // SharedUsers JSON FORMATS

  // Calendar Models


}
