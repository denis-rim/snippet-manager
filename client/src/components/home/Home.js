import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import UserContext from "../../context/UserContext";

import "./Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) setSnippets([]);
    else getSnippets();
  }, [user]);

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
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <p className="no-snippets-msg">No snippets have been added yet.</p>
          )}
      {user === null && (
        <div className="no-user-message">
          <h2>Welcome to Snippet manager</h2>
          <Link to="/register">Register here</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
