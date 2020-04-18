package actors

import akka.actor.Actor

// In charge of finding and sending notifications to users with a period that is near
class NotificationSenderActor extends Actor{
  override def receive: Receive = {
    case d: String if d == "tick" => println("ticked in sender")
  }
}
