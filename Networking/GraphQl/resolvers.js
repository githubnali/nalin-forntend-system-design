export const data = {
    authors: [
      {
        id: "1",
        name: "George Orwell",
        bookIds: ["101", "103"]
      },
      {
        id: "2",
        name: "Harper Lee",
        bookIds: ["102"]
      }
    ],
    books: [
      {
        id: "101",
        title: "1984",
        publishedYear: 1949,
        authorId: "1"
      },
      {
        id: "102",
        title: "Animal Farm",
        publishedYear: 1945,
        authorId: "2"
      },
      {
        id: "103",
        title: "To Kill a Mockingbird",
        publishedYear: 1960,
        authorId: "2"
      }
    ]
  };

  
export const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      console.log(parent)
      return data.authors.find(authorDetail => authorDetail.id === parent.authorId);
    },
  },
  Author: {
    books: (parent, args, context, info) => {
      return data.books.filter(book => parent.bookIds.includes(book.id));
    },  
  },
  Query: {
      authors: (parent, args, context, info) => {
          return data.authors;
      },
      books: (parent, args, context, info) => {
          return data.books;
      }
  },
  Mutation: {
    addBook: (parent, args, context, info) => {
      console.log(args);
      const newBook = {
        ...args,
        id: String(data.books.length + 1),
      }
      data.books.push(newBook);
      return newBook
    }
  }
}