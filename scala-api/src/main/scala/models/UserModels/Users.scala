package models.UserModels

case class Users(
                id:Option[Long],
                email:String,
                isRegular:Boolean,
                cycle_avg:Int,
                image_url:String
                )
