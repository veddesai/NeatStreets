import { IoIosCreate } from "react-icons/io";
import { useEffect, useState } from "react";
import CreatePost from "../Components/CreatePost";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import axios from "axios";
import { API_URL } from "../config/config";

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
  location: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: User;
  assignedTo: User | undefined;
  completionTime: string | null;
}

const Posts: React.FC = () => {
 
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePostToggle = () => {
    setShowCreatePost((prev) => !prev);
  };

  const handleNewPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowCreatePost(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800 text-black dark:text-white min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="flex justify-around items-center my-6 lg:mx-28">
          <h1 className="text-2xl font-bold uppercase">
            Reports Near You
          </h1>
          
          <button
            onClick={handleCreatePostToggle}
            className="text-2xl flex items-center bg-blue-700 dark:bg-yellow-500 outline-none text-white p-2 rounded-lg"
          >
            <IoIosCreate className="mr-2" />
            {showCreatePost ? "Cancel" : "Create Report"}
          </button>
        </div>

        {/* Modal for CreatePost */}
        {showCreatePost && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleCreatePostToggle}
          >
            <div
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-lg:w-96 w-1/2 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
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

        {/* Render Posts */}
        <div>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              description={post.description}
              imageUrl={post.imageUrl}
              location={post.location}
              reportedAt={post.reportedAt}
              status={post.status}
              reportedBy={post.reportedBy}
              assignedTo={post.assignedTo}
              completionTime={post.completionTime}
              editable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
