package models.MenstrualCycleModels

import java.sql.Date

case class MenstrualOptional(
                             id:Option[Long],
                             calendar_id:Option[Long],
                             end_date:Option[Date],
                             bleed_start:Option[Date],
                             bleed_end:Option[Date]
                           )
