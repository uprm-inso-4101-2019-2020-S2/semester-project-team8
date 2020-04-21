package actors

import akka.actor.Actor
import repositories.dao.MenstrualDao

// In charge of adding a new menstrual_cycle to users having its most recent menstrual cycle this month
class CycleAdderActor extends Actor {
  override def receive: Receive = {
    case d: String if d == "tick" => MenstrualDao.add_prediction()
  }
}
