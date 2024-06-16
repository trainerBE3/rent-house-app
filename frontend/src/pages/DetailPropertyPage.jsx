import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Accordion } from "react-bootstrap";
import NavbarUserComponent from "../components/NavbarUserComponent";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "../dist/detailproperty.css";

const DetailPropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [months, setMonths] = useState(1);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  let displayedImages = [];
  if (property.images.length < 3) {
    displayedImages = [property.images[0]];
  } else {
    displayedImages = property.images.slice(0, 3);
  }

  const handleRent = async () => {
    try {
      const response = await axios.post(
        `/api/properties/rent`,
        {
          propertyId: id,
          startDate,
          months,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Rental request submitted successfully!");
    } catch (error) {
      console.error("Error submitting rental request:", error);
      alert("Failed to submit rental request. Please try again.");
    }
  };
  console.log(property);

  return (
    <>
      <NavbarUserComponent />
      <section className="detail-property">
        <Container>
          <div className="property-content">
            <div
              className={`property-images ${
                displayedImages.length === 1
                  ? "single-image"
                  : "multiple-images"
              }`}
            >
              <img
                src={`/${displayedImages[0]}`}
                alt={`${property.title} image 1`}
                className="image-1"
              />
              {displayedImages.length > 1 && (
                <div className="small-images">
                  <img
                    src={`/${displayedImages[1]}`}
                    alt={`${property.title} image 2`}
                    className="image-2"
                  />
                  <img
                    src={`/${displayedImages[2]}`}
                    alt={`${property.title} image 3`}
                    className="image-3"
                  />
                </div>
              )}
            </div>
            <div className="property-details">
              <div className="property-titles">
                <span className="property-title">{property.title}</span>
                <span className="property-rating">
                  <span className="fa-star">★</span> {property.rating}
                </span>
              </div>
              <div className="property-information">
                <span className="property-badge">{property.occupant}</span>
                <span className="property-location">
                  <FontAwesomeIcon icon={faLocationDot} size="lg" />
                  {property.location.village}, {property.location.district},{" "}
                  {property.location.city}, {property.location.province}
                </span>
                <span className="property-stocks">
                  Sisa {property.stocks} kamar
                </span>
              </div>
              <div className="property-price">
                Rp {property.price.toLocaleString()} / Bulan
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Deskripsi</Accordion.Header>
                  <Accordion.Body>
                    <p>{property.description}</p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Fasilitas</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Luas: {property.details.size}</li>
                      <li>Kamar Mandi: {property.details.bathrooms}</li>
                      <li>
                        Perabotan:{" "}
                        {property.details.furnished ? "Ada" : "Tidak ada"}
                      </li>
                      <li>
                        WiFi: {property.details.wifi ? "Ada" : "Tidak ada"}
                      </li>
                      <li>AC: {property.details.ac ? "Ada" : "Tidak ada"}</li>
                      <li>
                        Dapur: {property.details.kitchen ? "Ada" : "Tidak ada"}
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="floating-form">
            <div className="form-content">
              <h4>Sewa Kost</h4>
              <div>
                <label>Tanggal Mulai:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div>
                <label>Jumlah Bulan:</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  min="1"
                  className="month-input"
                />
              </div>
              <button className="rent-button" onClick={handleRent}>
                Sewa
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DetailPropertyPage;
