import styles from "./Pulse.module.css";

const Pulse = ({ className }) => {
  return <div className={`${styles.blob} ${className}`}></div>;
};

export default Pulse;
