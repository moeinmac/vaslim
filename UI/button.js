const Button = ({ children, onClick }) => {
  return (
    <button className="bg-blue text-5xl font-kalameh rounded-xl px-8 py-4 mx-8" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
