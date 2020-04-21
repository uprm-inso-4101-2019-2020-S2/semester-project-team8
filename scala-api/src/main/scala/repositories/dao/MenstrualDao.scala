package repositories.dao

import java.sql.Date
import java.util.Calendar

import models.MenstrualCycleModels.{AddCycle, InitialCycle, MenstrualCycle}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

//TODO: Work with utc and convert to appropiate timezones later
object MenstrualDao extends BaseDao {
  

    def findById(id:Long) = {}

    def findAll(id:Long):Future[Seq[MenstrualCycle]] = {
      db.run( calendarTable.filter(_.owner_id === id).result.head )
        .flatMap( calendar =>
          db.run( menstrualTable.filter(_.calendar_id === calendar.id ).sortBy(_.bleed_start.desc).result)
        )
    }

    def findMostRecent(n:Int, skip:Int) = {}

    def create(m:Option[MenstrualCycle]) = {

        db.run( menstrualTable returning menstrualTable.map(_.id) += m.get )

    }

    def update_cycle() = {

    }

    def add_prediction() = {
      db.run(sqlu"""
        INSERT INTO menstrual_cycle (calendar_id, bleed_start, bleed_end, end_date)
          SELECT m.calendar_id as cid,
                 m.bleed_start + (u.cycle_avg) * interval '1 day' as bs,
                 m.bleed_start + (u.cycle_avg + DATE_PART('day', m.bleed_end::timestamp - m.bleed_start::timestamp))  * interval '1 day' as be,
                 m.end_date + (u.cycle_avg) * interval '1 day' as ed FROM
            (
            -- MOST RECENT PREDICTIONS per calendar
            SELECT DISTINCT ON (m.calendar_id)
              *
              FROM menstrual_cycle m
              ORDER BY m.calendar_id, m.bleed_start DESC
            ) as m JOIN calendar c on m.calendar_id = c.id
                   JOIN users u on u.id = c.owner_id
          -- FROM THE MOST RECENTS OF ALL SELECT THOSE WITH NOW being inside their prediciton cycle
          WHERE NOW()::date between m.bleed_start AND m.end_date;
       """)
    }


    def add_period(new_cycle:AddCycle, id:Long) = {

      // TODO: Add user validation before updating
      db.run( calendarTable.filter(_.owner_id === id).result.head )
          .flatMap( calendar =>
            db.run(
              sqlu"""
                -- UPDATE PREVIOUS CYCLE END DATE
                UPDATE menstrual_cycle
                SET end_date = ${new Date(addDays(new_cycle.bleed_start, -1))}
                WHERE end_date = (
                  SELECT bleed_start FROM menstrual_cycle
                  WHERE id = ${new_cycle.cycle_id}
                ) - 1
                AND calendar_id = ${calendar.id};

                -- UPDATE CURRENT BLEED START and BLEED_END
                WITH nbs AS (SELECT ${new_cycle.bleed_start}::date as bleeding)

                UPDATE menstrual_cycle
                      SET bleed_start = (SELECT bleeding FROM nbs),
                          bleed_end = (SELECT bleeding + (DATE_PART('day', bleed_end::timestamp - bleed_start::timestamp) * interval '1 day') FROM nbs)
                      WHERE id = ${new_cycle.cycle_id}
                      AND calendar_id = ${calendar.id};

                -- CALCULATE NEW CYCLE AVG AND STORE IN USER
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

                -- CHANGE THE BLEED_START, BLEED_END, END_DATE to correct values of next cycle

                -- CHANGE THE END DATE OF THE CURRENT CYCLE TO BLEED_START + AVG
                UPDATE menstrual_cycle
                SET end_date = (
                  SELECT bleed_start + (cycle_avg - 1) * interval '1 day' FROM users
                    WHERE id = ${id}
                )
                WHERE id = ${new_cycle.cycle_id};
                """
            )
          )

    }

    def initialCycle(cycle:InitialCycle, id:Long) = {

        // Inital Menstrual Cycle
        val bleed_end = new Date(addDays(cycle.bleed_start , cycle.bleed_duration - 1))
        val end_date = new Date(addDays(cycle.bleed_start, cycle.cycle_duration - 1))

        // Second Menstrual Cycle ( Prediction )
        val bleed_start_1 = new Date(addDays(end_date, 1))
        val bleed_end_1 = new Date(addDays(bleed_start_1, cycle.bleed_duration - 1))
        val end_date_1 = new Date(addDays(bleed_start_1, cycle.cycle_duration - 1))

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

