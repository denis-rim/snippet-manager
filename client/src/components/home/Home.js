import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import UserContext from "../../context/UserContext";

import "./Home.scss";

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    // get snippets
    getSnippets();
  }, []);

  const getSnippets = async () => {
    const snippetsRes = await axios.get("http://localhost:5000/snippet");
    setSnippets(snippetsRes.data);
  };

  const editSnippet = (snippetData) => {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  };

  const renderSnippets = () => {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedSnippets.map((snippet) => {
      return (
        <Snippet
          key={snippet._id}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  };

  return (
    <div className="home">
      {!snippetEditorOpen && user && (
        <button
          className="btn-editor-toggle"
          onClick={() => setSnippetEditorOpen(true)}
        >
          Add snippet
        </button>
      )}
      {snippetEditorOpen && (
        <SnippetEditor
          getSnippets={getSnippets}
          setSnippetEditorOpen={setSnippetEditorOpen}
          editSnippetData={editSnippetData}
        />
      )}
      {renderSnippets()}
    </div>
  );
};

export default Home;
