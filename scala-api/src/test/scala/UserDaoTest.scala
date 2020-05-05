import org.scalatest.concurrent.ScalaFutures
import repositories.dao.UserDao._

import scala.concurrent.Await
import scala.concurrent.duration.Duration

import slick.jdbc.PostgresProfile.api._


trait UserDaoTest extends BaseTestSpec with ScalaFutures {


    it should "find by email" in {
        
        val result = Await.result(search_user("es"), Duration.Inf)
        assert(result.length == 2)
        
    }

}