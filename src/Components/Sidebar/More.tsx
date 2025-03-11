import { NavLink } from "react-router-dom"; // Import NavLink
import fav from "../../assets/fav.svg";
import del from "../../assets/delete.svg";
import archive from "../../assets/archive.svg";

const More = () => {
  return (
    <div className="">
      <div className="pl-5 text-sm p-2">More</div>
      <div className="more">
        <NavLink
          to="/favourites"
          className="pl-5 pt-1.5 pb-1.5 flex gap-4  transition duration-300 
                           hover:bg-blue-300 hover:text-white"
          
        >
          <img src={fav} alt="Favourites" />
          Favourites
        </NavLink>

        <NavLink
          to="/trash"
          className="pl-5 pt-1.5 pb-1.5 flex gap-4 transition duration-300 
                           hover:bg-blue-300 hover:text-white"
          
        >
          <img src={del} alt="Trash" />
          Trash
        </NavLink>

        <NavLink
          to="/archived"
          className="pl-5 pt-1.5 pb-1.5 flex gap-4 transition duration-300 
                           hover:bg-blue-300 hover:text-white"
          
        >
          <img src={archive} alt="Archived" />
          Archived Notes
        </NavLink>
      </div>
    </div>
  );
};

export default More;
