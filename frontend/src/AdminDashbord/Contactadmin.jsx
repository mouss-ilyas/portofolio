import React, { useState, useEffect } from 'react';
import {API_URL} from "./../config"
export default function Contactadmin() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("jwt_token");
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/contact/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setMessage("Erreur lors du chargement des messages."); // Updated message
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("Message supprimé avec succès."); // Updated message
        fetchData();
      } else {
        setMessage("Erreur lors de la suppression du message."); // Updated message
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <>
      <div>
        <h2>Messages de contact</h2> {/* Updated heading */}
        {data.length === 0 ? (
          <p>Aucun message reçu.</p> 
        ) : (
          <ul>
            {data.map((e) => (
              <li key={e.id}>
                <strong>Email:</strong> {e.email} — <strong>Sujet:</strong> {e.subject}
                <div>
                  <strong>Message:</strong> {e.message}
                </div>
                <button onClick={() => deleteMessage(e.id)}>Supprimer</button> {/* Updated button text */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {message && <p>{message}</p>}
    </>
  );
}