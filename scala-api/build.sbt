name := "scala-api"

version := "0.1"

scalaVersion := "2.12.7"

libraryDependencies ++= {

  val akka_version = "2.6.4"
  val akka_http_version = "10.1.11"

  Seq(
    "com.typesafe.akka" %% "akka-actor"% akka_version,
    "com.typesafe" % "config" % "1.4.0",
    "com.typesafe.akka" %% "akka-http"   % akka_http_version,
    "com.typesafe.akka" %% "akka-stream" % akka_version,
    "com.typesafe.akka" %% "akka-http-spray-json" % akka_http_version,
    "com.typesafe.akka" %% "akka-testkit" % akka_version % "test",
    "com.typesafe.akka" %% "akka-http-testkit" % akka_http_version % "test",
    "ch.megard" %% "akka-http-cors" % "0.4.2",
    "com.typesafe.slick" %% "slick" % "3.2.0",
    "org.slf4j" % "slf4j-nop" % "1.6.4",
    "com.typesafe.slick" %% "slick-hikaricp" % "3.2.0",
    "org.postgresql"   %  "postgresql" % "9.4-1201-jdbc41",
    "org.flywaydb"  %  "flyway-core" % "3.2.1",
    "com.google.api-client" % "google-api-client" % "1.30.9",
    "com.jason-goodwin" %% "authentikat-jwt" % "0.4.5",
    "io.spray" %% "spray-json" % "1.3.5",
    "org.scalatest" %% "scalatest" % "3.1.1" % "test"
  )

}

enablePlugins(JavaAppPackaging)


