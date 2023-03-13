import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Slices/authSlice";
import { RegisterType } from "../types/Register";
export default function Register() {
  const dispatch = useDispatch();

  const auth = useSelector(
    (state: {
      auth: { user: { name: string; email: string; password: string } };
    }) => state.auth
  );
  const [user, setUser] = useState<RegisterType>({
    name: "",
    email: "",
    password: "",
  });
  console.log(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <>
      <form
        onChange={(e: React.FormEvent) => {
          const target = e.target as HTMLInputElement;
          setUser({ ...user, [target.name]: target.value });
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
