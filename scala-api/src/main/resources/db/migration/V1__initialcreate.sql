
CREATE TABLE "users" (
  "id" SERIAL NOT NULL ,
  "email" varchar(60) NOT NULL,
  "isRegular" BOOLEAN DEFAULT FALSE,
  PRIMARY KEY ("id"),
  UNIQUE("email"),
  UNIQUE("id")
);

CREATE TABLE "calendar" (
  "id" SERIAL NOT NULL,
  "owner_id" SERIAL NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE RESTRICT,
  UNIQUE("owner_id", "id")
);

CREATE TABLE "shared_users" (
  "id" SERIAL NOT NULL,
  "users_id" SERIAL NOT NULL,
  "calendar_id" SERIAL NOT NULL,
  "is_allowed" BOOLEAN DEFAULT FALSE,
  PRIMARY KEY ("id"),
  UNIQUE("id"),
  FOREIGN KEY (calendar_id) REFERENCES calendar (id) ON DELETE RESTRICT,
  FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE RESTRICT
);


CREATE TABLE "menstrual_cycle" (
  "id" SERIAL NOT NULL,
  "calendar_id" SERIAL NOT NULL,
  "end_date" date NOT NULL,
  "bleed_start" date NOT NULL,
  "bleed_end" date NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY (calendar_id) REFERENCES calendar (id) ON DELETE RESTRICT 
);


-- Links(Foreign Key) : https://www.postgresqltutorial.com/postgresql-foreign-key/
-- Links(UNIQUE): https://www.postgresqltutorial.com/postgresql-unique-constraint/
