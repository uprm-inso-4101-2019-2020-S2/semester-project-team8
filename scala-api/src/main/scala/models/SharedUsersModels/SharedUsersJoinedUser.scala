package models.SharedUsersModels

case class SharedUsersJoinedUser(
                               user_id:Long,
                               email:String,
                               image_url:String,
                               approved:Boolean,
                               is_allowed:Boolean
                               )
