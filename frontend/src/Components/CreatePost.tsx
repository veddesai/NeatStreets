import { useState, ChangeEvent, useRef, useContext } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "../config/config";



type PostStatus = "NEW" | "IN_PROGRESS" | "COMPLETED";

const CreatePost: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, isAuthenticated } = authContext;

  const [postContent, setPostContent] = useState({
    image: null as File | null,
    text: "",
    reportedAt: new Date(),
    status: "NEW" as PostStatus,
    reportedBy: user?.id as string,
    completionTime: null as Date | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postContent.text.trim() || !postContent.image) {
      return; // Ensure both text and image are filled
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("text", postContent.text);
    formData.append("image", postContent.image); // Append the actual image file
    formData.append("status", postContent.status);
    formData.append("reportedAt", postContent.reportedAt.toISOString());
    formData.append("reportedBy", postContent.reportedBy);

    try {
    await axios.post(`${API_URL}/posts/post`,formData);


      // Reset the form after successful submission
      setPostContent({
        ...postContent,
        text: "",
        image: null,
        status: "NEW",
        completionTime: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input field
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
        Create Post
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          className="w-full p-2 my-4 h-24 resize-none bg-slate-100 focus:outline-none dark:bg-slate-800 rounded-lg"
          placeholder="Did you spot unattended trash?"
          value={postContent.text}
          onChange={handleInputChange}
        />

        <label htmlFor="post-input" className="cursor-pointer">
          <div className="p-3 my-4 flex justify-center items-center w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
            <h5 className="text-center">
              {postContent.image?.name
                ? postContent.image?.name
                : "UPLOAD IMAGE"}
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
          ref={fileInputRef} // Attach the ref to the file input
          onChange={handleFileChange} // Handle file input
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
