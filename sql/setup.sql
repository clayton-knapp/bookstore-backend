-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS publisher CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS reviewer CASCADE;
DROP TABLE IF EXISTS author_book CASCADE;

CREATE TABLE publisher(
  publisher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT
);


CREATE TABLE book(
  book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  title TEXT NOT NULL,
  publisher_id BIGINT NOT NULL, FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id),
  released INT NOT NULL
);


CREATE TABLE author(
  author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  name TEXT NOT NULL,
  dob DATE,
  pob TEXT 
);

  CREATE TABLE reviewer(
  reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  name TEXT NOT NULL,
  company TEXT NOT NULL
);

  CREATE TABLE review(
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    rating INT NOT NULL,
    reviewer_id BIGINT NOT NULL, FOREIGN KEY (reviewer_id) REFERENCES reviewer(reviewer_id),
    review TEXT NOT NULL,
    book_id BIGINT NOT NULL, FOREIGN KEY (book_id) REFERENCES book(book_id) 
    );

  CREATE TABLE author_book(
    -- author_book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    author_id BIGINT REFERENCES author(author_id),
    book_id BIGINT REFERENCES book(book_id)
);

INSERT INTO publisher 
  (name, city, state, country)
VALUES
  ('Random House', 'New York City', 'NY', 'USA'),
  ('Penguin', 'Los Angeles', 'CA', 'USA');

INSERT INTO book 
  (title, publisher_id, released)
VALUES
  ('Harry Potter', '1', 1999),
  ('Lord of the Rings', '2', 1965),
  ('Harry Potter 3', '1', 2003);

INSERT INTO author 
  (name, dob, pob)
VALUES
  ('JK Rowling', '1965-07-31', 'Yate, England'),
  ('JRR Tolken', '1892-01-03', 'Bloemfontein, South Africa'),
  ('Cliff', '2000-01-01', 'PartyCity');

INSERT INTO reviewer
  (name, company)
VALUES
  ('bob', 'Nike'),
  ('zeus', 'addidas');

INSERT INTO review 
  (rating, reviewer_id, review, book_id)
VALUES
  (5, '1', 'good book', '1'),
  (2, '1', 'somewhat good', '2'),
  (4, '2', 'meh', '1'),
  (3, '2', 'bad book', '2');

INSERT INTO author_book
(author_id, book_id)
VALUES
('1', '1'),
('2', '2'),
('1', '3'),
('3', '1');
