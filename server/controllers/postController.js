const getRandomName = require("../utils/getRandomName");
const supabase = require("../supabase");

const getAllPosts = async (req, res) => {
  const { category } = req.query;

  try {
    let query = supabase
      .from("posts")
      .select(
        `
      *,
      comments (
        *,
        created_at
      )
    `,
      )
      .order("created_at", { ascending: false })
      .order("created_at", { referencedTable: "comments", ascending: false });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const sortedData = data.map((post) => ({
      ...post,
      comments: post.comments?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      ),
    }));
    // Return posts
    res.status(200).json(sortedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createPost = async (req, res) => {
  try {
    // post a blog
    const { title, category, content } = req.body;
    // validate the req fields
    if (!title || !category || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const anonId = req.user.id;

    const newPost = {
      title: title,
      category: category,
      content: content,
      author: getRandomName().username,
      anon_id: anonId,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert([newPost])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }

    res
      .status(201)
      .json({ message: "Post created successfully", post: data[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the post and its related comments
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        comments (
          id,
          author,
          comment,
          created_at
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const comments = async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;

  if (!comment) {
    res.status(400).json("Please type a comment");
  }

  const newComment = {
    post_id: id,
    author: getRandomName(),
    comment: comment,
  };

  try {
    const { error } = await supabase.from("comments").insert([newComment]);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }

    res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const incrementShare = async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Get current share_count
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("share_count")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Step 2: Increment count
    const newCount = (post.share_count || 0) + 1;

    // Step 3: Update share_count
    const { error: updateError } = await supabase
      .from("posts")
      .update({ share_count: newCount })
      .eq("id", id);

    if (updateError) throw updateError;

    // Step 4: Respond
    res.status(200).json({ message: "Share count updated", newCount });
  } catch (error) {
    console.error("Error incrementing share count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTrendingPosts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, comments (*, created_at)")
      .order("share_count", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Trending posts fetched successfully",
      trending: data || [],
    });
  } catch (error) {
    console.error("An error occurred while fetching trending posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  comments,
  incrementShare,
  getTrendingPosts,
};
