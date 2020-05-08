package repositories.dao
import models.SharedUsersModels.{SharedUsers, SharedUsersJoinedUser}
import models.MenstrualCycleModels.MenstrualCycle
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import utils.DatabaseConfig._

object SharedUsersDao extends BaseDao{

    /*
      get all users with shared record to your calendar
     */
    def get_shared_users(id:Long): Future[Seq[SharedUsersJoinedUser]] = {
      db.run(
        sql"""
             SELECT su.id, su.users_id, su.calendar_id, u.email, u.image_url, su.approved, su.is_allowed
             FROM shared_users su
              JOIN users u
              ON su.users_id = u.id
             WHERE su.calendar_id = (
              SELECT id FROM calendar
              WHERE owner_id = $id
             )
             AND su.is_allowed = true;
             """.as[SharedUsersJoinedUser]
      )
    }

  /*
   get all users which you can see there calendar
   */
  def get_shared_with_me(id:Long):Future[Seq[SharedUsersJoinedUser]] = {
    db.run(
      sql"""
          SELECT su.id, u.id, su.calendar_id, u.email, u.image_url, su.approved, su.is_allowed
            FROM shared_users su
            JOIN calendar c
              ON su.calendar_id = c.id
            JOIN users u
              ON u.id = c.owner_id
            WHERE su.users_id=$id
              AND is_allowed=true
              AND approved = true
         """.as[SharedUsersJoinedUser])
  }

  /*
  get all unapproved shared requests sent to me
  */
  def get_unapproved_requests(id:Long):Future[Seq[SharedUsersJoinedUser]] = {
    db.run(sql"""
         SELECT su.id, su.users_id, su.calendar_id, u.email, u.image_url, su.approved, su.is_allowed
             FROM shared_users su
              JOIN users u
              ON su.users_id = u.id
              WHERE su.is_allowed = true
              AND su.approved = false
              AND su.users_id = $id
         """.as[SharedUsersJoinedUser])
  }

    /*
        send request to other user
        insert shared_user
        with user_id of whom request will be sent
        calendar_id of the one who is requesting
        is_allowed will be true
        approved will be false
    */
    def add_shared_user(user_id:Long, id:Long):Future[Int] = {
        db.run(
          sql"""
                SELECT * FROM shared_users
                WHERE
                users_id=$user_id
                AND
                calendar_id = (
                    SELECT id from calendar
                    WHERE owner_id = $id
                )
             """.as[SharedUsers]
        ).flatMap {
          case result if result.isEmpty =>
            db.run(
              sqlu"""
                INSERT INTO shared_users (users_id, calendar_id, is_allowed, approved) values
                     ($user_id, $id, true, false )
              """)
          case _ =>
            db.run(
              sqlu"""
                    UPDATE shared_users
                    SET is_allowed = true
                    WHERE users_id=$user_id
                    AND calendar_id=$id
                   """)
        }
    }

    /*
      Revoke access to a already existing shared user record
     */
    def remove_shared_user(record_id:Long, id:Long) = {
      db.run(
        sqlu"""
        UPDATE shared_users
        SET is_allowed = false
        WHERE id=$record_id
        AND calendar_id = (
          SELECT id FROM calendar
          WHERE owner_id=$id
        )
        """
      )
    }

    /*
      Revoke view privilegaes to an exisitng calendar that was shared with you
    */

    def remove_shared_with_me(record_id:Long, id:Long) ={
      db.run(
        sqlu"""
         UPDATE shared_users
            SET approved=false,
            is_allowed=false
            WHERE id=$record_id
            AND users_id=$id
         """
      )
    }

    /*
      Approve shared user request
    */
    def approve_shared_request(record_id:Long, id:Long) ={
      db.run(
        sqlu"""
         UPDATE shared_users
            SET approved=true
            WHERE id=$record_id
            AND users_id=$id
            AND is_allowed=true
         """
      )
    }

    /*
      Get latest 5 cycles of target user
    */
    def get_cycle_info(record_id:Long, id:Long): Future[Seq[MenstrualCycle]] = {
      db.run(
        sql"""
          SELECT m.id, m.calendar_id, m.end_date, m.bleed_start, m.bleed_end
            FROM menstrual_cycle m
            JOIN shared_users su ON su.calendar_id = m.calendar_id 
            WHERE su.id = $record_id
            AND users_id = $id
        """.as[MenstrualCycle]
      )
    }


}
