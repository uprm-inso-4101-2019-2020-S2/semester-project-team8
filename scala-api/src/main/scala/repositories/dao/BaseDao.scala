package repositories.dao

import slick.dbio.NoStream
import slick.lifted.TableQuery
import slick.sql.{FixedSqlStreamingAction, SqlAction}
import utils.DatabaseConfig
import scala.concurrent.Future
import models.definitions.{MenstrualCycleTable, CalendarTable, UsersTable, SharedUsersTable}


trait BaseDao extends DatabaseConfig {

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

}
