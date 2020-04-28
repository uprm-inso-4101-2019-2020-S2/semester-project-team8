package models.MenstrualCycleModels

import java.sql.Date


case class UpdateCycle (
    bleed_start:Option[Date],
    bleed_end:Option[Date],
    cycle_id:Long
)