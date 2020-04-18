package models.UserModels

import models.MenstrualCycleModels.MenstrualCycle

case class UsersWCycle (
    id: Option[Long],
    email: String,
    cycle_avg: Int,
    cycle: Seq[MenstrualCycle]
);
