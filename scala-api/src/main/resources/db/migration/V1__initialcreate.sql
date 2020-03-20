
CREATE TABLE "users"
(
  id SERIAL NOT NULL,
  email varchar(40) NOT NULL,
  image_url varchar(220)
);

-- Insert test user
INSERT INTO users (email, image_url) VALUES
    ('test@test.com', 'test');
