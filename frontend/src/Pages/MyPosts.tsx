import { IoIosCreate } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePost from "../Components/CreatePost";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import axios from "axios";
import { API_URL } from "../config/config";

interface Post {
  id: string;
  description: string;
  imageUrl: string;
  location: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: {
    id: string;
  };
  assignedTo: string | undefined;
  completionTime: string | null;
}

const MyPosts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/${id}/posts`, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [id]);

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
        <div className="flex justify-around items-center my-8">
          <h1 className="text-2xl font-bold uppercase">My Posts</h1>
          {/* Ved Was Here, Now i need to do reportedBy changes to real user name, somewhat ui changes like profile pic typa thing near reportedBy.. Location API to be inserted so can get based on Co ordinates and set it for user and posts... In Backend, need to getPostsByLocation. Then, We can click on marker on Map on our location to fetch those posts.
          
          ROLE BASED 💈🧮 : 
          
          (Helper) : (1) Can edit Post Status for which its assigned to,(2) Can't Create Posts,(3 {optional}) Gets Notified about Trash Posts based on location, (4) Gets Gamified or Displayed on Leaderboard based on points they get for completing a collection of trash.
          
          (End_User) 🏄  : (1) can delete his/her own posts , We have MyPosts.tsx! (2) Sees and can create Trash Posts.

          PROFILE 🙇 🧮 : 

          Making a Profile after clicking that photoTypaStuff, Verification after signup with mail?, Logout in that profile.

          */}
          <button
            onClick={handleCreatePostToggle}
            className="text-2xl flex items-center bg-blue-800 dark:bg-yellow-500 outline-none text-white p-2 rounded-lg"
          >
            <IoIosCreate className="mr-2" />
            {showCreatePost ? "Cancel" : "Create Post"}
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
              description={post.description}
              imageUrl={post.imageUrl}
              location={post.location}
              reportedAt={post.reportedAt}
              status={post.status}
              reportedBy={{ id: id }}
              assignedTo={post.assignedTo}
              completionTime={null}
              editable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
