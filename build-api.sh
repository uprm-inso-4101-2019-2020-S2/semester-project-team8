echo "[BUILD] Starting Scala-Api ..."
docker-compose start scala-api
echo "[BUILD] Compiling ..."
docker-compose exec scala-api sbt compile stage
echo "[BUILD] Shutting Down ..."
docker-compose stop scala-api 
