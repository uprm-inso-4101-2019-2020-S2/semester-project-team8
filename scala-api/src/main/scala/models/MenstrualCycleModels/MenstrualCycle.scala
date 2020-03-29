package models.MenstrualCycleModels
import java.util.Date

case class MenstrualCycle(
                id:Option[Long],
                calendar_id:Option[Long],
                start_date:Date,
                end_date:Date,
                bleed_start:Date,
                bleed_end:Date
                )
