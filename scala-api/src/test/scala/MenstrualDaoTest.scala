import models.MenstrualCycleModels.{AddCycle, InitialCycle, MenstrualCycle, UpdateCycle}
import org.scalatest.concurrent.ScalaFutures
import repositories.dao.MenstrualDao._

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

    it should "find all cycles" in {
        
        val search_1 = Await.result(findAll(testUser1.id.get), Duration.Inf).length
        assert(search_1 == 2)

        val search_2 = Await.result(findAll(testUser2.id.get), Duration.Inf).length
        assert(search_2 == 2)
    }

    // it should "creat a new cycle" in {
    //     val added_cycle = AddCycle(
    //         bleed_start = new Date(java.util.Calendar.getInstance().getTime.getTime),
    //         bleed_duration = 7,
    //         cycle_duration = 29,
    //         is_regular = Some(true)
    //     ) 
        
    //     val num1 = Await.result(add_period(added_cycle, testUser1.id.get), Duration.Inf)
    //     assert(num1 == 1)

        

    //     // buscar todos de 1


    //     // tomar el mas reciente

        
    //     // usas su id
        

    // }

    // it should "update a current cycle" in {
    //     val get_1 = Await.result(findAll(testUser1.id.get), Duration.Inf)(0)
    //     val new_addition = (
    //             bleed_start = new Date(java.util.Calendar.getInstance().getTime.getTime),
    //             bleed_duration = 6,
    //             cycle_duration = 31,
    //             is_regular = Some(true)
    //         )
        
    //     val update_1 = Await.result(update_cycle(get_1, ), Duration.Inf)
        
    //     // Buscar todos los ciclos de 1

    //     // Por cada 1 has update de su bleed_start a bleed_start - 4

    //     // Verifica las fechas esten cambaindo

    //     // Y luego el bleed_end 



    // }

    // it should "add a new cycle prediction" in {

    // }

    // it should "add a new period" in {
        

    // }


}
