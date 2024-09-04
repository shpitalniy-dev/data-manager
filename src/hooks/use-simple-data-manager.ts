import { useState } from "react";

export const useSimpleDataManager = <T extends {}>({
  initialState,
}: {
  initialState: T;
}) => {
  const generateErrorsState = (state: T) =>
    Object.keys(state).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {} as Record<keyof T, string>
    );

  const [state, setState] = useState<T>(initialState);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    generateErrorsState(initialState)
  );

  const handleChange = (name: keyof T, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorMsg("");
  };

  return {
    state,
    errors,
    errorMsg,
    handleChange,
  };
};
