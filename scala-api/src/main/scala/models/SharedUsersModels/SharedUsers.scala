package models.SharedUsersModels


case class SharedUsers(
    id:Option[Long],
    users_id:Option[Long],
    calendar_id:Option[Long],
    is_allowed:Boolean,
    approved:Boolean  
);                                   