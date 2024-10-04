import { IoIosCreate } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePost from "../Components/CreatePost";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import axios from "axios";
import { API_URL } from "../config/config";
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
  location: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: User;
  assignedTo?: User;
  completionTime?: string;
}

const MyPosts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user } = authContext;
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // State to track the active category
  const [activeCategory, setActiveCategory] = useState<"NEW" | "IN_PROGRESS" | "COMPLETED">("NEW");

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

  // Filter posts based on the active category
  const filteredPosts = posts.filter((post) => post.status === activeCategory);

  return (
    <div className="bg-slate-50 dark:bg-slate-800 text-black dark:text-white min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="flex justify-around items-center my-6 lg:mx-28">
          <h1 className="text-2xl font-bold uppercase">
            {posts[0]?.reportedBy.username
              ? posts[0].reportedBy.username + "'s"
              : "My"}{" "}
            Reports
          </h1>

          {/* Conditional Rendering for Create Report Button */}
          {user?.role !== Role.HELPER && (
            <button
              onClick={handleCreatePostToggle}
              className="text-2xl flex items-center bg-blue-700 dark:bg-yellow-500 outline-none text-white p-2 rounded-lg"
            >
              <IoIosCreate className="mr-2" />
              {showCreatePost ? "Cancel" : "Create Report"}
            </button>
          )}
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

        
        <div className="flex max-xs:flex-col justify-center gap-6 my-6">
          <button
            onClick={() => setActiveCategory("NEW")}
            className={`px-4 py-2 rounded-lg ${activeCategory === "NEW" ? "bg-blue-700 dark:bg-yellow-500 text-white" : "bg-gray-300 dark:bg-slate-600"}`}
          >
            New
          </button>
          <button
            onClick={() => setActiveCategory("IN_PROGRESS")}
            className={`px-4 py-2 rounded-lg ${activeCategory === "IN_PROGRESS" ? "bg-blue-700 dark:bg-yellow-500 text-white" : "bg-gray-300 dark:bg-slate-600"}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveCategory("COMPLETED")}
            className={`px-4 py-2 rounded-lg ${activeCategory === "COMPLETED" ? "bg-blue-700 dark:bg-yellow-500 text-white" : "bg-gray-300 dark:bg-slate-600"}`}
          >
            Completed
          </button>
        </div>

        {/* Render Filtered Posts */}
        <div>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
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
              />
            ))
          ) : (
            <p className="text-center mt-36 text-lg">No "{activeCategory.toLocaleLowerCase()}" reports available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
{/* Ved Was Here, Now i need to do reportedBy changes to real user name, somewhat ui changes like profile pic typa thing near reportedBy.. Location API to be inserted so can get based on Co ordinates and set it for user and posts... In Backend, need to getPostsByLocation. Then, We can click on marker on Map on our location to fetch those posts.
          
          ROLE BASED 💈🧮 : 
          
          (Helper) : (1 🏸 ) Can edit Post Status for which its assigned to,(2 (will do tmrw..here i am)) Can't Create Posts,(3 {optional}) Gets Notified about Trash Posts based on location, (4) Gets Gamified or Displayed on Leaderboard based on points they get for completing a collection of trash.
          
          (End_User) 🏄  : (1) can delete his/her own posts , We have MyPosts.tsx! (2) Sees and can create Trash Posts.

          PROFILE 🙇 🧮 : 

          Making a Profile after clicking that photoTypaStuff, Verification after signup with mail?, Logout in that profile.


*/}