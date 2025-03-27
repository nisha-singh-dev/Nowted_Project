import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RenderContext } from "../../RenderContext";
import NoteItem from "./NoteItem";

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

const FilteredNotesList = () => {
  const location = useLocation();
  const { change, setChange } = useContext(RenderContext);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const type = location.pathname.split("/")[1];

  useEffect(() => {
    setNotes([]);
    setPage(1);
    setHasMore(true);
  }, [type]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!hasMore && page !== 1) return;
      try {
        let queryParams = "";

        if (type === "favourites") {
          queryParams = "archived=false&favorite=true&deleted=false";
        } else if (type === "archived") {
          queryParams = "archived=true&favorite=false&deleted=false";
        } else if (type === "trash") {
          queryParams = "deleted=true";
        }

        const response = await axios.get(
          `https://nowted-server.remotestate.com/notes?${queryParams}&page=${page}&limit=${limit}`
        );

        if (page === 1) {
          setNotes(response.data.notes);
        } else {
          setNotes((prevNotes) => [...prevNotes, ...response.data.notes]);
        }

        if (response.data.notes.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(`Error fetching ${type} notes:`, error);
      }
    };

    fetchNotes();
  }, [type, page,hasMore]);

  useEffect(() => {
    if (change) {
      setNotes([]);
      setPage(1);
      setHasMore(true);
      setChange(false);
    }
  }, [change, setChange]);

  return (
    <div className="w-2/10 h-screen bg-gray-900 p-3 flex flex-col">
      <div className="text-2xl text-white p-2 pb-3">
        {type === "favourites" ? "Favourites" : type === "archived" ? "Archived" : "Trash"}
      </div>
      <div className="flex-1 overflow-y-auto max-h 
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:bg-gray-100">
        {notes.length > 0 ? (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.id}>
                <NoteItem
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
          <p className="text-center text-gray-300">No {type} notes found</p>
        )}
      </div>
      {hasMore && notes.length >= limit && (
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

export default FilteredNotesList;



// import { useState, useEffect, useContext } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { RenderContext } from "../../RenderContext";
// import NoteItem from "./NoteItem";

// interface NoteType {
//   id: string;
//   title: string;
//   preview: string;
//   createdAt: string;
//   updatedAt: string;
//   folderId: string;
//   folder: {
//     id: string;
//     name: string;
//     createdAt: string;
//     updatedAt: string;
//     deletedAt: string | null;
//   };
// }

// const FilteredNotesList = () => {
//   const location = useLocation();
//   const { change, setChange } = useContext(RenderContext);
//   const [notes, setNotes] = useState<NoteType[]>([]);

//   const type = location.pathname.split("/")[1];

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         let queryParams = "";

//         if (type === "favourites") {
//           queryParams = "archived=false&favorite=true&deleted=false";
//         } else if (type === "archived") {
//           queryParams = "archived=true&favorite=false&deleted=false";
//         } else if (type === "trash") {
//           queryParams = "deleted=true";
//         }

//         const response = await axios.get(
//           `https://nowted-server.remotestate.com/notes?${queryParams}&page=1&limit=10`
//         );
//         console.log("API is called");

//         setNotes(response.data.notes);
//       } catch (error) {
//         console.error(`Error fetching ${type} notes:`, error);
//       }
//     };

//     if (change) {
//       setChange(!change);
//     }

//     fetchNotes();
//   }, [type, change, setChange]);

//   return (
//     <div className="w-2/10 h-screen bg-gray-900 p-3 flex flex-col">
//       <div className="text-2xl text-white p-2 pb-3">
//         {type === "favourites" ? "Favourites" : type === "archived" ? "Archived" : "Trash"}
//       </div>
//       <div className="flex-1 overflow-y-auto max-h 
//                   [&::-webkit-scrollbar]:w-1
//                   [&::-webkit-scrollbar-track]:bg-gray-300
//                   [&::-webkit-scrollbar-thumb]:bg-gray-100">
//         {notes.length > 0 ? (
//           <ul className="space-y-3">
//             {notes.map((note) => (
//               <li key={note.id}>
//                 <NoteItem
//                   id={note.id}
//                   title={note.title}
//                   date={note.createdAt}
//                   preview={note.preview}
//                   folderId={note.folder.id}
//                   folderName={note.folder.name}
//                 />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-300">No {type} notes found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilteredNotesList;