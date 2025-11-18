import { useState } from "react";
import axios from "axios";

export default function PostEditor({ onCreate }) {
  const [form, setForm] = useState({ title: "", body: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return alert("Please add title & content");
    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:5001/api/posts", form);
      setForm({ title: "", body: "" });
      onCreate?.(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-purple-500/20 slide-in"
    >
      <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400">
          ✨
        </span>
        Create New Post
      </h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-purple-300 mb-3 uppercase tracking-wider">
            Post Title
          </label>
          <input
            value={form.title}
            placeholder="What's on your mind?"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-5 py-4 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-purple-300 mb-3 uppercase tracking-wider">
            Content
          </label>
          <textarea
            value={form.body}
            placeholder="Share your thoughts, ideas, and stories..."
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full px-5 py-4 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none min-h-[180px] transition-all duration-200"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 disabled:from-slate-600 disabled:via-slate-600 disabled:to-slate-600 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-green-500/50 btn-shine transform hover:scale-105 text-lg"
      >
        {isSubmitting ? "Publishing..." : "Publish Post"}
      </button>
    </form>
  );
}
