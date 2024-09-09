import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
    const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { logout } = authContext;
    return (
        <>
         <button onClick={logout}>Logout</button>
        </>
    )
}
export default Profile;