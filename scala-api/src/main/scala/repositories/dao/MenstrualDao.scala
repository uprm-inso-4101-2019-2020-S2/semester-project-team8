package repositories.dao

import java.sql.Date
import java.util.Calendar

import models.MenstrualCycleModels.{AddCycle, InitialCycle, MenstrualCycle}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global


object MenstrualDao extends BaseDao {
  

    def findById(id:Long) = {}

    def findAll() = {}

    def findMostRecent(n:Int, skip:Int) = {}

    def create(m:Option[MenstrualCycle]) = {

        db.run( menstrualTable returning menstrualTable.map(_.id) += m.get )

    }

    def add_period(new_cycle:AddCycle, id:Long) = {

      // TODO: Add user validation before updating
      db.run( calendarTable.filter(_.owner_id === id).result.head )
          .flatMap( calendar =>
            db.run(
              sqlu"""
                UPDATE menstrual_cycle
                SET end_date = ${new Date(addDays(new_cycle.bleed_start, -1))}
                WHERE end_date = (
                  SELECT bleed_start FROM menstrual_cycle
                  WHERE id = ${new_cycle.cycle_id}
                ) - 1
                AND calendar_id = ${calendar.id};
                UPDATE menstrual_cycle
                      SET bleed_start = ${new_cycle.bleed_start}
                      WHERE id = ${new_cycle.cycle_id}
                      AND calendar_id = ${calendar.id};
                UPDATE users
                SET cycle_avg = (cycle_avg/2 + (
                    SELECT DATE_PART('day', (
                        SELECT end_date FROM
                            menstrual_cycle 
                        WHERE end_date = (
                            SELECT bleed_start FROM menstrual_cycle
                            WHERE id = ${new_cycle.cycle_id}
                        ) - 1
                    )::timestamp - (
                        SELECT bleed_start FROM
                            menstrual_cycle
                        WHERE end_date = (
                            SELECT bleed_start FROM menstrual_cycle
                            WHERE id = ${new_cycle.cycle_id}
                        ) - 1                            
                    )::timestamp )/2 )  
                )
                WHERE id = ${id};
                """
            )
          )

    }

    def initialCycle(cycle:InitialCycle, id:Long) = {

        // Inital Menstrual Cycle
        val bleed_end = new Date(addDays(cycle.bleed_start , cycle.bleed_duration - 1))
        val end_date = new Date(addDays(cycle.bleed_start, cycle.cycle_duration))

        // Second Menstrual Cycle ( Prediction )
        val bleed_start_1 = new Date(addDays(end_date, 1))
        val bleed_end_1 = new Date(addDays(bleed_start_1, cycle.bleed_duration - 1))
        val end_date_1 = new Date(addDays(bleed_start_1, cycle.cycle_duration))

        db.run(usersTable.filter(_.id === id).map(_.cycle_avg).update(cycle.cycle_duration))

        db.run(calendarTable.filter(_.owner_id === id).result.head)
          .map( calendar => {
              val c1 = MenstrualCycle(
                  id=None,
                  end_date=Some(end_date),
                  bleed_start=cycle.bleed_start,
                  bleed_end=bleed_end,
                  calendar_id = calendar.id
              )
              val c2 = MenstrualCycle(
                  id=None,
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

