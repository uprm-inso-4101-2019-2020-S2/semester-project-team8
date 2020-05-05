package mappings

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import models.LoginRequest
import models.MenstrualCycleModels._
import models.SharedUsersModels.{SharedUsers, SharedUsersJoinedUser}
import models.UserModels.{Users, UsersWCycle}
import spray.json.DefaultJsonProtocol



trait JsonMappings extends SprayJsonSupport with DefaultJsonProtocol with DateMarshling with SeqSerialization {

  // MenstrualCycle JSON FORMATS
  implicit val menstrualCycle = jsonFormat5(MenstrualCycle)
  implicit val updateCycleFormat = jsonFormat3(UpdateCycle)
  implicit val initialCycle = jsonFormat4(InitialCycle)
  implicit val addCycle = jsonFormat2(AddCycle)

  // Users JSON FORMATS
  implicit val usersFormat = jsonFormat5(Users)
  implicit val usersWcycle = jsonFormat6(UsersWCycle)

  // LoginRequest Json Formats
  implicit val loginRequestFormat = jsonFormat1(LoginRequest)

  // SharedUsers JSON FORMATS
  implicit val sharedUserFormat = jsonFormat5(SharedUsers)
  implicit val sharedUsersJoinedUserFormat = jsonFormat7(SharedUsersJoinedUser)
}
