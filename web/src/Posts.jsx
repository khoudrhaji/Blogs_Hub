import { useEffect, useState } from "react";
import axios from "axios";

export default function Posts({ onSelect }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5001/api/posts?limit=10&page=${page}`
      );
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden slide-in">
      {/* Header */}
      <div className="px-8 py-8 border-b border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <h2 className="text-4xl font-bold text-white flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
            📝
          </span>
          Latest Posts
        </h2>
      </div>

      {/* Posts List */}
      <div className="p-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 rounded-full border-4 border-purple-400/30 border-t-purple-400 animate-spin"></div>
            </div>
            <p className="text-purple-300 mt-4">Loading amazing posts...</p>
          </div>
        )}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12 text-purple-300">
            <p className="text-xl">No posts yet. Start creating!</p>
          </div>
        )}
        <ul className="space-y-4">
          {posts.map((p, idx) => (
            <li
              key={p._id}
              onClick={() => onSelect?.(p._id)}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-purple-400/20 hover:border-purple-400/60 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden slide-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:via-blue-600/10 group-hover:to-pink-600/10 transition-all duration-300 pointer-events-none"></div>

              <div className="relative flex items-start gap-4 mb-3">
                <span className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {p.author?.name ? p.author.name[0].toUpperCase() : "A"}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 mb-1 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-purple-300 flex items-center gap-2">
                    <span className="font-semibold">
                      {p.author?.name || "Anonymous"}
                    </span>
                    <span className="text-purple-500">•</span>
                    <span>{new Date(p.publishedAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed group-hover:text-purple-100 transition-colors duration-300">
                {p.body?.slice(0, 150)}
                {p.body && p.body.length > 150 ? "..." : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="flex gap-4 justify-center items-center px-8 py-6 border-t border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 border border-purple-400/20 hover:border-purple-400/60"
        >
          ← Previous
        </button>
        <span className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-400/20 text-purple-200 font-semibold min-w-fit">
          Page <span className="ml-2 text-white font-bold">{page}</span>
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/50 btn-shine"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
