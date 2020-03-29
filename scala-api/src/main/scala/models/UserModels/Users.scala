package models.UserModels

case class Users(
                id:Option[Long],
                email:String,
                isRegular:Boolean,
                )
