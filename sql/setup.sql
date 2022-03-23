-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS publisher CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS reviewer CASCADE;

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
  publisher_id BIGINT NOT NULL, FOREIGN KEY (publisher_id) REFERENCES publisher(id),
  released INT NOT NULL
);

INSERT INTO
  book (title, publisher_id, released)
VALUES
  ('Harry Potter', '1', 1999),
  ('Lord of the Rings', '2', 1965),
  ('Harry Potter 3', '1', 2003);

  CREATE TABLE author(
   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
   name TEXT NOT NULL,
   dob DATE,
   pob TEXT 
  );

  INSERT INTO
  author (name, dob, pob)
  VALUES
  ('JK Rowling', '1965-07-31', 'Yate, England'),
   ('JRR Tolken', '1892-01-03', 'Bloemfontein, South Africa');

   CREATE TABLE review(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    rating INT NOT NULL,
    reviewer_id BIGINT NOT NULL, FOREIGN KEY (reviewer_id) REFERENCES reviewer(id),
    review TEXT NOT NULL,
    book_id BIGINT NOT NULL, FOREIGN KEY (book_id) REFERENCES book(id)
   );

   INSERT INTO review 
   (rating, reviewer_id, review, book_id)
   VALUES
   (5, '1', 'good book', '1'),
    (3, '2', 'bad book', '2');

CREATE TABLE reviewer(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  name TEXT NOT NULL,
  company TEXT NOT NULL
);

INSERT INTO
(name, company)
VALUES
('bob', 'Nike'),
('zeus', 'addidas');

   
   
