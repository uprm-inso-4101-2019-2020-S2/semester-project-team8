package mappings

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import models.UserModels.Users
import spray.json.DefaultJsonProtocol

trait JsonMappings extends SprayJsonSupport with DefaultJsonProtocol{

  // Users JSON FORMATS
  implicit val usersFormat = jsonFormat3(Users)

  // MenstrualCycle JSON FORMATS

  // SharedUsers JSON FORMATS

  // Calendar Models


}
