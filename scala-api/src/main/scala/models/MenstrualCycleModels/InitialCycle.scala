package models.MenstrualCycleModels

import java.sql.Date;

case class InitialCycle (
    bleed_start:Date,
    bleed_duration:Int,
    cycle_duration:Int,
    is_regular:Option[Boolean]
)
