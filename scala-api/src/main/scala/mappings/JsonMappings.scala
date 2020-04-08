package mappings

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import models.MenstrualCycleModels.{MenstrualCycle, MenstrualOptional}
import models.UserModels.{Users, UsersWCycle}
import spray.json.DefaultJsonProtocol


trait JsonMappings extends SprayJsonSupport with DefaultJsonProtocol with DateMarshling with SeqSerialization {

  // Users JSON FORMATS
  implicit val usersFormat = jsonFormat3(Users)

  implicit val menstrualCycle = jsonFormat6(MenstrualCycle)

  implicit val menstrualReduce = jsonFormat6(MenstrualOptional)

  implicit val usersWcycle = jsonFormat3(UsersWCycle)

  // MenstrualCycle JSON FORMATS

  // SharedUsers JSON FORMATS

  // Calendar Models


}
