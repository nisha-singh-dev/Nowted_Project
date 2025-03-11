import { useState, useEffect } from "react";
import axios from "axios";
import TrashNote from "./TrashNote";

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

const TrashNoteList = () => {
  const [trashNotes, setTrashNotes] = useState<NoteType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    const fetchTrashNotes = async () => {
      try {
        const response = await axios.get(
          `https://nowted-server.remotestate.com/notes?deleted=true&archived=false&page=${page}&limit=${limit}`
        );

        if (response.data.notes.length < limit) {
          setHasMore(false);
        }

        setTrashNotes((prevNotes) => [...prevNotes, ...response.data.notes]);
      } catch (error) {
        console.error("Error fetching deleted notes:", error);
      }
    };

    fetchTrashNotes();
  }, [page]);

  return (
    <div className="w-2/10 h-screen bg-gray-900 p-3 flex flex-col">
      <div className="text-2xl text-white p-2 pb-3">Deleted Notes</div>
      <div
        className="flex-1 overflow-y-auto max-h 
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        {trashNotes.length > 0 ? (
          <ul className="space-y-3">
            {trashNotes.map((note) => (
              <li key={note.id}>
                <TrashNote
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
          <p className="text-center text-gray-300">No Deleted notes found</p>
        )}
      </div>

      {hasMore && (
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="mt-3 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Load More Notes
        </button>
      )}
    </div>
  );
};

export default TrashNoteList;
