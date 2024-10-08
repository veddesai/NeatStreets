import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Assume you have an AuthContext
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";

enum Role {
  END_USER = "END_USER",
  ADMIN = "ADMIN",
  HELPER = "HELPER",
}

interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  fullname: string;
  points: number;
  reportedPosts?: Post[];
  assignedPosts?: Post[]; // This should be defined as Post[] | undefined
}

interface Post {
  id: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  address: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: User;
  assignedTo?: User;
  completionTime?: string;
}

const PostsAssigned: React.FC = () => {
  const authContext = useContext(AuthContext);
  
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  
  const { user } = authContext;

  return (
    <div className="relative bg-slate-50 dark:bg-slate-950 text-black dark:text-white min-h-screen">
      <Navbar />

      <div className="p-4">
        <div className="flex justify-around items-center my-6 lg:mx-28">
          <h1 className="text-2xl font-bold uppercase">
            {user?.fullname ? `${user.fullname}'s Assigned Posts` : "My Assigned Posts"}
          </h1>
        </div>

        <div>
          {/* Check if user is defined and assignedPosts exists */}
          {user?.assignedPosts && user.assignedPosts.length > 0 ? (
            user.assignedPosts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                description={post.description}
                imageUrl={post.imageUrl}
                address={post.address}
                reportedAt={post.reportedAt}
                status={post.status}
                reportedBy={post.reportedBy}
                assignedTo={post.assignedTo}
                completionTime={post.completionTime}
                lat={post.lat}
                lng={post.lng}
                deletable={false} 
              />
            ))
          ) : (
            <p className="text-center mt-36 text-lg">
              No assigned posts available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsAssigned;
