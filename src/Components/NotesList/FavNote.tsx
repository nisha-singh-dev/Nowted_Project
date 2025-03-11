import { NavLink } from "react-router-dom";

const FavNote = ({ id, title, date, preview, folderId, folderName }: { 
  id: string; 
  title: string; 
  date: string; 
  preview: string; 
  folderId: string;
  folderName: string; 
  
}) => {
  return (
    <NavLink to={`/favourites/${folderName}/${folderId}/notes/${id}`}>
      <div className="notes-card p-3 bg-gray-700 rounded-lg flex flex-col gap-3 cursor-pointer">
      <div>
        <p className="text-lg text-white font-semibold">{title}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-white">{new Date(date).toLocaleDateString()}</p>
        <p className="text-white">{preview.substring(0, 13) + "..."}</p>
      </div>
      </div>
    </NavLink>
  );
};

export default FavNote;
