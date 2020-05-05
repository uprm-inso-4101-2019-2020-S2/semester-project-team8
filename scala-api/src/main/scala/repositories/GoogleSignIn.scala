package repositories

import java.util.{Collections, NoSuchElementException}

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory

import models.UserModels.Users
import repositories.dao.UserDao

import scala.concurrent.Await
import scala.concurrent.duration._

object GoogleSignIn {

  private lazy val httpTransport = new NetHttpTransport()
  private lazy val jsonFactory = new JacksonFactory()

  def readIdToken(id_token:String): (String, Long) = {

    val verifier = new GoogleIdTokenVerifier.Builder(httpTransport, jsonFactory)
      .setAudience(Collections.singletonList(sys.env("CLIENT_ID")))
      .build()

    val idToken = verifier.verify(id_token)

    if (idToken != null) {
      val payload = idToken.getPayload
      try{
         val user = Await.result(UserDao.findByEmail(email = payload.getEmail), 3000 millis)
         return ( user.email, user.id.get )
      }catch{
        case e: NoSuchElementException =>
            val u:Users = Users(email = payload.getEmail, id=None, isRegular=true, cycle_avg = 0, image_url = s"${payload.get("picture")}")
            val id = Await.result(UserDao.create(u), 3000 millis)
            return ( payload.getEmail, id )
      }
    }
    
    // Return null if id_token was not valid
    null
  }

}



