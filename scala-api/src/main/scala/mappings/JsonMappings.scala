package mappings

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import models.MenstrualCycleModels.{AddCycle, InitialCycle, MenstrualCycle, MenstrualOptional, UpdateCycle}
import models.UserModels.{Users, UsersWCycle}
import spray.json.DefaultJsonProtocol



trait JsonMappings extends SprayJsonSupport with DefaultJsonProtocol with DateMarshling with SeqSerialization {

  // Users JSON FORMATS
  implicit val usersFormat = jsonFormat4(Users)

  implicit val menstrualCycle = jsonFormat5(MenstrualCycle)

  implicit val menstrualReduce = jsonFormat5(MenstrualOptional)

  implicit val updateCycleFormat = jsonFormat3(UpdateCycle)

  implicit val initialCycle = jsonFormat3(InitialCycle)

  implicit val addCycle = jsonFormat2(AddCycle)

  implicit val usersWcycle = jsonFormat4(UsersWCycle)

  // MenstrualCycle JSON FORMATS

  // SharedUsers JSON FORMATS

  // Calendar Models


}
