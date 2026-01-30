import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED } from "./queries";
import { addBookToCache } from "./utils/apolloCache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`new book ${addedBook.title} by ${addedBook.author.name} was added`)
      addBookToCache(client.cache, addedBook)
    }
  })

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommendations")}>recommendations</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={onLogout}>logout</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      
      <LoginForm setToken={setToken} show={page === "login"} setPage={setPage}/>

      <Recommendations show={page === "recommendations"}/>
    </div>
  );
};

export default App;
