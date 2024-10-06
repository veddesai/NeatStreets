import { IoIosCreate } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import CreatePost from "../Components/CreatePost";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import axios from "axios";
import { API_URL } from "../config/config";
import { useLocation } from "../context/LocationContext";
import { AuthContext } from "../context/AuthContext"; // Assume you have an AuthContext

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

const Posts: React.FC = () => {
  const { location } = useLocation();
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user } = authContext;
  const [posts, setPosts] = useState<Array<Post>>([]);
  const removePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState<"NEW" | "IN_PROGRESS">("NEW");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/posts/location?lat=${location.lat}&lng=${location.lng}`,
        {
          withCredentials: true,
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  //need to change location obj to direct send lat,lng,address etc..
  useEffect(() => {
    fetchPosts();
  }, [location.address]);

  const handleCreatePostToggle = () => {
    setShowCreatePost((prev) => !prev);
  };

  const handleNewPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowCreatePost(false);
  };

  // Filter posts based on the selected status (NEW or IN_PROGRESS)
  const filteredPosts = posts.filter((post) => post.status === filter);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-black dark:text-white min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="flex justify-around items-center my-6 lg:mx-28">
          <h1 className="text-2xl font-bold uppercase">Reports Near You</h1>

          {/* Conditional Rendering for Create Report Button */}
          {user?.role !== Role.HELPER && (
            <button
              onClick={handleCreatePostToggle}
              className="text-2xl flex border-2 items-center bg-blue-700 dark:bg-yellow-500 text-white p-2 rounded-lg"
            >
              <IoIosCreate className="mr-2" />
              {showCreatePost ? "Cancel" : "Create Report"}
            </button>
          )}
        </div>

        {/* Tabs for NEW and IN_PROGRESS posts */}
        <div className="flex max-xs:flex-col  justify-center gap-6 my-6">
          <button
            className={`px-4 py-2 mr-2 rounded-lg ${
              filter === "NEW"
                ? "bg-blue-700 dark:bg-yellow-500 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
            }`}
            onClick={() => setFilter("NEW")}
          >
            New Reports
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "IN_PROGRESS"
                ? "bg-blue-700 dark:bg-yellow-500 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
            }`}
            onClick={() => setFilter("IN_PROGRESS")}
          >
            In-Progress Reports
          </button>
        </div>

        {/* Modal for CreatePost */}
        {showCreatePost && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleCreatePostToggle}
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-lg:w-96 w-1/2 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <CreatePost onPostCreated={handleNewPost} />
              <button
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded-full"
                onClick={handleCreatePostToggle}
              >
                Close
              </button>
            </div>
          </div>
        )}

        
        <div>
          {filteredPosts.length === 0 ? (
            <p className="text-center text-4xl max-md:text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-48">
              There are No {filter === "NEW" ? "New" : "In-Progress"} Reports in
              your location
            </p>
          ) : (
            filteredPosts.map((post) => (
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
                deletable={user?.id === post.reportedBy.id}
                onDelete={removePost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
