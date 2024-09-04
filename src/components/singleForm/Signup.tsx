import React from "react";
import { useSimpleDataManager } from "../../hooks/use-simple-data-manager";

interface SingupState {
  email: string;
  password: string;
  repeatPassword: string;
}

export const Singup = () => {
  const { state, handleChange } = useSimpleDataManager<SingupState>({
    initialState: { email: "", password: "", repeatPassword: "" },
  });

  return (
    <div>
      <h1>Sign up</h1>
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
        <div>
          <label>Repeat password</label>
          <input
            type="text"
            value={state.repeatPassword}
            onChange={(e) => handleChange("repeatPassword", e.target.value)}
          />
        </div>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </div>
  );
};
