import { Copy, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allPastes = useSelector((state) => state.paste.notes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="w-full min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-400 text-lg">Paste not found.</p>
          <button
            onClick={() => navigate("/pastes")}
            className="mt-4 text-violet-400 hover:underline text-sm"
          >
            ← Back to all pastes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0d0d1a] py-10 px-5 lg:px-0">
      <div className="max-w-[860px] mx-auto flex flex-col gap-y-6">

        {/* Back */}
        <button
          onClick={() => navigate("/pastes")}
          className="flex items-center gap-2 text-gray-500 hover:text-violet-400 transition text-sm w-fit"
        >
          <ArrowLeft size={16} /> Back to Pastes
        </button>

        {/* Title */}
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full bg-[#1a1a2e] text-gray-300 border border-violet-800/30 rounded-lg px-4 py-2.5 cursor-not-allowed opacity-80 focus:outline-none"
        />

        {/* Viewer Box */}
        <div className="w-full flex flex-col rounded-xl border border-violet-800/30 bg-[#12121f] shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e] border-b border-violet-800/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-600 font-mono">{paste.title}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to clipboard!");
              }}
              className="text-gray-500 hover:text-green-400 transition"
            >
              <Copy size={18} />
            </button>
          </div>

          <textarea
            value={paste.content}
            disabled
            rows={22}
            className="w-full bg-transparent text-gray-400 p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none cursor-default"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;