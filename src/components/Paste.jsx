 import React, { useState } from "react";
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromNotes } from "../redux/notesSlice";
import { toast } from "react-hot-toast";
import { FormatDate } from "../utils/formatDate";

const Paste = () => {
  const notes = useSelector((state) => state.paste.notes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = notes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromNotes(pasteId));
  }

  return (
    <div className="w-full min-h-screen bg-[#0d0d1a] py-10 px-5 lg:px-0">
      <div className="max-w-[860px] mx-auto flex flex-col gap-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
            🗂️ All Notes
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {notes.length} saved notes{notes.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-[#1a1a2e] border border-violet-800/30 rounded-lg px-4 py-2.5">
          <svg className="text-gray-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search notes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-gray-300 placeholder-gray-600 focus:outline-none w-full text-sm"
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste?._id}
                className="bg-[#12121f] border border-violet-800/20 rounded-xl p-5 flex flex-col sm:flex-row justify-between gap-4 hover:border-violet-600/40 hover:shadow-lg hover:shadow-violet-950/30 transition-all"
              >
                {/* Content */}
                <div className="flex flex-col gap-y-2 flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-100 truncate">
                    {paste?.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 font-mono leading-relaxed">
                    {paste?.content}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                    <Calendar size={13} />
                    <span>{FormatDate(paste?.createdAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col justify-end items-end gap-2">
                  <div className="flex gap-2">
                    <a href={`/?pasteId=${paste?._id}`}>
                      <button
                        title="Edit"
                        className="p-2 rounded-lg bg-[#1a1a2e] border border-violet-800/30 text-gray-400 hover:text-violet-400 hover:border-violet-500 transition"
                      >
                        <PencilLine size={16} />
                      </button>
                    </a>

                    <button
                      title="Delete"
                      onClick={() => handleDelete(paste?._id)}
                      className="p-2 rounded-lg bg-[#1a1a2e] border border-violet-800/30 text-gray-400 hover:text-pink-500 hover:border-pink-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    <a href={`/pastes/${paste?._id}`} target="_blank" rel="noreferrer">
                      <button
                        title="View"
                        className="p-2 rounded-lg bg-[#1a1a2e] border border-violet-800/30 text-gray-400 hover:text-orange-400 hover:border-orange-400 transition"
                      >
                        <Eye size={16} />
                      </button>
                    </a>

                    <button
                      title="Copy"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to clipboard!");
                      }}
                      className="p-2 rounded-lg bg-[#1a1a2e] border border-violet-800/30 text-gray-400 hover:text-green-400 hover:border-green-400 transition"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-600">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-lg font-medium text-gray-500">No Notes found</p>
              <p className="text-sm mt-1">
                {searchTerm ? "Try a different search term." : "Create your first note from the Home page."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;