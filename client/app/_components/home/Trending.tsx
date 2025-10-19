"use client";

import axios from "axios";
import { PostCard } from "../card/PostCard";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/app/utils/types";
import { usePathname } from "next/navigation";

const FeedsSection = ({ selectedCategory }: { selectedCategory: string }) => {
  const pathname = usePathname();
  const isFeedsPage = pathname === "/feeds";
  const fetchPosts = async () => {
    const base_url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(
      `${base_url}/posts?category=${selectedCategory}`
    );
    return res.data;
  };
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const filteredPosts =
    selectedCategory !== " "
      ? posts.filter((post) => post.category === selectedCategory)
      : posts;

  const latestPosts = filteredPosts.slice(0, 6);
  const allPosts = filteredPosts.slice(6);

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading whispers...</div>
    );
  }

  return (
    <div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Latest Whispers
        </h3>

        {latestPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <h4 className="text-lg font-semibold text-gray-700">
              No Whispers found
            </h4>
            <p className="text-gray-500 mt-1">
              There are no whispers under the &quot;{selectedCategory}&quot;
              category yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* all feeds  */}
      {isFeedsPage && allPosts.length > 0 && (
        <div className="my-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Whispers</h3>

          {allPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <h4 className="text-lg font-semibold text-gray-700">
                No Whispers found
              </h4>
              <p className="text-gray-500 mt-1">
                There are no whispers under the &quot;{selectedCategory}&quot;
                category yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedsSection;
