package models.MenstrualCycleModels
import java.sql.Date

case class MenstrualCycle(
                id:Option[Long],
                calendar_id:Option[Long],
                end_date:Option[Date],
                bleed_start:Date,
                bleed_end:Date
               )
