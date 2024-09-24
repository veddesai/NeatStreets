import { Link } from "react-router-dom";

interface AuthButtonProps {
  className?: string,
  type: "signUp" | "signOut",
  role: string
}

const AuthButton: React.FC<AuthButtonProps> = ({ className,type,role }) => {
  

  return (
    <button className={className}>
      <Link className="font-bold" to={"/"+ type.toLowerCase() + "?role="+ (type==="signUp"? role: "")}>{type.toUpperCase()}</Link>
    </button>
  );
};

export default AuthButton;
