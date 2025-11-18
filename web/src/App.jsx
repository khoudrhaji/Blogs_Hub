import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import axios from "axios";
import Posts from "./Posts";
import PostEditor from "./PostEditor";
import PostDetails from "./PostDetails";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedPostId, setSelectedPostId] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/users/");
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5001/api/users/",
      formData
    );
    setFormData({ name: "", email: "", phone: "" });
    getUsers();
  };

  const onChangeHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 z-10">
        {/* Header */}
        <header className="mb-16 text-center slide-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            {/*  */}
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Blog Hub
            </h1>
          </div>
          <p className="text-xl text-purple-200 font-semibold">
            Create, Share & Engage
          </p>
        </header>

        {/* Users Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="inline-block w-2 h-10 bg-gradient-to-b from-blue-400 to-purple-400 rounded"></span>
            Community Members
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {users.map((user, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {user.name ? user.name[0].toUpperCase() : "?"}
                  </span>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg">
                      {user.name}
                    </div>
                    <div className="text-sm text-purple-300">{user.email}</div>
                    <div className="text-sm text-blue-300">{user.phone}</div>
                  </div>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="col-span-2 text-center py-12 text-purple-300">
                <p className="text-lg">No members yet. Be the first to join!</p>
              </div>
            )}
          </div>

          {/* Add User Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-500/20 slide-in"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="inline-block w-1 h-8 bg-gradient-to-b from-green-400 to-blue-400 rounded"></span>
              Add New Member
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={onChangeHandle}
                  value={formData.name}
                  className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={onChangeHandle}
                  value={formData.email}
                  className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={onChangeHandle}
                  value={formData.phone}
                  className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 btn-shine transform hover:scale-105"
            >
              Add Member
            </button>
          </form>
        </section>

        {/* Post Editor Section */}
        <section className="mb-16">
          <PostEditor
            onCreate={(post) => {
              console.log("created", post);
            }}
          />
        </section>

        {/* Posts Section */}
        <section>
          {selectedPostId ? (
            <PostDetails
              postId={selectedPostId}
              onBack={() => setSelectedPostId(null)}
            />
          ) : (
            <Posts onSelect={setSelectedPostId} />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
