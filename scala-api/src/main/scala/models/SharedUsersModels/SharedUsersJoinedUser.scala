package models.SharedUsersModels

case class SharedUsersJoinedUser(
                                  id:Long,
                               user_id:Long,
                               calendar_id:Long,
                               email:String,
                               image_url:String,
                               approved:Boolean,
                               is_allowed:Boolean
                               )
