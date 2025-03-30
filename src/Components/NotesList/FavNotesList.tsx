import  { useState, useEffect, useContext } from "react";
import axios from "axios";
import FavNote from "./FavNote";
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
const FavNotesList = () => {
  const [favNotes, setFavNotes] = useState<NoteType[]>([]);

  const {change,setChange} = useContext(RenderContext)

  useEffect(() => {
    const fetchFavNotes = async () => {
      try {
        const response = await axios.get(
          `https://nowted-server.remotestate.com/notes?archived=false&favorite=true&deleted=false&page=1&limit=10`
        );
        // console.log("fav",response.data);
        
        // console.log("fav data",response.data.notes[0].folder.name);
        
        setFavNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching favorite notes:", error);
      }
    };
    if(change){
      setChange(!change);
    }
    fetchFavNotes();
  }, [change,setChange]);

  return (
    <div className="w-2/10 h-screen bg-gray-900 p-3 flex flex-col">
      <div className="text-2xl text-white p-2 pb-3">Favourites</div>
      <div className="flex-1 overflow-y-auto max-h 
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:bg-gray-100">
                    {favNotes.length > 0 ? (
        <ul className="space-y-3">
          {favNotes.map((note) => (
            <li key={note.id}>
              <FavNote
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
        <p className="text-center text-gray-300">No favorite notes found</p>
      )}
                  </div>
      
    </div>
  );
};

export default FavNotesList;
