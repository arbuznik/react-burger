import { useCallback, useState } from "react";

export const useForm = () => {
  const [values, setValues] = useState({});

  const setStartingValues = useCallback(
    (startingValues) => {
      if (startingValues) {
        setValues(startingValues);
      }
    },
    [setValues]
  );

  const handleChange = useCallback(
    (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setValues({
        ...values,
        [name]: value,
      });
    },
    [setValues, values]
  );

  return { values, handleChange, setStartingValues };
};
