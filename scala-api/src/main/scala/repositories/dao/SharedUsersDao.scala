package repositories.dao
import models.SharedUsersModels.{AddSharedUser, SharedUsers, SharedUsersJoinedUser}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

object SharedUsersDao extends BaseDao{

    /*
      Get all users with shared record to your calendar
     */
    def get_shared_users(id:Long): Future[Seq[SharedUsersJoinedUser]] = {
      db.run(
        sql"""
             SELECT su.users_id, u.email, u.image_url, su.approved, su.is_allowed
             FROM shared_users su
              JOIN users u
              ON su.users_id = u.id
             WHERE su.calendar_id = (
              SELECT id FROM calendar
              WHERE owner_id = $id
             );
             """.as[SharedUsersJoinedUser]
      )
    }

    /*
        send request to other user
        insert shared_user
        with user_id of whom request will be sent
        calendar_id of the one who is requesting
        is_allowed will be true
        approved will be false
    */
    def add_shared_user(newUser:AddSharedUser, id:Long):Future[Int] = {
        db.run(
          sql"""
                SELECT * FROM shared_users
                WHERE
                users_id=${newUser.user_id}
                AND
                calendar_id = ${newUser.calendar_id}
             """.as[SharedUsers]
        ).flatMap {
          case result if result.isEmpty =>
            db.run(
              sqlu"""
                INSERT INTO shared_users (users_id, calendar_id, is_allowed, approved) values
                     (${newUser.user_id}, ${newUser.calendar_id}, true, false )
              """)
          case _ =>
            db.run(
              sqlu"""
                    UPDATE shared_users
                    SET is_allowed = true
                    WHERE users_id=${newUser.user_id}
                    AND calendar_id=${newUser.calendar_id}
                   """)
        }
    }


}
