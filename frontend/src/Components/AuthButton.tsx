import { Link } from "react-router-dom";

interface AuthButtonProps {
  className?: string,
  type: "signUp" | "signOut"
}

const AuthButton: React.FC<AuthButtonProps> = ({ className,type }) => {
  

  return (
    <button className={className}>
      <Link className="font-bold" to={"/"+ type.toLowerCase()}>{type.toUpperCase()}</Link>
    </button>
  );
};

export default AuthButton;
