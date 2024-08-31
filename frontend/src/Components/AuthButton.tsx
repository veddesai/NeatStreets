import { Link } from "react-router-dom";

interface AuthButtonProps {
    className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({className}) => {
  return (
  
      <button className={className}>
        <Link className="font-bold" to={"/signup"}>SIGNUP</Link>
      </button>
    
  );
};

export default AuthButton;
