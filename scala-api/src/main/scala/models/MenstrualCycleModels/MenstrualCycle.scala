package models.MenstrualCycleModels
import java.sql.Date

case class MenstrualCycle(
                id:Option[Long],
                calendar_id:Option[Long],
                start_date:Option[Date],
                end_date:Option[Date],
                bleed_start:Date,
                bleed_end:Date
                )
