package models.MenstrualCycleModels

import java.sql.Date;

case class InitialCycle (
    bleed_start:Date,
    bleed_duration:Int,
    cycle_duration:Int
)
