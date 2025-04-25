import { useState, useEffect } from "react";
import { API_URL } from "./../config";
import "./project.css";

export default function Projects({ islogin }) {
  const [form, setForm] = useState({ title: "", description: "", link1: "", link2: "" });
  const [message, setMessage] = useState(""); // Success message
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const token = localStorage.getItem("jwt_token");

  // Fetch projects data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage(""); // Reset error message
    try {
      const response = await fetch(`${API_URL}/projects/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setErrorMessage("Erreur lors du chargement des projets.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete project by ID
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("Projet supprimé avec succès !");
        fetchData(); // Refresh data after deletion
      } else {
        setMessage("Erreur lors de la suppression du projet.");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.link1) {
      setMessage("Le lien GitHub ne doit pas être vide.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Projet ajouté avec succès !");
        setForm({ title: "", description: "", link1: "", link2: "" });
        fetchData(); // Refresh list after submit
      } else {
        setMessage(result.message || "Erreur lors de l'envoi du projet.");
      }
    } catch (err) {
      setMessage("Erreur lors de l'envoi du projet.");
    }
  };

  // Loading UI
  if (loading) {
    return <div>Chargement des projets...</div>;
  }

  // Error handling UI
  if (errorMessage) {
    return <div>Erreur lors du chargement des projets: {errorMessage}</div>;
  }

  return (
    <div className="project mt-2">
      <h3 >Mes projets</h3>

      {/* Display projects */}
      {data.length > 0 ? (
        <ul className="project-list ">
          {data.map((e, index) => (
            <li key={index} className="project-item rounded">
              <h2 className="text-center">{e.title}</h2>
              <p>{e.description}</p>
              <div className="project-links">
                <a href={e.link1} target="_blank" className="project-link">Source Code</a>
                {e.link2 && <a  href={e.link2}  target="_blank" className="project-link">Try App</a>}
              </div>
              {islogin && (
                <button className="delete-button" onClick={() => deleteItem(e.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-projects-message">Aucun projet pour le moment</p>
      )}

      {/* Add new project form */}
      {islogin && (
        <form onSubmit={handleSubmit} className="project-form">
          <input
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <input
            type="text"
            name="link1"
            placeholder="Lien GitHub"
            value={form.link1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="link2"
            placeholder="Lien App (optionnel)"
            value={form.link2}
            onChange={handleChange}
          />
          <button type="submit">Ajouter le projet</button>
        </form>
      )}

      {/* Display message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
