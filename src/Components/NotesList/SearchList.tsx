import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

interface NoteType {
    id: string;
    title: string;
    preview: string;
    folderId: string;
    folder: {
      id: string;
      name: string;
    };
  }

const SearchList = () => {
  const [searchBox, setSearchBox] = useState("");
  const [notes, setNotes] = useState<NoteType[]>([]);
  
  const searchNotes = async () => {
    if (!searchBox) return;


    try {
      const response = await axios.get(
        `https://nowted-server.remotestate.com/notes?archived=false&deleted=false&page=1&limit=10&search=${searchBox}`
      );

      setNotes(response.data.notes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-5 h-screen flex flex-col">
     
      <div className="flex gap-2">
        <input
          type="text"
          value={searchBox}
          onChange={(e) => setSearchBox(e.target.value)}
          placeholder="Search notes..."
          className="border p-2 w-full bg-gray-400 rounded"
        />
        <button onClick={searchNotes} className="bg-slate-400 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>
  
   
      <div className="mt-4 flex-1 overflow-y-auto max-h-[calc(100vh-8rem)]
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:bg-gray-100">
        {notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="p-3 bg-slate-400 rounded-lg flex flex-col gap-3 cursor-pointer">
                <NavLink to={`/search/${note.folder.name}/${note.folderId}/notes/${note.id}`} className="text-black hover:text-white">
                  {note.title}
                </NavLink>
                <p className="text-sm text-gray-500">{note.preview}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes found.</p>
        )}
      </div>
    </div>
  );
  
};

export default SearchList;

