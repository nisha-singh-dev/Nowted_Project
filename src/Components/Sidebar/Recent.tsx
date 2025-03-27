import  {  useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import recentimg from "../../assets/recent.svg";

const api = 'https://nowted-server.remotestate.com/notes/recent';

interface RecentNote {
  id: string;
  title: string;
  folderId: string;
  folder:{
    name:string
  }
}

const Recent = () => {
  const [recentNotes, setRecentNotes] = useState<RecentNote[]>([]);

  const getRecentNotes = async () => {
    try {
      const response = await axios.get(api);
      setRecentNotes(response.data.recentNotes);
    } catch (error) {
      console.error('Error fetching recent notes:', error);
    }
  };

  useEffect(() => {
    
    getRecentNotes();
  },[]);

  return (
    <div>
      <div className='text-sm py-4 '>Recents</div>
      <div className='recent-list'>
        <ul>
          {recentNotes.map((note) => (
            <li key={note.id} className='pl-5 py-2 flex w-full transition duration-300  hover:bg-blue-300 items-center gap-3'>
              <img src={recentimg} alt="Recent Note Icon" />
              <NavLink to={`/folder/${note.folder.name}/${note.folderId}/notes/${note.id}`} className="w-full">
                {note.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recent;
