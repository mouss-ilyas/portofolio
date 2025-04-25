import { API_URL } from "./../config";
import { useEffect, useState } from "react";

export default function Description() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ icon: "", text: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/descriptions`);
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setMessage("Erreur lors du chargement des descriptions.");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  const deleteTool = async (id) => {
    try {
      const response = await fetch(`${API_URL}/descriptions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("Phrase supprimée avec succès.");
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
      const response = await fetch(`${API_URL}/descriptions/`, {
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
        setForm({ icon: "", text: "" });
        fetchData();
      } else {
        setMessage(result.message || "Erreur lors de l'ajout.");
      }
    } catch (err) {
      setMessage("Erreur lors de l'envoi.");
    }
  };

  return (
    <>
      <div>
        <h2>Mes phrases et outils appris</h2>
        {data.length === 0 ? (
          <p>Aucune phrase pour le moment.</p>
        ) : (
          <ul>
            {data.map((e) => (
              <li key={e.id}>
                <i className={e.icon}></i>
                {e.text}
                <button onClick={() => deleteTool(e.id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3>Ajouter une nouvelle phrase</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="icon"
            placeholder="icon"
            value={form.icon}
            onChange={handleChange}
          />
          <input
            type="text"
            name="text"
            placeholder="phrase"
            value={form.text}
            onChange={handleChange}
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      {message && <p>{message}</p>}
    </>
  );
}
