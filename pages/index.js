import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractRepoInfo = (url) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
    return null;
  };

  const fetchRepoContents = async (owner, repo, path = "") => {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );
    return response.data;
  };

  const buildTree = async (owner, repo, path = "") => {
    const contents = await fetchRepoContents(owner, repo, path);
    const tree = [];

    for (const item of contents) {
      if (item.type === "dir") {
        tree.push({
          name: item.name,
          type: "dir",
          children: await buildTree(owner, repo, item.path),
        });
      } else {
        tree.push({
          name: item.name,
          type: "file",
        });
      }
    }

    return tree;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const repoInfo = extractRepoInfo(repoUrl);
      if (!repoInfo) {
        throw new Error("Invalid GitHub URL");
      }

      const tree = await buildTree(repoInfo.owner, repoInfo.repo);
      setTree(tree);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">GitHub Repo Tree Generator</h1>
      <input
        type="text"
        placeholder="Enter GitHub Repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {tree && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Repository Tree</h2>
          <Tree data={tree} />
        </div>
      )}
    </div>
  );
}

const Tree = ({ data }) => {
  return (
    <ul className="pl-5">
      {data.map((item, index) => (
        <li key={index}>
          {item.type === "dir" ? (
            <details>
              <summary className="font-bold">{item.name}</summary>
              <Tree data={item.children} />
            </details>
          ) : (
            <span>{item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
};