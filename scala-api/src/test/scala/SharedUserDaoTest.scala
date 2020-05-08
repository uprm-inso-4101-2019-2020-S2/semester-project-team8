import org.scalatest.concurrent.ScalaFutures
import repositories.dao.SharedUsersDao._

import scala.concurrent.Await
import scala.concurrent.duration.Duration

import slick.jdbc.PostgresProfile.api._


trait SharedUserDaoTest extends BaseTestSpec with ScalaFutures {
  import utils.DatabaseConfig._
  // adding functionality
  
  it should "add a new shared user" in {

    val num = Await.result(add_shared_user(testUser2.id.get, testUser1.id.get), Duration.Inf)
    assert(num == 1)

    val num2 = Await.result(add_shared_user(testUser1.id.get, testUser2.id.get), Duration.Inf)
    assert(num2 == 1)

  }

  it should "not be approved" in {

    val record1 = Await.result(get_shared_users(testUser1.id.get), Duration.Inf).head
    assert(!record1.approved)

    val record2 = Await.result(get_shared_users(testUser2.id.get), Duration.Inf).head
    assert(!record2.approved)

  }

  // check approvein 

  it should "approve and to be approved" in {

    // Approve request from second user
    val get_1 = Await.result(get_unapproved_requests(testUser1.id.get), Duration.Inf).head
    val approve_1 = Await.result(approve_shared_request(get_1.id,testUser1.id.get),Duration.Inf)
    assert(approve_1 == 1)

    val verify_1 = Await.result(get_shared_with_me(testUser1.id.get), Duration.Inf).head
    assert(verify_1.approved)
    assert(verify_1.email == testUser2.email)

    // Approve request from first user
    val get_2 = Await.result(get_unapproved_requests(testUser2.id.get), Duration.Inf).head
    val approve_2 = Await.result(approve_shared_request(get_2.id,testUser2.id.get),Duration.Inf)
    assert(approve_2 == 1)

    val verify_2 = Await.result(get_shared_with_me(testUser2.id.get), Duration.Inf).head
    assert(verify_2.approved)
    assert(verify_2.email == testUser1.email)
    
  }
  
  
  // check revoke me
  it should "revoke access from me to another user" in { 
    
    val get_sharedusers = Await.result(get_shared_with_me(testUser1.id.get), Duration.Inf).head

    assert(get_sharedusers.approved)

    val num0 = Await.result(remove_shared_with_me(get_sharedusers.id, testUser1.id.get), Duration.Inf)
    
    assert(num0 == 1)

    val get_shared_after = Await.result(get_shared_with_me(testUser1.id.get), Duration.Inf)

    assert(get_shared_after.isEmpty)

  }
  
  // check revoke
  it should "revoke access to a another user from viewing my calendar" in {
    
    val get_user = Await.result(get_shared_users(testUser1.id.get), Duration.Inf).head
    val num1 = Await.result(remove_shared_user(get_user.id, testUser1.id.get), Duration.Inf)
    
    assert(num1 == 1)
    
    val get_user_after = Await.result(get_shared_users(testUser1.id.get), Duration.Inf)
    assert(get_user_after.isEmpty)
    
  }

  // check adding after revoking\
  it should "get added without adding a new row" in {

    val add1 = Await.result(add_shared_user(testUser2.id.get, testUser1.id.get), Duration.Inf)

    assert(add1 == 1)

    val checkLength = Await.result(db.run(sql"""
      SELECT COUNT(*) FROM shared_users
    """.as[Int]), Duration.Inf)

    assert(checkLength(0) == 2)

  }

}
