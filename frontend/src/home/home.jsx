import "./home.css";
import { API_URL } from "./../config";
import { useState, useEffect } from "react";
import  j from "./../images/myimage.jpeg" 
export default function Home() {

  const [data, setData] = useState([]);
  const [n, setn] = useState([]);
  const [message, setMessage] = useState("");
  const linkOfCv = `${API_URL}/imagerouter/cv`;
  const currentYear = new Date().getFullYear();
  const N = currentYear - 2022;

  useEffect(() => {
    fetchData();
    fetchNumber();
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

  const fetchNumber = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/`);
      const result = await response.json();
      if (response.ok) {
        setn(result);
      } else {
        setMessage("Erreur lors du chargement des projets.");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="home">
      <div className="welcomephase">
        <p>Hi, I'm Ilyas Moussnaoui. Welcome to my profile!</p>
        <a
          href={j}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          👉 View CV
        </a>
      </div>

      <div className="d-md-flex">
        <div className="image-container d-flex justify-content-center items-center m-2">
          <img
            src={j}
            alt="myimage"
            className="rounded shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.jpg";
            }}
          />
        </div>

        <div className="description m-2">
          {data.length === 0 ? (
            <p>Aucune description pour le moment.</p>
          ) : (
            <ul>
              {data.map((e) => (
                <li key={e.id}>
                  <i className={e.icon} style={{ marginRight: "10px" }}></i>
                  {e.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <h3>About me</h3>
        <div className="description m-2">
        <p>
        I'm a Computer Science graduate  👨‍💻 with a strong interest in modern web
  development 🌐 and artificial intelligence 🤖.<br />
  I enjoy learning and experimenting with technologies like React ⚛️, Django 🐍, and Bootstrap 🎨 to
  build web applications. I’m also exploring deployment tools like
  Docker 🐳 and working with databases such as MySQL 🐬 and Oracle 🏛️ (including some PL/SQL basics).<br />
  My true passion lies in Artificial Intelligence 💡. I love diving into
  machine learning and deep learning 🧠, using tools like
  Scikit-learn, Pandas 🐼, Matplotlib 📊,  and PyTorch 🔥 to
  explore real-world problem solving. I’m learning to
  write clean, efficient code 💻 in Python, C/C++, and Java ☕, and I’m
  always excited to take on new challenges 🚀 that help me grow and apply
  my skills in meaningful ways.<br />
  I'm a curious and motivated learner 🌱, always looking to push the boundaries of what I can build and
  understand with technology ⚙️.
</p>


        </div>
        <div>
          <h3>Quik facts</h3>
        </div>
        <div className="description m-2">
          <ul>
            <li>I developed {n.length} projects</li>
            <li>I have {N} years of learning</li>
            <li>I printed more than 9K+ errors</li>
          </ul>
        </div>
      </div>

      <div>
        <h3>Why me?</h3>
      </div>
      <div className="description m-2">
        <ul>
          <li>I speak multiple languages (English, French, Arabic)</li>
          <li>I combine web development with AI and data analysis</li>
          <li>I learn fast and adapt to new technologies quickly</li>
          <li>I focus on clean, efficient, and maintainable code</li>
          <li>I build real-world projects and continuously improve them</li>
          <li>
            I adapt quickly to diffrent environments and work under pressure
            efficient
          </li>
        </ul>
      </div>
    </div>
  );
}
