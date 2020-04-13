package repositories.dao

import models.MenstrualCycleModels.{MenstrualCycle, InitialCycle}

import java.util.Calendar;
import java.sql.Date;

import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global


object MenstrualDao extends BaseDao {
  

    def findById(id:Long) = {}

    def findAll() = {}

    def findMostRecent(n:Int, skip:Int) = {}

    def create(m:Option[MenstrualCycle]) = {

        db.run( menstrualTable returning menstrualTable.map(_.id) += m.get )

    }

    def initialCycle(cycle:InitialCycle, id:Long) = {

        // Inital Menstrual Cycle
        val bleed_end = new Date(addDays(cycle.bleed_start , cycle.bleed_duration - 1))
        val end_date = new Date(addDays(cycle.bleed_start, cycle.cycle_duration))

        // Second Menstrual Cycle ( Prediction )
        val bleed_start_1 = new Date(addDays(end_date, 1))
        val bleed_end_1 = new Date(addDays(bleed_start_1, cycle.bleed_duration - 1))
        val end_date_1 = new Date(addDays(bleed_start_1, cycle.cycle_duration))
      
        db.run(calendarTable.filter(_.owner_id === id).result.head)
          .map( calendar => {
              val c1 = MenstrualCycle(
                  id=None,
                  start_date=Some(cycle.bleed_start),
                  end_date=Some(end_date),
                  bleed_start=cycle.bleed_start,
                  bleed_end=bleed_end,
                  calendar_id = calendar.id
              )
              val c2 = MenstrualCycle(
                  id=None,
                  start_date = Some(bleed_start_1),
                  end_date = Some(end_date_1),
                  bleed_start = bleed_start_1,
                  bleed_end = bleed_end_1,
                  calendar_id = calendar.id
              )

              (c1, c2)
          }).flatMap( c1 =>
                db.run( menstrualTable += c1._1 )
                    .flatMap( _ =>
                        db.run(menstrualTable += c1._2)
                    )
            )

    }

    private def addDays(date:Date, duration:Int):Long = {
        val c = Calendar.getInstance()

        c.setTime(date)
        c.add(Calendar.DAY_OF_MONTH, duration)

        c.getTime.getTime
    }

}

