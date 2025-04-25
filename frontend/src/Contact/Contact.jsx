import { useState } from "react";
import {API_URL} from "./../config"
import "./contact.css"
import "./../AdminDashbord/tool.css"
export default function Contact() {
    const [form, setForm] = useState({ email: "", subject: "", message: "" });
    const [message, setMessage] = useState("");
   
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/contact/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
  
        const result = await response.json();
        if (response.ok) {
          setMessage("Message envoyé avec succès !"); // Updated success message
          setForm({ email: "", subject: "", message: "" });
          // fetchData(); // Assuming fetchData is relevant to displaying contact messages
        } else {
          setMessage(result.message || "Erreur lors de l'envoi du message."); // Updated error message
        }
      } catch (err) {
        setMessage("Erreur lors de l'envoi du message."); // Updated error message
      }
    };
  
    return (
      <>
        <div>
          <h3>Contactez-Moi</h3> {/* Updated heading */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Sujet"
              value={form.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Votre message"
              value={form.message}
              onChange={handleChange}
              rows="7"
              required
            ></textarea>
            <button type="submit">Envoyer le message</button> {/* Updated button text */}
          </form>
        </div>
  
        {message && <p>{message}</p>}
      </>
    );
  }