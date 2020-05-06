import models.MenstrualCycleModels.{AddCycle, InitialCycle, MenstrualCycle, UpdateCycle}
import org.scalatest.concurrent.ScalaFutures
import repositories.dao.MenstrualDao._
import repositories.dao.SharedUsersDao._

import java.sql.Date

import scala.concurrent.Await
import scala.concurrent.duration.Duration

trait MenstrualDaoTest extends BaseTestSpec with ScalaFutures {
    

    it should "create one initial cycle" in {
        
        val init_user1 = Await.result(initialCycle(init, testUser1.id.get), Duration.Inf)
        val init_user2 = Await.result(initialCycle(init2, testUser2.id.get), Duration.Inf)

        assert(init_user1 == 1) 
        assert(init_user2 == 1)
        
        val all_cycles = Await.result(findAll(testUser1.id.get), Duration.Inf)
        val all_cycles2 = Await.result(findAll(testUser2.id.get), Duration.Inf)

        assert(all_cycles.length == 2)
        assert(all_cycles2.length == 2)

        assert(all_cycles(1).bleed_start.toString == init.bleed_start.toString)
        assert(all_cycles2(1).bleed_start.toString == init2.bleed_start.toString)

    }

    it should "fetch cycles of a certain shared user" in {
        
        val get_shared_w_me = Await.result(get_shared_with_me(testUser2.id.get), Duration.Inf)

        assert(get_shared_w_me.length == 1)

        val cycle_seq = Await.result(get_cycle_info(get_shared_w_me(0).id, testUser2.id.get) , Duration.Inf)
        assert(cycle_seq.length ==  2)
        assert(cycle_seq.head.calendar_id.get == calendar1.id.get)

    }

    it should "find all cycles" in {
        
        val search_1 = Await.result(findAll(testUser1.id.get), Duration.Inf).length
        assert(search_1 == 2)

        val search_2 = Await.result(findAll(testUser2.id.get), Duration.Inf).length
        assert(search_2 == 2)

    }

    

    it should "creat a new cycle" in {
        val search_1 = Await.result(findAll(testUser1.id.get), Duration.Inf)
        assert(search_1.length == 2)
        
        val added_cycle = AddCycle(
            bleed_start = new Date(addDays(search_1(0).bleed_start, 5)),
            cycle_id = search_1(0).id.get
        ) 
        
        val num1 = Await.result(add_period(added_cycle, testUser1.id.get), Duration.Inf)
        assert(num1 == 1)

        val search_after = Await.result(findAll(testUser1.id.get), Duration.Inf)

        assert(search_after(1).end_date.get == new Date(addDays(search_after(0).bleed_start, -1)))

        // check that bleed_start and bleed_end do not overlap

    }

    it should "update a current cycle" in {
        val get_1 = Await.result(findAll(testUser1.id.get), Duration.Inf)(0)
        val new_addition = UpdateCycle(
                bleed_start = Some(new Date(addDays(get_1.bleed_start, 4))),
                bleed_end = None,
                cycle_id = get_1.id.get
            )     
        
        val update_1 = Await.result(update_cycle(new_addition,testUser1.id.get), Duration.Inf)
        assert(update_1 == 1)

        val get_2 = Await.result(findAll(testUser1.id.get), Duration.Inf)(0)
        val new_addition_2 = UpdateCycle(
                bleed_start = None,
                bleed_end = Some(new Date(addDays(get_1.bleed_end, 10))),
                cycle_id = get_1.id.get
        )     

        val update_2 = Await.result(update_cycle(new_addition_2,testUser1.id.get), Duration.Inf)
        assert(update_2 == 1)

        // Buscar todos los ciclos de 1

        // Por cada 1 has update de su bleed_start a bleed_start - 4

        // Verifica las fechas esten cambaindo

        // Y luego el bleed_end 



    }

    // it should "add a new cycle prediction" in {

    // }

    // it should "add a new period" in {
        

    // }


}
