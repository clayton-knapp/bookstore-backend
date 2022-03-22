-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS publisher CASCADE;
DROP TABLE IF EXISTS book CASCADE;

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

CREATE TABLE book(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  title TEXT NOT NULL,
  publisher_id INT NOT NULL, FOREIGN KEY (publisher_id) REFERENCES publisher(id),
  released INT NOT NULL
);

INSERT INTO
  book (title, publisher_id, released)
VALUES
  ('Harry Potter', '1', 1999),
  ('Lord of the Rings', '2', 1965);
