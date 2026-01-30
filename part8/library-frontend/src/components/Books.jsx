import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    fetchPolicy: "cache-and-network"
  });
  const genresResult = useQuery(ALL_GENRES)
  
  if (!props.show || booksResult.loading || genresResult.loading) {
    return null;
  }

  const books = booksResult.data.allBooks;
  const genres = genresResult.data.allGenres
  
  return (
    <div>
      <h2>books</h2>
      <h3>sort by genre</h3>
        <button onClick={() => setGenre(null)}>reset filter</button>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      {genre && <p>currently filtering with {genre}</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
