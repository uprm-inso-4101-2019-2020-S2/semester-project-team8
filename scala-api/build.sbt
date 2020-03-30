name := "scala-api"

version := "0.1"

scalaVersion := "2.12.11"

libraryDependencies ++= Seq(
  "com.typesafe" % "config" % "1.4.0",
  "com.typesafe.akka" %% "akka-http"   % "10.1.11",
  "com.typesafe.akka" %% "akka-stream" % "2.5.26",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.11",
  "ch.megard" %% "akka-http-cors" % "0.4.2",
  "com.typesafe.slick" %% "slick" % "3.2.0",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.2.0",
  "org.postgresql"   %  "postgresql" % "9.4-1201-jdbc41",
  "org.flywaydb"  %  "flyway-core" % "3.2.1",
  "com.google.api-client" % "google-api-client" % "1.30.9",
  "com.jason-goodwin" %% "authentikat-jwt" % "0.4.5",
  "io.circe"          %% "circe-generic"       % "0.11.1",
  "de.heikoseeberger" %% "akka-http-circe"     % "1.27.0",
  "io.spray" %% "spray-json" % "1.3.5"
)




