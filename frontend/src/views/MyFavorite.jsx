import FavoriteUser from "../components/FavoriteUser";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const MyFavorite = () => {
  const { userId, username } = useContext(UserContext);

  return (
    <Container>
      <FavoriteUser userId={userId} username={username} />
    </Container>
  );
};

export default MyFavorite;
