import { API_URL } from "./../config";
import { useEffect, useState } from "react";

export default function Toolsadmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", classoftools: "", place: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("jwt_token");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/learnTools/`, {
        method: "GET",
      });
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setMessage("Erreur lors du chargement des outils.");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  const deleteTool = async (id) => {
    try {
      const response = await fetch(`${API_URL}/learnTools/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("Outil supprimé avec succès.");
        fetchData();
      } else {
        setMessage("Erreur lors de la suppression.");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/learnTools/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Ajout réussi !");
        setForm({ name: "", classoftools: "", place: "" });
        fetchData(); // recharge les données
      } else {
        setMessage(result.message || "Erreur lors de l'ajout.");
      }
    } catch (err) {
      setMessage("Erreur lors de l'envoi.");
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = selectedCategory === "All"
    ? data
    : data.filter(item => item.classoftools === selectedCategory);

  return (
    <>
      <div>
        <h2>Mes cours et outils appris</h2>
        {filteredData.length === 0 ? (
          <p>Aucun outil pour le moment.</p>
        ) : (
          <ul>
            {filteredData.map((e) => (
              <li key={e.id} type-data={e.classoftools}>
                {e.name} — {e.place} ({e.classoftools})
                <button onClick={() => deleteTool(e.id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3>Ajouter un nouvel outil</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom de l'outil"
            value={form.name}
            onChange={handleChange}
          />
          {/* Category Dropdown for Adding */}
          <div>
            <label htmlFor="classoftools">Catégorie: </label>
            <select
              id="classoftools"
              name="classoftools"
              value={form.classoftools}
              onChange={handleChange}
            >
          <option value="Tool">Tool</option>
          <option value="Course">Course</option>
          <option value="Framework">Framework</option>
          <option value="language">language</option>
          <option value="skill">skill</option>
            </select>
          </div>
          <input
            type="text"
            name="place"
            placeholder="Source"
            value={form.place}
            onChange={handleChange}
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="filter-container">
        <label htmlFor="categoryFilter">Filtrer par Catégorie: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">Tous</option>
          <option value="Tool">Outil</option>
          <option value="Course">Cours</option>
          <option value="Framework">Framework</option>
          <option value="language">Langage</option>
          <option value="skill">Compétence</option>
        </select>
      </div>

      {message && <p>{message}</p>}
    </>
  );
}