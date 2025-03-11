import axios from "axios";
import folderimg from "../../assets/folderimg.svg";
import imgfolder from "../../assets/imgfolder.svg"
import del from "../../assets/delete.svg";
import { useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";

const api = "https://nowted-server.remotestate.com/folders";

interface foldertype {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

const Folder = () => {
  const [folders, setFolder] = useState<foldertype[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const navigate = useNavigate();
  
  //get folder list
  const getFolder = async () => {
    try {
      const response = await axios.get(api);
      setFolder(response.data.folders);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  //add folder
  const addFolder = async () => {
    try {
      const response = await axios.post(api, { name: "Folder Name" });
      setFolder([...folders, response.data]);
      getFolder();
    } catch (error) {
      console.log(error);
    }
  };

  //edit folder name
  const editFolder = async (id: string) => {
    try {
      const response = await axios.patch(`${api}/${id}`,{name: editValue });
      setFolder(
        folders.map((folder) =>
          folder.id === id ? { ...folder, name: response.data.name } : folder
        )
      );
      getFolder();
      setEditId(null);
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  // delete folder
  const deleteFolder = async (id: string) => {
    try {
      await axios.delete(`${api}/${id}`);
      setFolder(folders.filter((folder) => folder.id !== id));
      navigate("/")
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <div>
      <div className="folder-header flex justify-between pt-5 pb-3 px-4">
        <p className="text-sm">Folders</p>
        <img
          src={folderimg}
          alt=""
          onClick={addFolder}
          className="cursor-pointer"
        />
      </div>
      <div
        className="folders max-h-45 overflow-y-auto [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:bg-gray-100"
      >
        <ul>
          {folders.map((note) => (
            <li
              key={note.id}
              className="pl-5 py-1.5 transition duration-300  hover:bg-blue-300 flex items-center gap-3"
            >
              <NavLink
                to={`/folder/${note.name}/${note.id}`}
                className="flex items-center gap-3 flex-1"
              >
                <img src={imgfolder} alt="Folder icon" />
                <div className="flex-1">
                  {editId === note.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e)=>{if(e.key==='Enter'){editFolder(note.id)}}}
                      autoFocus
                      className="outline-none"
                    />
                  ) : (
                    <p
                      onDoubleClick={() => {
                        setEditId(note.id);
                        setEditValue(note.name);
                      }}
                    >
                      {note.name}
                    </p>
                  )}
                </div>
              </NavLink>
              <img
                onClick={() => deleteFolder(note.id)}
                src={del}
                alt="Delete icon"
                className="cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Folder;
