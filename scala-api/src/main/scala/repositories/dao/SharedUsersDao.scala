package repositories.dao
import slick.jdbc.PostgresProfile.api._
import models.SharedUsersModels.{AddSharedUser, SharedUsers}

object SharedUsersDao extends BaseDao{

    /*
        send request to other user
        insert shared_user
        with user_id of whom request will be sent
        calendar_id of the one who is requesting
        is_allowed will be true
        approved will be false
    */
    def add_shared_user(newUser:AddSharedUser) = {
        db.run(
            sql"""
                SELECT * FROM shared_users
                WHERE
                users_id=${newUser.user_id}
                AND
                calendar_id = (
                    SELECT id from calendar
                    WHERE owner_id=${id}
                )

             """.as[SharedUsers]
        )
    }


}
