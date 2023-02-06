import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USERS } from "../App";

const CREATE_USER = gql`
  mutation (
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
  ) {
    createUser(first_name: $first_name
    last_name: $last_name
    email: $email
    password: $password) {
      id
      first_name
      last_name
      email
      password
    }
  }
`;

function NewUserForm() {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [createUser] = useMutation(CREATE_USER);

  async function novoUsuario(event: FormEvent) {
    event.preventDefault()

    const {data} = await createUser({
        variables: {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        },
        refetchQueries: [GET_USERS]
    });

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <form onSubmit={novoUsuario}>
      <input
        type={"text"}
        placeholder={"Primeiro Nome"}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type={"text"}
        placeholder={"Ultimo Nome"}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type={"email"}
        placeholder={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={"password"}
        placeholder={"Senha"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Novo Usuario</button>
    </form>
  );
}

export default NewUserForm;
