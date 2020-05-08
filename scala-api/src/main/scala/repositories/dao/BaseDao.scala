package repositories.dao

import models.MenstrualCycleModels.MenstrualCycle
import models.SharedUsersModels.{SharedUsers, SharedUsersJoinedUser}
import models.UserModels.Users

import slick.dbio.NoStream
import slick.lifted.TableQuery
import slick.sql.{FixedSqlStreamingAction, SqlAction}
import utils.DatabaseConfig

import scala.concurrent.Future
import models.definitions.{CalendarTable, MenstrualCycleTable, SharedUsersTable, UsersTable}
import slick.jdbc.GetResult
import utils.DatabaseConfig._

trait BaseDao {



  val usersTable = TableQuery[UsersTable]

  val calendarTable = TableQuery[CalendarTable]

  val menstrualTable = TableQuery[MenstrualCycleTable]

  val sharedUsersTable = TableQuery[SharedUsersTable]

  protected implicit def executeFromDb[A](action: SqlAction[A, NoStream, _ <: slick.dbio.Effect]): Future[A] = {
    db.run(action)
  }

  protected implicit def executeReadStreamFromDb[A](action: FixedSqlStreamingAction[Seq[A], A, _ <: slick.dbio.Effect]): Future[Seq[A]] = {
    db.run(action)
  }

  // SQL IMPLICITS

  // Users
  implicit val userGet = GetResult(r => Users(Some(r.<<), r.<<, r.<<, r.<<, r.<<))
  // Menstrual Cycle
  implicit val menstrualGet = GetResult(r => MenstrualCycle(Some(r.<<), Some(r.<<), Some(r.<<), r.<<, r.<<))
  // SharedUsers
  implicit val sharedUserGet = GetResult(r => SharedUsers(Some(r.<<), Some(r.<<), Some(r.<<), r.<<, r.<< ))
  implicit val sharedUsersJoinUser = GetResult(r => SharedUsersJoinedUser(r.<<, r.<<, r.<<, r.<<, r.<<, r.<<, r.<<))

}
