"use client";
import axios from "axios";
import { PostCard } from "../card/PostCard";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/app/utils/types";
import { usePathname } from "next/navigation";

const FeedsSection = ({ selectedCategory }: { selectedCategory: string }) => {
  const pathname = usePathname();
  const isFeedsPage = pathname === "/feeds";
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    // Added selectedCategory to queryKey so it refetches on click
    queryKey: ["posts", selectedCategory], 
    queryFn: async () => {
      const res = await axios.get(`${base_url}/posts?category=${selectedCategory}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-gray-400 animate-pulse">
          Intercepting_Signals...
        </p>
      </div>
    );
  }

  // Visual layout for "No Posts"
  if (posts.length === 0) {
    return (
      <div className="border-2 border-dashed border-gray-200 py-32 text-center">
        <h4 className="font-serif text-3xl italic text-gray-300">The void is silent.</h4>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-400">
          No whispers found in {selectedCategory || "All"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* 01. Primary Feed */}
      <section>
        <div className="mb-8 flex items-end justify-between border-b border-black pb-2">
          <h3 className="font-serif text-2xl italic tracking-tight text-black">
            Latest Arrivals
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            {posts.length} Messages
          </span>
        </div>

        {/* Using 'gap-px bg-black' on the container + 'bg-white' on cards 
            creates beautiful 1px divider lines between posts automatically.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black border border-black overflow-hidden">
          {posts.map((post) => (
            <div key={post.id} className="bg-white hover:bg-gray-50 transition-colors">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Optional: Secondary "Archived" section could go here */}
    </div>
  );
};

export default FeedsSection;