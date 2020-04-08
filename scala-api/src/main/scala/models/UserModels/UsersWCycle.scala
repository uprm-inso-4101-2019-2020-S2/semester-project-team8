package models.UserModels

import models.MenstrualCycleModels.MenstrualCycle

case class UsersWCycle (
    id: Option[Long],
    email: String,
    cycle: Seq[MenstrualCycle]
);
