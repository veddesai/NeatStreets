import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

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
  location: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: User;
  assignedTo: User | undefined;
  completionTime: string | null;
  editable: boolean;
}

const Post: React.FC<PostProps> = ({
  description,
  imageUrl,
  location,
  reportedAt,
  status,
  reportedBy,
  assignedTo,
  completionTime,
  editable,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImageModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-4 p-6 bg-white dark:bg-slate-700 rounded-lg shadow-lg">
      <img
        src={imageUrl}
        alt="Trash Reported"
        className="w-full h-60 object-cover rounded-md mb-4 cursor-pointer"
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
        <span>{location}</span>
      </div>

      {/* Post Status */}

      <div className="my-4">
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold cursor-pointer rounded-lg ${
            status === "COMPLETED"
              ? "bg-green-100 text-green-600"
              : status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status === "COMPLETED"
            ? "Completed"
            : status === "IN_PROGRESS"
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
          Reported by: <span className=" text-blue-600 dark:text-yellow-500">{reportedBy.fullname}</span>
        </span>
      </div>

      {/* Assigned To */}
      {assignedTo && (
        <div className="flex items-center mb-2">
          <MdOutlineAssignmentTurnedIn className="mr-2 text-2xl text-gray-500 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">
            Assigned to: {assignedTo.fullname}
          </span>
        </div>
      )}

      {/* Reported At */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Reported on: {new Date(reportedAt).toLocaleString()}
      </div>

      {/* Completion Time */}
      {completionTime && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Completed on: {new Date(completionTime).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default Post;
