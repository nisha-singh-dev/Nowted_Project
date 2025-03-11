
import Sidebar from './Components/Sidebar/Sidebar'
import NoteList from './Components/NotesList/NoteList'
import FavNotesList from './Components/NotesList/FavNotesList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Defaultnotecontent from './Components/NotesContent/Defaultnotecontent';
import Onenotecontent from './Components/NotesContent/Onenotecontent';
import ArchiveNotesList from './Components/NotesList/ArchiveNotesList';
import TrashNoteList from './Components/NotesList/TrashNoteList';
import Restorenote from './Components/NotesContent/Restorenote';
import { RenderContext } from './RenderContext';
import { useState } from 'react';

function App() {
  const [change,setChange]=useState<boolean>(false);
  const [mainchange,setMainchange] = useState<boolean>(false);
  return(
  <>
  <RenderContext.Provider value={{change,setChange,mainchange,setMainchange}}>

    <Router>
        <div className="flex">
          
        <Routes>
          <Route path="/*" element={<Sidebar />} />
          <Route path="/folder/:folderName/:folderId/*" element={<Sidebar />} />
          <Route path="/favourites/*" element={<Sidebar />} />
          <Route path="/trash/*" element={<Sidebar />} />
          <Route path="/archived/*" element={<Sidebar />} />
        </Routes>

        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/folder/:folderName/:folderId/*" element={<NoteList />} />
          <Route path="/favourites/*" element={<FavNotesList />} />
          <Route path="/archived/*" element={<ArchiveNotesList />} />
          <Route path="/trash/*" element={<TrashNoteList />} />
          <Route path="/restore/:folderName/:folderId/notes/:notesId" element={<NoteList />} />

        </Routes>

        <Routes>
          <Route path="/" element={<Defaultnotecontent />} />
          <Route path="/folder/:folderName/:folderId/*" element={<Defaultnotecontent />} />
          <Route path="/folder/:folderName/:folderId/notes/:notesId" element={<Onenotecontent />} />
          <Route path="/favourites/*" element={<Defaultnotecontent />} />
          <Route path="/favourites/:folderName/:folderId/notes/:notesId" element={<Onenotecontent />} />
          <Route path="/archived/*" element={<Defaultnotecontent />} />
          <Route path="/archived/:folderName/:folderId/notes/:notesId" element={<Onenotecontent />} />
          <Route path="/trash" element={<Defaultnotecontent />} />
          <Route path="/trash/:folderName/:folderId/notes/:notesId" element={<Restorenote />} />
          <Route path="/restore/:folderName/:folderId/notes/:notesId" element={<Restorenote />} />

        </Routes>


        
        </div>
      </Router>
  </RenderContext.Provider>
    </>
  )
}

export default App


