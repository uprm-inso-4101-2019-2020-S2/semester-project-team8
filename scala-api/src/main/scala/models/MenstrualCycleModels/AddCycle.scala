package models.MenstrualCycleModels

import java.sql.Date

case class AddCycle(
                   bleed_start: Date,
                   cycle_id: Long
                   )
