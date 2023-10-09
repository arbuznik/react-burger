import React, { FC, useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import {
  getCurrentUser,
  getUpdateUserError,
  updateUser,
} from "../../services/slices/user";
import styles from "./ProfilePage.module.css";
import { IUserFullCredentials } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ProfileMenu from "../../components/profile-menu/ProfileMenu";

const initialState: IUserFullCredentials = {
  name: "",
  email: "",
  password: "",
};

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getUpdateUserError);
  const user = useAppSelector(getCurrentUser);
  const { values, setValues, handleChange } =
    useForm<IUserFullCredentials>(initialState);
  let { name, email, password } = values;

  const isEditMode = user?.name !== name || user?.email !== email || password;

  useEffect(() => {
    if (user) {
      setValues({
        ...user,
        password: "",
      });
    }
  }, [user, setValues]);

  const handleReset = () => {
    if (user) {
      setValues({
        ...user,
        password: "",
      });
    }
  };

  const handleSubmit = () => {
    dispatch(updateUser(values));
  };

  return (
    <main className={styles.main}>
      <div>
        <ProfileMenu />
        <p className="text text_type_main-default text_color_inactive mt-20">
          In this section you can change your personal data
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          value={name}
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <Input
          value={email}
          name="email"
          placeholder="Login"
          onChange={handleChange}
        />
        <PasswordInput
          value={password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        {error && (
          <p className="text text_type_main-default text_color_error">
            {error.message}
          </p>
        )}
        {isEditMode && (
          <div className={styles.buttons}>
            <Button onClick={handleReset} htmlType="reset" type="secondary">
              Cancel
            </Button>
            <Button htmlType="submit">Save</Button>
          </div>
        )}
      </form>
    </main>
  );
};

export default ProfilePage;
