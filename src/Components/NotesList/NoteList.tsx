
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Note from "./Note";
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

const NoteList = () => {
  const { folderName, folderId } = useParams<{
    folderName: string;
    folderId: string;
  }>();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const { change, setChange } = useContext(RenderContext);
  const [editname, setEditName] = useState(folderName);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`
        https://nowted-server.remotestate.com/notes?archived=false&deleted=false&folderId=${folderId}&page=1&limit=10`);

    
        if (response.data.notes.length > 0) {
          const folderDeleted = response.data.notes[0].folder.deletedAt;
          setEditName(response.data.notes[0].folder.name);
          if (folderDeleted) {
            setNotes([]);
          } else {
            setNotes(response.data.notes);
          }
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (folderId) {
      if (change) {
        setChange(!change);
      }
      fetchNotes();
    }
  }, [folderId, change, setChange]);

  return (
    <div className="w-2/10 h-screen bg-gray-900 p-3 flex flex-col">
      {folderName ? (
        <>
          <div className="text-2xl text-white p-2 pb-3">{editname}</div>
          <div
            className="flex-1 overflow-y-auto h-screen
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300"
          >
            {notes.length > 0 ? (
              <ul className="space-y-3">
                {notes.map((note) => (
                  <li key={note.id}>
                    <Note
                      id={note.id}
                      title={note.title}
                      date={note.createdAt}
                      preview={note.preview}
                      folderName={note.folder.name}
                      folderId={note.folder.id}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-300">No notes found</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-300 mt-5">No notes found</p>
      )}

      
    </div>
  );
};

export default NoteList;