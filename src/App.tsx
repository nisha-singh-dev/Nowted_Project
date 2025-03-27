import Sidebar from "./Components/Sidebar/Sidebar";
import NoteList from "./Components/NotesList/NoteList";
import FilteredNotesList from "./Components/NotesList/FilteredNotesList";
import Defaultnotecontent from "./Components/NotesContent/Defaultnotecontent";
import Onenotecontent from "./Components/NotesContent/Onenotecontent";
import Restorenote from "./Components/NotesContent/Restorenote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RenderContext } from "./RenderContext";
import { useState } from "react";

function App() {
  const [change, setChange] = useState<boolean>(false);
  const [mainchange, setMainchange] = useState<boolean>(false);

  return (
    <RenderContext.Provider value={{ change, setChange, mainchange, setMainchange }}>
      <Router>
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/folder/:folderName/:folderId/*" element={<NoteList />} />
            <Route path="/favourites/*" element={<FilteredNotesList />} />
            <Route path="/archived/*" element={<FilteredNotesList />} />
            <Route path="/trash/*" element={<FilteredNotesList />} />
            </Routes>

            <Routes>
            <Route path="/" element={<Defaultnotecontent />} />
            <Route path="/folder/:folderName/:folderId/" element={<Defaultnotecontent />} />
            <Route path="/folder/:folderName/:folderId/notes/:notesId" element={<Onenotecontent />} />

            <Route path="/favourites/:folderName/:folderId/notes/:notesId" element={<Onenotecontent />} />
            <Route path="/archived/:folderName/:folderId/notes/:notesId" element={<Onenotecontent />} />

            <Route path="/trash/:folderName/:folderId/notes/:notesId" element={<Restorenote />} />
            {/* <Route path="/restore/:folderName/:folderId/notes/:notesId" element={<Restorenote />} /> */}
          </Routes>
        </div>
      </Router>
    </RenderContext.Provider>
  );
}

export default App;



