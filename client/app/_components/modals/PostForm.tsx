"use client";
import api from "@/app/api";
import { ModalProps } from "@/app/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { X, CheckCircle } from "lucide-react";
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
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [message, setMessage] = useState<{ type: string | null; text: string }>(
    { type: null, text: "" },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      setMessage({
        type: "error",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      await api.post(`/posts`, formData);

      setMessage({
        type: "success",
        text: "Post submitted successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["posts"] });

      setTimeout(() => setIsOpen(false), 1500);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Something went wrong." });
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-3xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif text-3xl tracking-tight text-black">
          Create post
        </h2>

        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">
          Anonymous • No account required
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-300 hover:text-black transition-colors"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      <form onSubmit={handlePost} className="space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Title
          </label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title..."
            className="w-full border-b border-gray-100 py-2 font-serif text-xl outline-none focus:border-black transition-colors bg-transparent"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Category
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, category: cat }));
                  setShowCustomCategory(false);
                }}
                className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-tighter transition-all
                ${
                  formData.category === cat
                    ? "bg-black text-white"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setShowCustomCategory(!showCustomCategory)}
              className="px-4 py-1.5 rounded-full border border-dashed border-gray-200 font-mono text-[10px] uppercase text-gray-400 hover:text-black"
            >
              + Custom
            </button>
          </div>

          {showCustomCategory && (
            <input
              name="category"
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full border-b border-gray-100 p-2 font-mono text-xs mt-2 outline-none focus:border-black transition-colors"
            />
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Content
          </label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your thoughts..."
            className="w-full h-48 bg-gray-50 rounded-2xl p-6 font-serif text-lg outline-none focus:bg-white border border-transparent focus:border-gray-100 transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black py-5 rounded-full font-mono text-xs uppercase tracking-[0.3em] text-white hover:bg-gray-800 transition-all"
        >
          Post
        </button>

        {/* Feedback */}
        {message.type === "success" && (
          <div className="flex items-center justify-center gap-2 text-black font-mono text-[10px] uppercase tracking-widest">
            <CheckCircle size={14} /> {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default PostForm;
