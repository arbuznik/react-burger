import { useState } from "react";

export const useForm = () => {
  const [values, setValues] = useState({});

  const setStartingValues = (startingValues) => {
    if (startingValues) {
      setValues(startingValues);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, handleChange, setStartingValues };
};
