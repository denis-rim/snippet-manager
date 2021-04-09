import axios from "axios";
import "./Snippet.scss";

const Snippet = ({ snippet, getSnippets, editSnippet }) => {
  const deleteSnippet = async () => {
    await axios.delete(`http://localhost:5000/snippet/${snippet._id}`);

    getSnippets();
  };

  return (
    <div className="snippet">
      {snippet.title && <h2 className="title">{snippet.title}</h2>}
      {snippet.description && (
        <p className="description">{snippet.description}</p>
      )}
      {snippet.code && (
        <pre className="code">
          <code>{snippet.code}</code>
        </pre>
      )}
      <button onClick={() => editSnippet(snippet)}>Edit</button>
      <button onClick={deleteSnippet}>Delete</button>
    </div>
  );
};

export default Snippet;
