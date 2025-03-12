import { useParams,  NavLink} from "react-router-dom";
import axios from "axios";
import restore from "../../assets/restore.svg";
import { useContext, useEffect ,useState} from "react";
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

const Restorenote= () => {
  const { notesId } = useParams<{ notesId: string }>();
  const [note, setNote] = useState<NoteType>();
  const {setChange,setMainchange} = useContext(RenderContext)

  useEffect(() => {
    const fetchNoteDetails = async () => {
      if (!notesId) return;
      try {
        const response = await axios.get(
          `https://nowted-server.remotestate.com/notes/${notesId}`
        );
        setNote(response.data.note); 
        } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    fetchNoteDetails();
  }, [notesId]);

  const restoreNote = async () => {
    if (!notesId) return;
    try {
      await axios.post(
        `https://nowted-server.remotestate.com/notes/${notesId}/restore`
      );
      alert("Note restored successfully!!!")
      setChange(true);
      setMainchange(true);
    } catch (error) {
      console.error("Error restoring note:", error);
    }
  };


  return (
    <div className="flex flex-col items-center bg-gray-950 w-6/10 justify-center h-screen text-center px-4">
      <img src={restore} alt="Restore Icon" />
      <div className="text-white text-2xl">Restore "{note?.title}"</div>
      <div className="text-gray-600">
        Don't want to lose this note? It's not too late! Just click the 'Restore' button, and it will be added back to your list.
      </div>
      <NavLink to={`/folder/${note?.folder.name}/${note?.folder.id}/notes/${note?.id}`}>
      <button
        className="border text-lg  rounded-md bg-blue-700 px-10 py-2 text-white"
        onClick={restoreNote}
      >
        Restore
      </button>
      </NavLink>
     
    </div>
  );
};

export default Restorenote;
