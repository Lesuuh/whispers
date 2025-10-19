"use client";

import { useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Calendar, User, Clock, MessageCircle, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { timeAgo } from "@/app/utils/date";
import { CommentResponse, NewComment, Post } from "@/app/utils/types";

// ================== Component ==================
const Page = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  // 🔹 Fetch post
  const {
    data: post,
    isLoading: loadingPost,
    isError: errorPost,
  } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await axios.get<Post>(`${base_url}/posts/${postId}`);
      return res.data;
    },
  });

  const addComment = async (
    newComment: NewComment
  ): Promise<CommentResponse> => {
    const res = await axios.post(
      `${base_url}/posts/${postId}/comments`,
      newComment
    );
    return res.data;
  };

  // 🔹 Post comment
  const mutation = useMutation<CommentResponse, Error, NewComment>({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      console.error("Error adding comment:", error.message);
    },
  });

  // 🔹 Handle form submit
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    mutation.mutate({ comment });

    setComment("");
  };

  // 🔹 Handle share
  const handleShare = async () => {
    console.log(post?.id);
    console.log(postId);

    const shareData = {
      title: post?.title,
      text: post?.content,
      url: `${window.location.origin}/posts/${postId}`,
    };

    console.log(shareData);

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Share failed", error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Whisper link copied");
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post?.id}/share`
      );
    } catch (err) {
      console.error("Share count update failed:", err);
    }
  };

  if (loadingPost)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading Whisper......
      </div>
    );

  if (errorPost)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load post 😔
      </div>
    );

  if (!post)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Post not found
      </div>
    );

  // const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
  //   dateStyle: "medium",
  //   timeStyle: "short",
  // });

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      {/* Category */}
      <span className="inline-block px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wide">
        {post.category}
      </span>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 leading-snug">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        {/* Left side - Meta data */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{post.author || "Anonymous"}</span>
          </div>
          <span className="hidden sm:inline text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{timeAgo(post.created_at)}</span>
          </div>
          <span className="hidden sm:inline text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>~ 2 min read</span>
          </div>
        </div>

        {/* Right side - Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all duration-300  w-full sm:w-auto"
          aria-label="Share post"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Post Content */}
      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Comments */}
      <div className="mt-12 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-700" />
            Join the Discussion
          </h2>

          {/* Engagement Stats */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "comment" : "comments"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              {post.share_count || 0}{" "}
              {post.share_count === 1 ? "share" : "shares"}
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full"
        >
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="💭 Share your thoughts..."
            rows={3}
            className="flex-1 w-full py-3 rounded-xl text-sm bg-white border border-gray-200 px-4 text-gray-700 
              focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all duration-200 resize-none"
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-purple-700 hover:scale-105 transition-all duration-200 disabled:opacity-60"
          >
            {mutation.isPending ? "Posting..." : "Comment"}
          </button>
        </form>

        {/* Comments List */}
        <div className="mt-8 space-y-6">
          {loadingPost ? (
            // Skeleton loading
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="border border-gray-100 bg-gray-50 rounded-2xl p-4 animate-pulse"
                >
                  <div className="flex justify-between mb-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : post.comments.length === 0 ? (
            <p className="text-gray-500 text-sm italic text-center">
              No comments yet — be the first to share your thoughts 💭
            </p>
          ) : (
            post.comments.map((c) => (
              <div
                key={c.id}
                className="border border-gray-100 bg-gray-50 rounded-2xl p-4 hover:shadow-sm transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {c.author || "Anonymous"}
                  </p>
                  <span className="text-xs text-gray-500">
                    {timeAgo(c.created_at)}
                  </span>
                </div>
                <div className="prose prose-gray max-w-none whitespace-pre-line text-gray-700 text-sm leading-relaxed">
                  <ReactMarkdown>{c.comment}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
