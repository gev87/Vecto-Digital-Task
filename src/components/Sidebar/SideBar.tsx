import { memo, type FC } from "react";
import styles from "./Sidebar.module.css";
import { Avatar } from "../../assets";
import { MENU_ITEMS } from "./contants";

const Sidebar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.content}>
          <div className={styles.avatar}>
            <img src={Avatar} alt="avatar" className={styles.avatarImage} />
            <span className={styles.avatarName}>Gevorg</span>
          </div>

          <ul className={styles.menuList}>
            {MENU_ITEMS.map(({ label, icon }) => (
              <li key={label} className={styles.menuItem}>
                <img src={icon} alt={label} className={styles.icon} />
                <span className={styles.label}>{label}</span>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <ul className={styles.footerMenu}>
              <li>LANGUAGE</li>
              <li>GET HELP</li>
              <li>EXIT</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.overlay} />
    </div>
  );
};

export default memo(Sidebar);
