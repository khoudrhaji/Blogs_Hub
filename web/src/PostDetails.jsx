import { useEffect, useState } from "react";
import axios from "axios";

export default function PostDetails({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ name: "", content: "", email: "" });
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5001/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!comment.name || !comment.content)
      return alert("Name and content required");
    try {
      const res = await axios.post(
        `http://localhost:5001/api/posts/${postId}/comments`,
        comment
      );
      setPost(res.data);
      setComment({ name: "", content: "", email: "" });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed");
    }
  };

  if (!postId)
    return (
      <div className="text-center text-gray-500">Select a post to view</div>
    );
  if (loading) return <div className="text-center">Loading…</div>;
  if (!post)
    return <div className="text-center text-gray-500">Post not found</div>;

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden slide-in">
      {/* Header */}
      <div className="px-8 py-8 border-b border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold mb-6 transition duration-200 group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Posts
        </button>
        <h2 className="text-5xl font-black text-white mb-4 leading-tight">
          {post.title}
        </h2>
        <div className="flex items-center gap-4 text-purple-300 text-sm flex-wrap">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {post.author?.name ? post.author.name[0].toUpperCase() : "A"}
          </span>
          <span className="font-semibold text-purple-200">
            {post.author?.name || "Anonymous"}
          </span>
          <span className="text-purple-500">•</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 border-b border-purple-500/20">
        <p className="text-purple-100 text-lg leading-relaxed whitespace-pre-wrap font-light">
          {post.body}
        </p>
      </div>

      {/* Comments Section */}
      <div className="px-8 py-8 border-b border-purple-500/20">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400">
            💬
          </span>
          Comments ({post.comments?.length || 0})
        </h3>
        <ul className="space-y-4 mb-6">
          {post.comments?.length === 0 ? (
            <p className="text-center text-purple-400 py-8 text-lg">
              No comments yet. Be the first!
            </p>
          ) : (
            post.comments?.map((c, idx) => (
              <li
                key={c._id}
                className="p-5 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-purple-400/20 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 slide-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {c.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    {c.email && (
                      <div className="text-xs text-purple-400">{c.email}</div>
                    )}
                  </div>
                </div>
                <div className="text-purple-200 text-sm leading-relaxed">
                  {c.content}
                </div>
                <div className="text-xs text-purple-500 mt-3">
                  {new Date(c.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Add Comment Form */}
      <div className="px-8 py-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
        <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
          <span>✍️</span>
          Add Your Comment
        </h4>
        <form onSubmit={submitComment} className="space-y-4">
          <input
            value={comment.name}
            onChange={(e) => setComment({ ...comment, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          />
          <input
            value={comment.email}
            onChange={(e) => setComment({ ...comment, email: e.target.value })}
            placeholder="Email (optional)"
            className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          />
          <textarea
            value={comment.content}
            onChange={(e) =>
              setComment({ ...comment, content: e.target.value })
            }
            placeholder="Share your thoughts..."
            className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none min-h-[120px] transition-all duration-200"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 btn-shine transform hover:scale-105"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
