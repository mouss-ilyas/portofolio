import { API_URL } from "./../config";
import { useEffect, useState } from "react";
import "./learnTools.css";

export default function LearnTools() {
  const [data, setdata] = useState([]);
  const [Message, SetMessage] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await fetch(`${API_URL}/learnTools/`, {
        method: "GET",
      });
      const newdata = await response.json();
      if (response.ok) {
        setdata(newdata);
      } else {
        SetMessage("Error loading learn and tools data.");
      }
    } catch (error) {
      SetMessage("Server connection error while loading learn and tools data.");
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter the data based on the selected category
  const filteredData = selectedCategory === "All" 
    ? data 
    : data.filter((item) => item.classoftools === selectedCategory);

  return (
    <div className="learntools">
      <h2>My Learned Courses and Tools</h2>

      {/* Category Filter */}
      <div className="filter-container">
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          <option value="Tool">Tool</option>
          <option value="Course">Course</option>
          <option value="Framework">Framework</option>
          <option value="language">language</option>
          <option value="skill">skill</option>
        </select>
      </div>

      {!filteredData.length ? (
        <p>No tools available for the selected category.</p>
      ) : (
        <div className="tools-container">
          {filteredData.map((e, index) => (
            <div
              className="tool-card"
              key={e.id}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3>{e.name}</h3>
              <p><strong>Place:</strong> {e.place}</p>
              <p><strong>Category:</strong> {e.classoftools}</p>
            </div>
          ))}
        </div>
      )}

<div className="message">      {Message && <p>{Message}</p>}</div>
    </div>
  );
}
