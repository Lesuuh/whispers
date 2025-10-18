import { ModalProps } from "@/app/utils/types";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import React, { useState } from "react";

const categories = [
  "Thoughts",
  "Reflections",
  "Privacy",
  "Wellness",
  "Philosophy",
  "Tech",
  "Life",
];

const PostForm: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success" | null;
    text: string;
  }>({ type: null, text: "" });

  const queryClient = new QueryClient();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      const base_url = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${base_url}/posts`, formData);

      setMessage({
        type: "success",
        text:
          response.data.message || "Your whisper has been shared anonymously.",
      });

      setFormData({ title: "", category: "", content: "" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Something went wrong while posting. Please check your connection and try again.",
      });
    } finally {
      // Auto-clear message after 5 seconds
      setTimeout(() => setMessage({ type: null, text: "" }), 5000);
    }
  };
  return (
    <div className="">
      <div className="mt-5">
        <div className="flex flex-col items-start space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Share your thoughts, Anonymously
          </h2>
          <p className="text-sm text-gray-500">
            Express yourself freely without revealing your identity
          </p>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 rounded-full bg-gray-100 hover:bg-gray-200 p-2 transition-colors duration-200 group"
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
        </button>
      </div>
      <div>
        <form onSubmit={handlePost} className="my-10 space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wondering if we live in a simulation..."
              className="py-3 rounded-xl text-sm bg-white border border-gray-50 w-full px-4 outline-purple-700 focus:border-purple-600 focus:outline-none focus:ring-purple-600 focus:ring-1"
            />
          </div>
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category <span className="text-red-500">*</span>
            </label>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`px-4 py-2 font-heading text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                    formData.category === cat
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, category: cat });
                    setShowCustomCategory(false);
                  }}
                >
                  {cat}
                </button>
              ))}

              {/* Custom Category Toggle */}
              <button
                type="button"
                onClick={() => setShowCustomCategory(!showCustomCategory)}
                className="
    px-3 
    py-1.5 
    text-sm
    bg-purple-100 
    text-purple-700 
    font-semibold 
    rounded-lg 
    hover:bg-purple-200 
    hover:scale-105 
    transition 
    duration-200 
    ease-in-out
  "
              >
                + Custom
              </button>
            </div>
            {showCustomCategory && (
              <div>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Can't find your cateory, add a custom one"
                  className="py-3 rounded-xl text-sm text-heading bg-white border border-gray-50 w-full px-4 outline-purple-700 focus:border-purple-600 focus:outline-none focus:ring-purple-600 focus:ring-1"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="What's on your mind..."
              className="py-3 h-60 rounded-xl bg-white border border-gray-50 w-full px-4 outline-purple-700 focus:border-purple-600 focus:outline-none focus:ring-purple-600 focus:ring-1"
            />
          </div>
          {/* Message */}
          {message.type && (
            <div
              className={`mt-6 flex items-center gap-3 rounded-xl p-4 text-sm font-medium transition-all duration-500 ${
                message.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {message.type === "error" ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}
          <button
            type="submit"
            className="px-8 py-3 w-full bg-primary-500 text-white rounded-xl bg-gray-900 shadow hover:bg-purple-600  hover:scale-101 
    transition 
    duration-200 
    ease-in-out"
          >
            Air it Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
