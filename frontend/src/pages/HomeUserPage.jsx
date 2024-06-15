import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarUser from "../components/HomeUserPageComponent/NavbarUser";
import "../dist/homeuser.css";

const HomeUserPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    priceOrder: "",
    occupant: "",
    ratingOrder: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8; // jumlah properti per halaman

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties");
      const availableProperties = response.data.filter(
        (property) => property.status === "Tersedia"
      );
      setProperties(availableProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset halaman ke 1 saat pencarian diubah
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1); // Reset halaman ke 1 saat filter diubah
  };

  const handleClearFilters = () => {
    setFilter({
      priceOrder: "",
      occupant: "",
      ratingOrder: "",
    });
    setSearchTerm("");
    setCurrentPage(1); // Reset halaman ke 1 saat filter dibersihkan
  };

  const handleCardClick = (id) => {
    // implementasi fungsi klik kartu jika diperlukan
  };

  const filteredProperties = properties
    .filter((property) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        property.title.toLowerCase().includes(lowerSearchTerm) ||
        property.location.street.toLowerCase().includes(lowerSearchTerm) ||
        property.location.village.toLowerCase().includes(lowerSearchTerm) ||
        property.location.district.toLowerCase().includes(lowerSearchTerm) ||
        property.location.city.toLowerCase().includes(lowerSearchTerm) ||
        property.location.province.toLowerCase().includes(lowerSearchTerm) ||
        (property.location.country.toLowerCase().includes(lowerSearchTerm) &&
          property.status === "Tersedia")
      );
    })
    .sort((a, b) => {
      if (filter.priceOrder === "low") {
        return a.price - b.price;
      } else if (filter.priceOrder === "high") {
        return b.price - a.price;
      } else if (filter.ratingOrder === "high") {
        return b.rating - a.rating;
      } else if (filter.ratingOrder === "low") {
        return a.rating - b.rating;
      }
      return 0;
    })
    .filter((property) => {
      if (filter.occupant) {
        return property.occupant === filter.occupant;
      }
      return true;
    });

  // Hitung total halaman
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Pisahkan properti berdasarkan halaman saat ini
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const formatDetails = (details) => {
    const detailsArray = [];

    if (details.bathrooms === "Dalam") {
      detailsArray.push("KM Dalam");
    } else if (details.bathrooms === "Luar") {
      detailsArray.push("KM Luar");
    }

    if (details.wifi) detailsArray.push("WiFi");
    if (details.ac) detailsArray.push("AC");
    if (details.furnished) detailsArray.push("Isian");
    if (details.kitchen) detailsArray.push("Dapur");

    return detailsArray.join(" • ");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return <div className="pagination">{pageNumbers}</div>;
  };

  console.log("Filtered properties:", filteredProperties); // Log filtered properties

  return (
    <div>
      <NavbarUser />
      <section className="properties">
        <Container fluid>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Cari berdasarkan nama kos atau lokasi"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select
              name="priceOrder"
              value={filter.priceOrder}
              onChange={handleFilterChange}
            >
              <option value="">Pilih harga</option>
              <option value="low">Harga terendah</option>
              <option value="high">Harga tertinggi</option>
            </select>
            <select
              name="occupant"
              value={filter.occupant}
              onChange={handleFilterChange}
            >
              <option value="">Pilih occupant</option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
              <option value="Campur">Campur</option>
            </select>
            <select
              name="ratingOrder"
              value={filter.ratingOrder}
              onChange={handleFilterChange}
            >
              <option value="">Pilih rating</option>
              <option value="high">Rating tertinggi</option>
              <option value="low">Rating terendah</option>
            </select>
            <button onClick={handleClearFilters}>Clear</button>
          </div>
          <div className="property-list">
            {currentProperties.map((property) => (
              <div
                key={property._id}
                className="card"
                onClick={() => handleCardClick(property._id)}
              >
                <div className="card-img">
                  <img src={property.images[0]} alt={property.title} />
                  <div className="rating">★ {property.rating}</div>
                </div>
                <div className="card-body">
                  <div className="card-category">
                    <span className="badge">{property.occupant}</span>
                    <span className="card-stocks">
                      Sisa {property.stocks} kamar
                    </span>
                  </div>
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-location">{property.location.district}</p>
                  <p className="card-details">
                    {formatDetails(property.details)}
                  </p>
                  <p className="card-price">
                    {formatPrice(property.price)}/bulan
                  </p>
                </div>
              </div>
            ))}
          </div>
          {renderPagination()}
        </Container>
      </section>
    </div>
  );
};

export default HomeUserPage;