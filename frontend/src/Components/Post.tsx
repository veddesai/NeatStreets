import React, { useState, useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config/config";
import { motion } from "framer-motion";

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

interface PostProps {
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
  deletable?: boolean;
  onDelete?: (id: string) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  description,
  imageUrl,
  address,
  reportedAt,
  status,
  reportedBy,
  assignedTo,
  completionTime,
  deletable,
  onDelete
}) => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user } = authContext;

  const [postStatus, setPostStatus] = useState<
    "NEW" | "IN_PROGRESS" | "COMPLETED"
  >(status);
  const [completionTimeState, setCompletionTimeState] = useState<
    string | undefined
  >(completionTime);
  const [postAssignedTo, setPostAssignedTo] = useState<User | undefined>(
    assignedTo
  );

  const handleAssignToMe = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/posts/${id}/assign`,
        {
          assignedTo: { id: user.id },
          status: "IN_PROGRESS",
        },
        { withCredentials: true }
      );
      setPostStatus("IN_PROGRESS");
      setPostAssignedTo(user);
      console.log(response.data);
    } catch (error) {
      console.error("Error assigning to helper:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${id}`, {
        withCredentials: true,
      });
      if(response.status == 200){
        console.log("Post deleted successfully:", response.data);
        if (onDelete) {
          onDelete(id); 
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleMarkAsCompleted = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/${id}/complete`,
        {
          status: "COMPLETED",
          completionTime: new Date().toISOString(),
        },
        { withCredentials: true }
      );
      setPostStatus("COMPLETED");
      setCompletionTimeState(new Date().toISOString());
      console.log(response.data);
    } catch (error) {
      console.error("Error marking post as completed:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImageModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto my-4 p-6 bg-white dark:bg-slate-900 border rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={imageUrl}
        alt="Trash Reported"
        className="w-max h-60 mx-auto rounded-md mb-4 cursor-pointer"
        onClick={openImageModal}
      />

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative p-4 bg-white dark:bg-slate-800 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="Full Image"
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
            />
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Post Description */}
      <p className="text-xl font-semibold mb-2 dark:text-white">
        {description}
      </p>

      {/* Location */}
      <div className="flex items-center text-gray-600 dark:text-gray-300 mt-4">
        <FaMapMarkerAlt className="mr-2" />
        <span>{address}</span>
      </div>

      {/* Post Status */}
      <div className="my-4">
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold cursor-pointer rounded-lg ${
            postStatus === "COMPLETED"
              ? "bg-green-100 text-green-600"
              : postStatus === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {postStatus === "COMPLETED"
            ? "Completed"
            : postStatus === "IN_PROGRESS"
            ? "In Progress"
            : "New"}
        </span>
      </div>

      {/* Post Reporter */}
      <div className="flex items-center mb-2">
        <div className="mr-2 text-2xl border-2 w-10 h-10 border-slate-600 dark:border-white bg-blue-600 text-center dark:bg-yellow-500 text-white rounded-full">
          {reportedBy?.username?.charAt(0)}
        </div>
        <span className="text-gray-700 dark:text-gray-300">
          Reported by:{" "}
          <span className="text-blue-600 dark:text-yellow-500">
            {reportedBy.fullname}
          </span>
        </span>
      </div>

      {/* Assigned To */}
      {postAssignedTo && (
        <div className="flex items-center mb-2">
          <MdOutlineAssignmentTurnedIn className="mr-2 text-2xl text-gray-500 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">
            Assigned to:{" "}
            <span className="font-extrabold">{postAssignedTo.fullname}</span>
          </span>
        </div>
      )}

      {/* Reported At */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Reported on: {new Date(reportedAt).toLocaleString()}
      </div>

      {/* Completion Time */}
      {completionTimeState && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Completed on: {new Date(completionTimeState).toLocaleString()}
        </div>
      )}

      {deletable && (
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}

      {/* Assign to me (only if the user is a HELPER and the post is new) */}
      {user?.role === Role.HELPER && postStatus === "NEW" && (
        <button
          className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 dark:bg-yellow-500 text-white font-semibold rounded-lg shadow-md dark:hover:bg-yellow-600"
          onClick={handleAssignToMe}
        >
          Assign to me
        </button>
      )}

      {/* Mark as Completed (only if the post is assigned to the current user and in progress) */}
      {user?.role === Role.HELPER &&
        postStatus === "IN_PROGRESS" &&
        postAssignedTo?.id === user.id && (
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
            onClick={handleMarkAsCompleted}
          >
            Mark as Completed
          </button>
        )}
    </motion.div>
  );
};

export default Post;
