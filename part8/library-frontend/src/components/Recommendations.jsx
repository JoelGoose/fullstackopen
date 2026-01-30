import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, ME } from "../queries";


const Recommendations = ({ show }) => {
  const userResult = useQuery(ME)
  const favoriteGenre = userResult.data?.me?.favoriteGenre
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre
  });
  if (!show || userResult.loading || booksResult.loading) return null
  
  const user = userResult.data.me
  const books = booksResult.data.allBooks
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
      {/* Some code duplication from Books.jsx. Should be moved into a component*/}
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
  )
}

export default Recommendations