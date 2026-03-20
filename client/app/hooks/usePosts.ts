import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../utils/types";

const base_url = process.env.NEXT_PUBLIC_API_URL;

export const usePosts = (selectedCategory: string) => {
  // instant data from dexie
  const localPosts = useLiveQuery(
    () =>
      selectedCategory.trim() === ""
        ? db.posts.toArray()
        : db.posts.where("category").equals(selectedCategory).toArray(),
    [selectedCategory],
  );

  // const localPosts = useLiveQuery(() => db.posts.toArray());

  // fetch from api
  const query = useQuery({
    queryKey: ["posts", selectedCategory],
    queryFn: async () => {
      const res = await axios.get(
        `${base_url}/posts?category=${selectedCategory}`,
      );
      const posts: Post[] = Array.isArray(res.data) ? res.data : [];

      // Write fresh data into IDB
      await db.posts.bulkPut(posts);

      return posts;
    },
    staleTime: 1000 * 60 * 5,
    // initialData: localPosts ?? [],
  });

  return {
    posts: localPosts,
    isLoading: query.isLoading && !localPosts?.length,
    isError: query.isError,
  };
};
