import React, { useState } from "react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import Input from "./Input";
import Button from "./button";

const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      id
      name
      userName
      email
    }
  }
`;

const ADD_NEW_USER = gql`
  mutation addNewUser(
    $name: String!
    $email: String!
    $userName: String!
    $password: String!
  ) {
    addNewUser(
      name: $name
      email: $email
      userName: $userName
      password: $password
    ) {
      id
      name
      userName
      email
      password
    }
  }
`;

const Form = () => {
  const [fetchUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  const [addUserToDatabase, { data2, loading2, error2 }] =
    useMutation(ADD_NEW_USER);
  const [user, setUser] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { name, email, userName, password, confirmPassword } = user;
    if (name.trim().length === 0) return alert("Please enter your Name.");
    else if (email.trim().length === 0)
      return alert("Please enter your E-Mail ID.");
    else if (userName.trim().length === 0)
      return alert("Please enter your Username.");
    else if (password.trim().length === 0)
      return alert("Please enter your Password.");
    else if (confirmPassword.trim().length === 0)
      return alert("Please enter your Repeat Password.");
    else if (confirmPassword.trim() !== password.trim())
      return alert("Confirmation password not entered properly. Try again :(");

    const ans = await fetchUser({ variables: { email } });
    console.log(ans);
    if (ans.data.getUser.length !== 0) return alert("User already exists.");
    const output = await addUserToDatabase({
      variables: { name, email, userName, password },
    });
    return alert(
      `User added successfully with UserID:${output.data.addNewUser.id}`
    );
  };

  if (loading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Input
          id="name"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        >
          Full Name :
        </Input>

        <Input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        >
          Email :
        </Input>

        <Input
          id="userName"
          type="text"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
        >
          User Name :
        </Input>

        <Input
          id="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        >
          Password :
        </Input>

        <Input
          id="confirmPassword"
          type="password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        >
          Confirm Password :
        </Input>
        <h2>{JSON.stringify(user)}</h2>
        <Button type="Submit">Sign-Up</Button>
      </form>
    </div>
  );
};

export default Form;
