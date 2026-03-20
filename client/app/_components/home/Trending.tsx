import { PostCard } from "../card/PostCard";
import { useTrending } from "@/app/hooks/useTrending";

const Trending = () => {
  const { trending, isLoading } = useTrending();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] space-y-24 py-12 animate-pulse">
        {/* Skeleton Section */}
        <section>
          <div className="mb-10 space-y-3">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-56 bg-gray-200 rounded" />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-24 py-12">
      {/* Trending Section */}
      {trending.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="mb-10">
            <h3 className="font-serif text-3xl md:text-4xl">Trending posts</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-400">
              {trending.length} posts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Trending;
