"use client";
import "./Modal.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className={"backdrop"}
      onClick={(event) => {
        event.preventDefault();
        props.onClose();
      }}
    />
  );
};

const ModalOverlay = (props) => {
  return <div className={`modal ${props.className}`}>{props.children}</div>;
};

const Modal = ({ onClose, children, className }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, document.getElementById("overlay"))}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Modal;
