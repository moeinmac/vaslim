"use client";

import styles from "./SwitchButton.module.css";

const SwitchButton = ({ onSwitch }) => {
  const SwitchButtonHandler = (event) => {
    onSwitch(event.target.checked);
  };
  return (
    <div className={styles.switch}>
      <input id="switch" type="checkbox" defaultChecked onChange={SwitchButtonHandler} />
      <label htmlFor="switch"></label>
    </div>
  );
};
export default SwitchButton;
