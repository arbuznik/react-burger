import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";

export const useForm = <T>(
  initialState: T
): {
  values: T;
  setValues: Dispatch<SetStateAction<T>>;
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
} => {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const name = e.currentTarget.name;
      const value = e.currentTarget.value;

      setValues({
        ...values,
        [name]: value,
      });
    },
    [setValues, values]
  );

  return { values, setValues, handleChange };
};
