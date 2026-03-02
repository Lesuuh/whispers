"use client";
import { useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { timeAgo } from "@/app/utils/date";
import { CommentResponse, NewComment, Post } from "@/app/utils/types";
import api from "@/app/api";

const Page = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { data: post, isLoading: loadingPost } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await api.get<Post>(`/posts/${postId}`);
      return res.data;
    },
  });

  console.log(post);
  const mutation = useMutation<CommentResponse, Error, NewComment>({
    mutationFn: async (newComment) => {
      const res = await api.post(`/posts/${postId}/comments`, newComment);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      setComment("");
    },
  });

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    mutation.mutate({ comment });
  };

  if (loadingPost)
    return (
      <div className="flex h-screen items-center justify-center font-mono text-[10px] uppercase tracking-[0.5em] text-gray-300">
        Loading...
      </div>
    );

  return (
    <main className="bg-white min-h-screen pt-32 pb-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <header className="mb-20">
          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-black font-light mb-6">
            {post?.title}
          </h1>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-300">
            {post?.category} • By {post?.author} •{" "}
            {timeAgo(post?.created_at || "")}
          </div>
        </header>

        {/* Content Body */}
        <article className="prose prose-neutral max-w-none mb-40">
          <div className="font-serif text-xl md:text-2xl leading-[1.8] text-gray-800">
            <ReactMarkdown>{post?.content || ""}</ReactMarkdown>
          </div>
        </article>

        {/* The Sleek Echo Section */}

        <section className="mt-32 pt-16 border-t border-gray-50">
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-serif text-2xl italic text-gray-900">Echoes</h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-300">
              {post?.comments.length} Signals
            </span>
          </div>

          {/* Input: Replaced with a subtle inset field for contrast */}
          <form onSubmit={handleCommentSubmit} className="mb-24">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add to the void..."
              className="w-full bg-gray-50/50 rounded-2xl p-6 font-serif text-lg outline-none focus:bg-white focus:ring-1 focus:ring-purple-100 transition-all resize-none placeholder:text-gray-300"
              rows={2}
            />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-purple-600 transition-all"
              >
                {mutation.isPending ? "Sending..." : "Post Whisper →"}
              </button>
            </div>
          </form>

          {/* Comments List: Subtle Left-Accent for Contrast */}
          <div className="space-y-12">
            {post?.comments.map((c) => (
              <div key={c.id} className="relative pl-8 group">
                {/* The "Anchor Line" - very faint but creates contrast */}
                <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-gray-100 group-hover:bg-purple-200 transition-colors" />

                <div className="font-serif text-lg text-gray-700 leading-relaxed mb-3">
                  <ReactMarkdown>{c.comment}</ReactMarkdown>
                </div>

                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest">
                  <span className="text-gray-900 font-bold">
                    {c.author || "Anonymous"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">{timeAgo(c.created_at)}</span>
                </div>
              </div>
            ))}

            {post?.comments.length === 0 && (
              <p className="text-center font-serif italic text-gray-300 py-10">
                Silence. Add the first echo.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
