import { IoIosCreate } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreatePost from "../Components/CreatePost";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";

import axios from "axios";
import { API_URL } from "../config/config";

const MyPosts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}/users/${id}/posts`);
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  //   fetchPosts();
  // }, [id]);

  const handleCreatePostToggle = () => {
    setShowCreatePost((prev) => !prev);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800 text-black dark:text-white">
      <Navbar />
      <div className="p-4">
        <div className="flex justify-between items-center my-4">
          <h1 className="text-2xl font-semibold uppercase">My Posts</h1>
          <button
            onClick={handleCreatePostToggle}
            className="text-2xl flex items-center bg-blue-800 dark:bg-yellow-500 outline-none text-white p-2 rounded-lg"
          >
            <IoIosCreate className="mr-2" />
            {showCreatePost ? "Cancel" : "Create Post"}
          </button>
        </div>

        {showCreatePost && <CreatePost />}
        {/* <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default MyPosts;
