import React from "react";
import styles from "../profile-menu/ProfileMenu.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { logoutUser } from "../../services/slices/user";
import { useAppDispatch } from "../../hooks/hooks";

const ProfileMenu = () => {
  const dispatch = useAppDispatch();

  const linkClassName = ({ isActive }: { isActive: boolean }) => {
    return clsx(
      "text text_type_main-medium",
      isActive ? "menu-link_active" : "menu-link_inactive"
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav>
      <ul>
        <li className={styles.profileLink}>
          <NavLink to="/profile" end className={linkClassName}>
            Profile
          </NavLink>
        </li>
        <li className={styles.profileLink}>
          <NavLink to="/profile/orders" end className={linkClassName}>
            Order history
          </NavLink>
        </li>
        <li className={styles.profileLink}>
          <button
            className={clsx(styles.button, "text text_type_main-medium")}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;
