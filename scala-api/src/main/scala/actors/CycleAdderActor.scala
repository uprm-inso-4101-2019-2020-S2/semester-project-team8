package actors

import akka.actor.Actor

// In charge of adding a new menstrual_cycle to users having its most recent menstrual cycle this month
class CycleAdderActor extends Actor {
  override def receive: Receive = {
    case d: String if d == "tick" => println("ticked")
  }
}
