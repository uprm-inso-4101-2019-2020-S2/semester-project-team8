package models.definitions
import slick.jdbc.PostgresProfile.api._
import java.util.Date

import models.MenstrualCycleModels.MenstrualCycle
// TODO: Fix Error
class MenstrualCycleTable(tag:Tag) extends Table[MenstrualCycle](tag, "menstrual_cycle"){
  
  def id = column[Long]("id")
  def calendar_id = column[Long]("calendar_id")
  def start_date = column[Date]("start_date")(DateMapper.utilDate2SqlDate)
  def end_date = column[Date]("end_date")(DateMapper.utilDate2SqlDate)
  def bleed_start = column[Date]("bleed_start")(DateMapper.utilDate2SqlDate)
  def bleed_end = column[Date]("bleed_end")(DateMapper.utilDate2SqlDate)
  def * =
    (id.?, calendar_id.?, start_date, end_date, bleed_start, bleed_end) <> ((MenstrualCycle.apply _).tupled,MenstrualCycle.unapply _)
}

object DateMapper {

   val utilDate2SqlDate = MappedColumnType.base[java.util.Date, java.sql.Date](
{ utilDate => new java.sql.Date(utilDate.getTime()) },
{ sqlDate => new java.util.Date(sqlDate.getTime()) })

}