import React from "react";
import { useSimpleDataManager } from "../../hooks/use-simple-data-manager";

interface LoginState {
  email: string;
  password: string;
}

export const Login = () => {
  const { state, handleChange } = useSimpleDataManager<LoginState>({
    initialState: { email: "", password: "" },
  });

  return (
    <div>
      <h1>Login</h1>
      <div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={state.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={state.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </div>
  );
};
