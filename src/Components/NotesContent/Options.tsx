import axios from "axios";
import fav from "../../assets/fav.svg";
import archiveIcon from "../../assets/archive.svg";
import deleteIcon from "../../assets/delete.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RenderContext } from "../../RenderContext";

const Options = ({
  noteId,
  isFavorite,
  isArchived,
}: {
  noteId: string;
  isFavorite: boolean;
  isArchived: boolean;
}) => {
  const navigate = useNavigate();
  const { setChange, setMainchange } = useContext(RenderContext);

  const { folderName, folderId } = useParams();

  //delete note
  const deleteNote = async () => {
    try {
      await axios.delete(
        `https://nowted-server.remotestate.com/notes/${noteId}`
      );
      alert("Note Deleted successfully!!!");
      // navigate(`/restore/${folderName}/${folderId}/notes/${noteId}`);
      setChange(true);
      setMainchange(true);
    } catch (error) {
      console.log(error);
    }
  };



  const updateNoteProperty = async (property: string, value: boolean) => {
    try {
      await axios.patch(
        `https://nowted-server.remotestate.com/notes/${noteId}`,
        {
          [property]: value,
        }
      );

      alert(
        `Note ${
          property === "isFavorite"
            ? value
              ? "added to favorites"
              : "removed from favorites"
            : property === "isArchived"
            ? value
              ? "archived"
              : "unarchived"
            : "updated"
        } successfully!`
      );

      setMainchange(true);
      setChange(true);

      if (property === "isArchived") {
        if (value) {
          navigate(`/folder/${folderName}/${folderId}`);
        } else {
          navigate(`/folder/${folderName}/${folderId}/notes/${noteId}`);
        }
      }
    } catch (error) {
      console.error(`Error updating ${property}:`, error);
    }
  };

  return (
    <div className="absolute top-[4rem] right-[2.5rem] bg-gray-800 text-white p-3 rounded-lg w-44 shadow-lg z-50">
      <div
        className="flex gap-2.5 p-2 cursor-pointer hover:bg-gray-700 rounded"
        onClick={() => updateNoteProperty("isFavorite", !isFavorite)}
      >
        <img src={fav} alt="Favourite" className="w-5 h-5" />
        <button className="text-sm">
          {isFavorite ? "Unfavourite" : "Favourite"}
        </button>
      </div>

      <div
        className="flex gap-2.5 p-2 cursor-pointer hover:bg-gray-700 rounded"
        onClick={() => updateNoteProperty("isArchived", !isArchived)}
      >
        <img src={archiveIcon} alt="Archive" className="w-5 h-5" />
        <button className="text-sm">
          {isArchived ? "Unarchive" : "Archive"}
        </button>
      </div>

      <hr className="border-t-2 border-gray-600 my-2" />

      <div
        className="flex gap-2.5 p-2 cursor-pointer hover:bg-gray-700 rounded"
        onClick={deleteNote}
      >
        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
        <button className="text-sm">Delete</button>
      </div>
    </div>
  );
};

export default Options;
