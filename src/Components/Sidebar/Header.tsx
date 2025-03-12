import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import noted from "../../assets/Group 1.svg";
import closeIcon from "../../assets/closeIcon.svg";
import search from "../../assets/Frame.svg";
import { RenderContext } from "../../RenderContext";

interface NoteType {
  id: string;
  title: string;
  preview: string;
  createdAt: string;
  updatedAt: string;
  folderId: string;
  folder: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

const Header = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchBox, setSearchBox] = useState("");
  const [notes, setNotes] = useState<NoteType[]>([]);
  const { setChange } = useContext(RenderContext);

  const addNote = async () => {
    if (!folderId) {
      alert("Please select the folder!!!");
      return;
    }

    try {
       await axios.post(
        "https://nowted-server.remotestate.com/notes",
        {
          folderId: folderId,
          title: "New Note",
          content: "You can start writing here...",
          isFavorite: false,
          isArchived: false,
        }
      );
      alert("Note created successfuly!!!")
      setChange(true);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const searchNotes = async () => {
    if (!searchBox.trim()) {
      setNotes([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nowted-server.remotestate.com/notes?archived=false&deleted=false&page=1&limit=10&search=${searchBox}`
      );
      setNotes(response.data.notes);
    } catch (err) {
      console.error("Error searching notes:", err);
      setNotes([]);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchBox("");
    setNotes([]);
  };

  return (
    <div className=" flex flex-col gap-7">
      <div className="flex justify-between">
        <img src={noted} alt="Noted Logo" />

        <img
          src={isSearchVisible ? closeIcon : search}
          alt={isSearchVisible ? "Close Search" : "Search Icon"}
          className="cursor-pointer"
          onClick={handleSearchIconClick}
        />
      </div>
      <div className="text-center">
        {isSearchVisible ? (
          <div className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchBox}
                onChange={(e) => setSearchBox(e.target.value)}
                placeholder="Search notes..."
                className="border text-lg w-full bg-gray-800 px-4 py-2 rounded"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchNotes();
                  }
                }}
              />
            </div>
            {notes.length > 0 && (
              <div className="absolute mt-2 w-full bg-gray-800 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <ul className="space-y-2">
                  {notes.map((note) => (
                    <li
                      key={note.id}
                      className="p-3 bg-gray-700 rounded-lg flex flex-col gap-3 cursor-pointer"
                    >
                      <NavLink
                        to={`/folder/${note.folder.name}/${note.folderId}/notes/${note.id}`}
                        className="text-black hover:text-white"
                      >
                        {note.title}
                      </NavLink>
                      <p className="text-sm text-gray-500">{note.preview}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            className="border text-lg w-full bg-gray-500 px-10 py-2 rounded"
            onClick={addNote}
          >
            + New Note
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
