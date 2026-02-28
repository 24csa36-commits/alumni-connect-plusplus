import { useEffect, useState } from "react";

function AlumniList() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/alumni")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setAlumni(data);
      })
      .catch((err) => console.log(err));
  }, []);

return (
  <div style={{ textAlign: "center" }}>
    <h2>Alumni Count: {alumni.length}</h2>

    {alumni.map((a) => (
      <div
        key={a._id}
        style={{
          margin: "20px auto",
          padding: "15px",
          width: "250px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <img
          src={a.picture}
          alt={a.name}
          width="80"
          height="80"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px"
          }}
        />

        <h4>{a.name}</h4>
        <p style={{ fontSize: "14px", color: "gray" }}>{a.email}</p>
      </div>
    ))}
  </div>
);
}

export default AlumniList;