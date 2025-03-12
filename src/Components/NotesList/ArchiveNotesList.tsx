import { useState, useEffect } from "react";
import axios from "axios";
import ArchiveNote from "./ArchiveNote";
import { useContext } from "react";
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

const ArchiveNotesList = () => {
  const [arcNotes, setArcNotes] = useState<NoteType[]>([]);
  const {change,setChange} = useContext(RenderContext)
  useEffect(() => {
    const fetchArcNotes = async () => {
      try {
        const response = await axios.get(
          `https://nowted-server.remotestate.com/notes?archived=true&deleted=false`
        );
        setArcNotes(response.data.notes);
        
      } catch (error) {
        console.error("Error fetching archives notes:", error);
      }
    };
    if(change){
      setChange(!change)
    }
    fetchArcNotes();
  }, [change,setChange]);

  return (
    <div className="w-2/10 h-screen bg-gray-900 p-3 flex flex-col">
      <div className="text-2xl text-white p-2 pb-3">Archives Notes</div>
      <div className="flex-1 overflow-y-auto max-h 
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:bg-gray-100">
      {arcNotes.length > 0 ? (
        <ul className="space-y-3">
          {arcNotes.map((note) => (
            <li key={note.id}>
              
              <ArchiveNote
                id={note.id}
                title={note.title}
                date={note.createdAt}
                preview={note.preview}
                folderId={note.folder.id}
                folderName={note.folder.name}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-300">No archives notes found</p>
      )}
      </div>
    </div>
  );
};

export default ArchiveNotesList;
