// import  { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import options from "../../assets/options.svg";
// import Options from "./Options";
// import date from "../../assets/date.svg"
// import folder from "../../assets/folder.svg"
// import { RenderContext } from "../../RenderContext";

// interface NoteType {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   folderId: string;
//   isFavorite: boolean;
//   isArchived: boolean;
//   isDeleted: boolean; 
// }


// const Onenotecontent = () => {
//   const { folderName, notesId } = useParams<{
//     folderName: string;
//     notesId: string;
//   }>();

//   const [note, setNote] = useState<NoteType | null>(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const {setChange,mainchange,setMainchange} = useContext(RenderContext)



//   useEffect(() => {
//     const fetchNoteDetails = async () => {
//       if (!notesId) return;
//       try {
//         const response = await axios.get(
//           `https://nowted-server.remotestate.com/notes/${notesId}`
//         );
//         setNote(response.data.note);
//       } catch (error) {
//         console.error("Error fetching note details:", error);
//       }
//     };
//     if(mainchange){
//       setMainchange(!mainchange);
//     }
//     fetchNoteDetails();
//   }, [notesId,mainchange,setMainchange]);

//   //it handle edit
//   useEffect(() => {
//     if (!note) return;

//     const timer = setTimeout(async () => {
//       try {
//         await axios.patch(`https://nowted-server.remotestate.com/notes/${note.id}`, {
//           title: note.title,
//           content: note.content,
//         });
//         setChange(true);
        
//       } catch (error) {
//         console.error("Error updating note:", error);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [note,setChange]);

//   if (!note) {
//     return <p className="text-white text-center"></p>;
//   }


//   return (
//     <div className="flex flex-col w-6/10 h-screen p-4 text-white bg-gray-950">
//       <div className="flex p-4 justify-between">
//         <input
//           type="text"
//           value={note.title}
//           onChange={(e) => setNote({ ...note, title: e.target.value })}
//           className="bg-transparent text-xl font-bold outline-none border-gray-400 focus:border-blue-400 w-full"
//         />
//         <img
//           src={options}
//           alt="Options"
//           onClick={() => setShowOptions(!showOptions)}
    

//           className="cursor-pointer "
//         />
//       </div>

//       {showOptions && (
//         <Options
//           noteId={note.id}
//           isFavorite={note.isFavorite}
//           isArchived={note.isArchived}
//         />
//       )}

//       <hr className="border-t-2 border-gray-400 my-2" />
//       <div className="text-gray-300 p-4">
//         <div className="flex gap-4">
//           <img src={date} alt="" />
//           <span className="font-semibold">Date:</span>{" "}
//           <p className="pl-2 underline">{new Date(note.createdAt).toLocaleDateString()}</p>
//         </div>
//         <div className="flex gap-4">
//           <img src={folder} alt="" />
//           <span className="font-semibold">Folder:</span> 
//           <p className="pl-2 underline">{folderName}</p>
//         </div>
//       </div>
//       <textarea
//         value={note.content}
//         onChange={(e) => setNote({ ...note, content: e.target.value })}
//         className="mt-4 text-lg pl-4 bg-transparent outline-none w-full h-full resize-none"
//       />
//     </div>
//   );
// };

// export default Onenotecontent;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import options from "../../assets/options.svg";
import Options from "./Options";
import date from "../../assets/date.svg";
import folder from "../../assets/folder.svg";
import { RenderContext } from "../../RenderContext";

interface NoteType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  folderId: string;
  isFavorite: boolean;
  isArchived: boolean;
  isDeleted: boolean;
}

const Onenotecontent = () => {
  const { folderName, notesId } = useParams<{ folderName: string; notesId: string }>();
  const [note, setNote] = useState<NoteType | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const { setChange, mainchange, setMainchange } = useContext(RenderContext);

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

    if (mainchange) {
      setMainchange(!mainchange);
    }
    
    fetchNoteDetails();
  }, [notesId, mainchange, setMainchange]);

  // Function to update note on pressing Enter
  const handleEdit = async () => {
    if (!note) return;
    try {
      await axios.patch(`https://nowted-server.remotestate.com/notes/${note.id}`, {
        title: note.title,
        content: note.content,
      });
      setChange(true);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (!note) {
    return <p className="text-white text-center"></p>;
  }

  return (
    <div className="flex flex-col w-6/10 h-screen p-4 text-white bg-gray-950">
      <div className="flex p-4 justify-between">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          className="bg-transparent text-xl font-bold outline-none border-gray-400 focus:border-blue-400 w-full"
        />
        <img
          src={options}
          alt="Options"
          onClick={() => setShowOptions(!showOptions)}
          className="cursor-pointer"
        />
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
        <div className="flex gap-4">
          <img src={folder} alt="" />
          <span className="font-semibold">Folder:</span> 
          <p className="pl-2 underline">{folderName}</p>
        </div>
      </div>
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && handleEdit()}
        className="mt-4 text-lg pl-4 bg-transparent outline-none w-full h-full resize-none"
      />
    </div>
  );
};

export default Onenotecontent;
