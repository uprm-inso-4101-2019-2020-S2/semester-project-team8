package mappings

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import models.UserModels.Users
import spray.json.DefaultJsonProtocol

trait JsonMappings extends SprayJsonSupport with DefaultJsonProtocol{

  implicit val usersFormat = jsonFormat3(Users)

}
