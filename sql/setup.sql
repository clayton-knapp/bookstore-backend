-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS publisher;

CREATE TABLE publisher(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT
);

INSERT INTO 
  publisher (name, city, state, country)
VALUES
  ('Random House', 'New York City', 'NY', 'USA'),
  ('Penguin', 'Los Angeles', 'CA', 'USA');


