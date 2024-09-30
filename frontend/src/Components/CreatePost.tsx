import { useState, ChangeEvent, useRef, useContext } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "../config/config";

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

type PostStatus = "NEW" | "IN_PROGRESS" | "COMPLETED";

interface CreatePostProps {
  onPostCreated: (newPost: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  
  const { user, isAuthenticated } = authContext;

  const [postContent, setPostContent] = useState({
    image: null as File | null,
    description: "",
    reportedAt: new Date(),
    status: "NEW" as PostStatus,
    reportedBy: {
      id: user?.id || "",  
      email: user?.email || "",
      fullname: user?.fullname || "Unknown User", 
      username: user?.username || "",
      role: Role.END_USER,
    } as User,
    completionTime: null as Date | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postContent.description.trim() || !postContent.image) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", postContent.image!.name);
      formData.append("file", postContent.image!);
      
      // For Just Image Upload
      const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // For Post Create with Image
      const imageUrl = uploadResponse.data.url;
      const postData = {
        description: postContent.description,
        status: postContent.status,
        reportedAt: postContent.reportedAt.toISOString(),
        reportedBy: postContent.reportedBy,
        imageUrl: imageUrl,
      };
      

      const response = await axios.post(`${API_URL}/posts/create`, postData, {
        withCredentials: true,
      });
      const newPost = response.data;
      onPostCreated(newPost);

      // Reset the form after successful submission
      setPostContent((prevContent) => ({
        ...prevContent,
        description: "",
        status: "NEW",
        completionTime: null,
        image: null,
        reportedBy: {
          id: user?.id || "",
          email: user?.email || "",
          fullname: user?.fullname || "Unknown User",
          username: user?.username || "",
          role: Role.END_USER,
        }, // Reset reportedBy
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPostContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPostContent((prevContent) => ({
        ...prevContent,
        image: files[0], // Safely store the file
      }));
    }
  };

  return (
    <div className="mx-auto my-4 w-full max-w-2xl max-lg:max-w-lg p-4 bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg shadow-md">
      <h1 className="text-center my-4 text-4xl font-bold uppercase">
        Create Trash Report
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="description"
          className="w-full p-2 my-4 h-24 resize-none bg-slate-100 focus:outline-none dark:bg-slate-800 rounded-lg"
          placeholder="Did you spot unattended trash?"
          value={postContent.description}
          onChange={handleInputChange}
        />

        <label htmlFor="post-input" className="cursor-pointer">
          <div className="p-3 my-4 flex justify-center items-center w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
            <h5 className="text-center">
              {postContent.image?.name || "UPLOAD IMAGE"}
            </h5>
            <IoImagesOutline className="ml-2 text-2xl" />
          </div>
        </label>
        <input
          id="post-input"
          type="file"
          name="image"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="flex justify-between mt-2">
          <h5 className="text-red-400">*Image of trash is mandatory.</h5>
          <button
            type="submit"
            className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 dark:bg-yellow-500 hover:dark:bg-yellow-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
