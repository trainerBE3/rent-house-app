import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../dist/detailproperty.css";

const DetailPropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>{property.title}</h1>
      <img src={property.images[0]} alt={property.title} />
      <p>{property.description}</p>
      {/* Render other details about the property */}
    </Container>
  );
};

export default DetailPropertyPage;
