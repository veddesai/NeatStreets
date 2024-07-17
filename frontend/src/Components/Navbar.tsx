import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <Link to="/">
            <li>hi</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
