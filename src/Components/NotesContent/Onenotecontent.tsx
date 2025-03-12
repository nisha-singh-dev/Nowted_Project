import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import options from "../../assets/options.svg";
import Options from "./Options";
import date from "../../assets/date.svg";
import folder from "../../assets/folder.svg";
import { RenderContext } from "../../RenderContext";
import Restorenote from "./Restorenote";

interface NoteType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  folderId: string;
  isFavorite: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  deletedAt : string;
}

interface FolderType {
  id: string;
  name: string;
}

const Onenotecontent = () => {
  const { folderName, notesId } = useParams<{ folderName: string; notesId: string }>();
  const [note, setNote] = useState<NoteType | null>(null);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(folderName || null);
  const [showFolderDropdown, setShowFolderDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { setChange, mainchange, setMainchange } = useContext(RenderContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoteDetails = async () => {
      if (!notesId) return;
      try {
        const response = await axios.get(`https://nowted-server.remotestate.com/notes/${notesId}`);
        setNote(response.data.note);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    if (mainchange) {
      setMainchange(!mainchange);
    }
    fetchNoteDetails();
  }, [notesId, mainchange, setMainchange]);

  const fetchFolders = async () => {
    try {
      const response = await axios.get("https://nowted-server.remotestate.com/folders");
      setFolders(response.data.folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const handleFolderSelection = async (folderId: string, folderName: string) => {
    if (!note) return;

    try {
      await axios.patch(`https://nowted-server.remotestate.com/notes/${note.id}`, {
        folderId,
      });

      setSelectedFolder(folderName); 
      setShowFolderDropdown(false); 
      navigate(`/folder/${folderName}/${folderId}`); 
    } catch (error) {
      console.error("Error updating note's folder:", error);
    }
  };

  const handleEdit = (field: "title" | "content", value: string) => {
    if (!note) return;

    setNote({ ...note, [field]: value });

    setTimeout(async () => {
      try {
        await axios.patch(`https://nowted-server.remotestate.com/notes/${note.id}`, {
          [field]: value,
        });
        setChange(true);
      } catch (error) {
        console.error(`Error updating ${field}:`, error);
      }
    }, 2000);
  };

  if (!note) {
    return <p className="text-white text-center"></p>;
  }

  return (
    <>
    {note.deletedAt?<Restorenote/>:
    
    <div className="flex flex-col w-6/10 h-screen p-4 text-white bg-gray-950">
      <div className="flex p-4 justify-between">
        <input
          type="text"
          value={note.title}
          onChange={(e) => handleEdit("title", e.target.value)}
          className="bg-transparent text-xl font-bold outline-none border-gray-400 focus:border-blue-400 w-full"
        />
        <img src={options} alt="Options" onClick={() => setShowOptions(!showOptions)} className="cursor-pointer" />
      </div>

      {showOptions && (
        <Options noteId={note.id} isFavorite={note.isFavorite} isArchived={note.isArchived} />
      )}

      <hr className="border-t-2 border-gray-400 my-2" />
      <div className="text-gray-300 p-4">
        <div className="flex gap-4">
          <img src={date} alt="" />
          <span className="font-semibold">Date:</span>{" "}
          <p className="pl-2 underline">{new Date(note.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-4 relative">
          <img src={folder} alt="" />
          <span className="font-semibold">Folder:</span>
          <p 
            className="pl-2 underline cursor-pointer" 
            onClick={() => { fetchFolders(); setShowFolderDropdown(!showFolderDropdown); }}
          >
            {selectedFolder}
          </p>

          {showFolderDropdown && (
            <div className="absolute bg-gray-800 shadow-md p-2 rounded-md mt-6 max-h-60 overflow-auto">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleFolderSelection(folder.id, folder.name)}
                >
                  {folder.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <textarea
        value={note.content}
        onChange={(e) => handleEdit("content", e.target.value)}
        className="mt-4 text-lg pl-4 bg-transparent outline-none w-full h-full resize-none"
      />
    </div>
    
    }
  </>
  );
};

export default Onenotecontent;

