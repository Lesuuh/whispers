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
    `
      )
      .order("created_at", { ascending: false })
      .order("created_at", { referencedTable: "comments", ascending: false });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    console.log(data);

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const sortedData = data.map((post) => ({
      ...post,
      comments: post.comments?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
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
    const newPost = {
      title: title,
      category: category,
      content: content,
      author: getRandomName(),
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
      `
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
  console.log(req.body);

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

module.exports = { getAllPosts, createPost, getPost, comments };
