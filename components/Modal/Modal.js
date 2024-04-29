import "./Modal.css";

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
      <Backdrop onClose={onClose} />
      <ModalOverlay className={className}>{children}</ModalOverlay>
    </>
  );
};

export default Modal;
