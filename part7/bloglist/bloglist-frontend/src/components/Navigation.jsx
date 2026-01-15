import { Link } from "react-router-dom";
import styled from "styled-components";
import gifFile from "../assets/jack-hammer-construction-worker.gif";

const Gif = styled.img.attrs({
  src: gifFile,
  alt: "construction worker",
})`
  height: 25px;
`;

const NavigationBar = styled.div`
  background-color: yellow;
  border-style: dashed;
`;

const Navigation = ({ user, handleLogout }) => {
  return (
    <NavigationBar>
      <Link style={{ padding: 3 }} to="/">
        blogs
      </Link>
      <Link style={{ padding: 3 }} to="/users">
        users
      </Link>
      {user.name} logged in
      <button style={{ margin: 5 }} onClick={handleLogout}>
        logout
      </button>
      (this is a construction zone)
      <Gif />
    </NavigationBar>
  );
};

export default Navigation;
