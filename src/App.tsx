import { gql, useQuery } from "@apollo/client";
import NewUserForm from "./components/NewUserForm";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export const GET_USERS = gql`
  query {
    users {
      id
      first_name
      last_name
      email
      password
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <ul>
      {data?.users.map((user) => (
        <li key={user.id}>
          {user.first_name} {user.last_name}
        </li>
      ))}
      <NewUserForm />
    </ul>
  );
}

export default App;
