### Requirements
//structure
books {
    id,
    title,
    publishedYear,
    author
}

author {
    id,
    name,
    books
}

//Data
list of books
list of authors
list of books with author details
list of authors with books details

authors {
    id
    name
    books {
      title
    }
  }
  books {
    id
    title
    author {
      name
    }
    
  }
