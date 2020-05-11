import org.scalatest.concurrent.ScalaFutures
import repositories.dao.UserDao._

import scala.concurrent.Await
import scala.concurrent.duration.Duration



trait UserDaoTest extends BaseTestSpec with ScalaFutures {


    it should "find by email" in {
        
        val result = Await.result(search_user("es", testUser1.id.get), Duration.Inf)
        // assert(result.length == 1)
        
    }

}