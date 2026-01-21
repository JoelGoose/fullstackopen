import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Header = styled.h2`
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`;

const Users = () => {
  const users = useSelector((state) => state.users);
  const byAmount = (a, b) => b.blogs.length - a.blogs.length;
  console.log(users);
  return (
    <>
      <Header>Users</Header>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.toSorted(byAmount).map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
