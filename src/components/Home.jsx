import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Copy, PlusCircle,Save} from "lucide-react";
import { toast } from "react-hot-toast";
import { addToNotes, updateToNotes } from "../redux/notesSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.notes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content cannot be empty!");
      return;
    }
    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToNotes(paste));
    } else {
      // create
      dispatch(addToNotes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="w-full min-h-screen bg-[#0d0d1a] py-10 px-5 lg:px-0">
      <div className="max-w-[860px] mx-auto flex flex-col gap-y-6">
        {/* Top Section */}
        <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
          {pasteId ? "✏️ Edit Your Note" : "📋 Create a Note"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {pasteId
            ? "Modify and save your note below."
            : "Write and save your snippet or note."}
        </p>
      </div>
      
      {/* title input */}
      <div className="flex flex-row gap-x-3 items-center">
        <input
          type="text"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-[#1a1a2e] text-gray-200 border border-violet-800/40 rounded-lg px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600 transition"
        />
        <button
          onClick={createPaste}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg px-5 py-2.5 transition-all shadow-lg shadow-violet-900/30"
        >
          <Save size={16} />
          {pasteId ? "Update" : "Save"}
        </button>
        {pasteId && (
          <button
            onClick={resetPaste}
            title="New Paste"
            className="flex items-center gap-2 bg-[#1a1a2e] border border-violet-700/40 text-violet-400 hover:bg-violet-900/20 rounded-lg px-4 py-2.5 transition"
          >
            <PlusCircle size={18} />
          </button>
        )}
      </div>

      {/* Editor Box */}
        <div className="w-full flex flex-col rounded-xl border border-violet-800/30 bg-[#12121f] shadow-xl shadow-violet-950/20 overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e] border-b border-violet-800/20">
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-600 font-mono">
              {title.trim() ? title : "untitled.txt"}
            </span>
            <button
              onClick={() => {
                if (!value) return toast.error("Nothing to copy!");
                navigator.clipboard.writeText(value);
                toast.success("Copied to clipboard!");
              }}
              className="text-gray-500 hover:text-green-400 transition"
              title="Copy content"
            >
              <Copy size={18} />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here..."
            className="w-full bg-transparent text-gray-300 placeholder-gray-700 p-4 focus:outline-none resize-none font-mono text-sm leading-relaxed"
            rows={22}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
