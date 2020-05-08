package repositories.dao

import java.sql.Date
import java.util.Calendar
import models.MenstrualCycleModels.{AddCycle, InitialCycle, MenstrualCycle, UpdateCycle}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import utils.DatabaseConfig._
//TODO: Work with utc and convert to appropiate timezones later
object MenstrualDao extends BaseDao {
  

    def findById(id:Long) = {}

    def findAll(id:Long):Future[Seq[MenstrualCycle]] = {
      db.run(sql"""
        SELECT m.id, m.calendar_id, m.end_date, m.bleed_start, m.bleed_end FROM
        menstrual_cycle m JOIN calendar c ON m.calendar_id = c.id
        WHERE c.owner_id = ${id}
        ORDER BY m.bleed_start DESC;
      """.as[MenstrualCycle] )
    }

  def findMostRecent(n:Int, skip:Int) = {}

    def create(m:Option[MenstrualCycle]) = {

        db.run( menstrualTable returning menstrualTable.map(_.id) += m.get )

    }

    // DESIGN FIRST --------
    def update_cycle(new_data:UpdateCycle, user_id:Long):Future[Int] = {
      if ( new_data.bleed_end.isDefined && new_data.bleed_start.isEmpty ) {
        db.run(sqlu"""
          UPDATE menstrual_cycle
          SET bleed_end = ${new_data.bleed_end.get}
          WHERE id = ${new_data.cycle_id};
          -- ADD VERIFY CALENDAR OWNER  --  
        """)
      } 
      
      else if(  new_data.bleed_end.isEmpty && new_data.bleed_start.isDefined ) {
        db.run(sqlu"""

          WITH nbs AS (SELECT ${new_data.bleed_start.get}::date as bleeding)

          UPDATE menstrual_cycle
          SET end_date = (SELECT bleeding FROM nbs) - 1 * interval '1 day'
          WHERE end_date = (
            SELECT bleed_start - 1 * interval '1 day' 
              FROM menstrual_cycle 
              WHERE id = ${new_data.cycle_id}
          );

          UPDATE menstrual_cycle 
          SET bleed_start = ${new_data.bleed_start.get}
          WHERE id=${new_data.cycle_id};

          UPDATE menstrual_cycle 
          SET end_date = bleed_start + (
            SELECT cycle_avg FROM users 
            WHERE id=$user_id
          ) * interval '1 day'
          WHERE id = (
            SELECT id FROM menstrual_cycle
            WHERE calendar_id = (
              SELECT id
              FROM calendar
              WHERE owner_id = $user_id 
            ) ORDER BY bleed_start DESC
              LIMIT 1
          );

          UPDATE users 
          SET cycle_avg=(
            select avg(end_date - bleed_start) as avg_days
              from menstrual_cycle
              where calendar_id = (
                SELECT id FROM calendar WHERE owner_id=$user_id
              )
          ) WHERE id=$user_id

        """)
      }else{
        Future { 0 }
      }


      
    }

    def add_prediction() = {
      db.run(sqlu"""
        INSERT INTO menstrual_cycle (calendar_id, bleed_start, bleed_end, end_date)
          SELECT m.calendar_id as cid,
                 m.end_date + 1 * interval '1 day' as bs,
                 m.end_date + (1 + DATE_PART('day', m.bleed_end::timestamp - m.bleed_start::timestamp))  * interval '1 day' as be,
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
          WHERE
          NOW()::date > m.end_date
          OR NOW()::date between m.bleed_start AND m.end_date
       """)
    }


    // -- CALCULATE NEW CYCLE AVG AND STORE IN USER
    //             UPDATE users
    //             SET cycle_avg = (cycle_avg/2 + (
    //                 SELECT DATE_PART('day', (
    //                     SELECT end_date FROM
    //                         menstrual_cycle
    //                     WHERE end_date = (
    //                         SELECT bleed_start FROM menstrual_cycle
    //                         WHERE id = ${new_cycle.cycle_id}
    //                     ) - 1
    //                 )::timestamp - (
    //                     SELECT bleed_start FROM
    //                         menstrual_cycle
    //                     WHERE end_date = (
    //                         SELECT bleed_start FROM menstrual_cycle
    //                         WHERE id = ${new_cycle.cycle_id}
    //                     ) - 1
    //                 )::timestamp )/2 )
    //             )
    //             WHERE id = ${id};

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

                

                UPDATE users 
                SET cycle_avg=(
                  select avg(end_date - bleed_start) as avg_days
                    from menstrual_cycle
                    where calendar_id = ${calendar.id}
                    AND bleed_start != (
                      SELECT end_date + 1 * interval'1 day' FROM menstrual_cycle
                      WHERE id = ${new_cycle.cycle_id}
                    )
                ) WHERE id=$id;


                WITH mjoinu AS (SELECT *
                    FROM menstrual_cycle as m 
                    JOIN calendar as c on m.calendar_id = c.id
                    JOIN users as u on u.id = c.owner_id
                  WHERE u.id = ${id}
                  AND m.id = ${new_cycle.cycle_id} )

                -- CHANGE THE BLEED_START, BLEED_END, END_DATE to correct values of next cycle
                UPDATE menstrual_cycle
                SET bleed_start = (
                  SELECT bleed_start + cycle_avg * interval '1 day'
                    FROM mjoinu
                ),
                bleed_end = (
                  SELECT bleed_end + cycle_avg * interval '1 day'
                    FROM mjoinu
                ),
                end_date = (
                  SELECT bleed_start + (2 * cycle_avg - 1) * interval '1 day'
                    FROM mjoinu
                )
                WHERE bleed_start = (
                  SELECT end_date + 1 * interval '1 day' FROM mjoinu
                )
                AND calendar_id = ${calendar.id};


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

        db.run(usersTable.filter(_.id === id).map(u => (u.cycle_avg, u.isRegular))
          .update((cycle.cycle_duration, if (cycle.is_regular.isDefined) cycle.is_regular.get else true )))

        db.run(calendarTable.filter(_.owner_id === id).result.head)
          .map( calendar => {
              val c1 = MenstrualCycle(
                  id=None,
                  end_date=Some(end_date),
                  bleed_start=cycle.bleed_start,
                  bleed_end=bleed_end,
                  calendar_id = calendar.id,

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

    def addDays(date:Date, duration:Int):Long = {
        val c = Calendar.getInstance()

        c.setTime(date)
        c.add(Calendar.DAY_OF_MONTH, duration)

        c.getTime.getTime
    }



}

