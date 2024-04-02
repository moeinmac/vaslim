import Link from "next/link";

const Button = ({ children, onClick, path }) => {
  const classNames = "bg-blue text-5xl font-kalameh rounded-xl px-8 py-4 mx-8"
  if (!path)
    return (
      <button
        className={classNames}
        onClick={onClick}
      >
        {children}
      </button>
    );
  return (
    <Link
      href={path}
      className={`${classNames} text-center`}
    >
      {children}
    </Link>
  );
};

export default Button;
