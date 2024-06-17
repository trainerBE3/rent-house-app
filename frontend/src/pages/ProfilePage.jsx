import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import NavbarUserComponent from "../components/NavbarUserComponent";
import "../dist/profile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    fullname: "",
    email: "",
    no_phone: "",
  });

  useEffect(() => {
    let valUser = JSON.parse(localStorage.getItem("user"));
    const userId = valUser.id;
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`/api/users/detail/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const user = response.data;
        setUserData(user);
        setProfileImage(user.img_url);
        setUpdatedData({
          fullname: user.fullname,
          email: user.email,
          no_phone: user.no_phone,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const res = await axios.post(`/api/users/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const newImgUrl = res.data.img_url + `?t=${new Date().getTime()}`;
      setProfileImage(newImgUrl);
      alert("Foto profil berhasil diunggah");
      setUserData((prevState) => ({
        ...prevState,
        img_url: newImgUrl,
      }));
    } catch (err) {
      console.error(err);
      alert("Gagal mengunggah foto profil");
    }
  };

  const handleShowUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      userData.fullname === updatedData.fullname &&
      userData.email === updatedData.email &&
      userData.no_phone === updatedData.no_phone
    ) {
      alert("Tidak ada perubahan data untuk diperbarui");
      return;
    }

    try {
      const res = await axios.put(`/api/users/update`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUserData(res.data);
      setProfileImage(res.data.img_url);
      alert("Data berhasil diupdate");
      setShowUpdateForm(false);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        alert("Gagal mengupdate data: " + err.response.data.errors[0].msg);
      } else {
        alert("Gagal mengupdate data");
      }
      setShowUpdateForm(false);
    }
  };

  return (
    <>
      <NavbarUserComponent />
      <section className="profile-page">
        <Container>
          <div className="data-profile">
            <div className="profile-image">
              {profileImage ? (
                <img src={profileImage} alt="Profil" width="100" />
              ) : (
                "Belum ada foto"
              )}
            </div>
            <div className="profile-actions">
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload Foto Profil</button>
            </div>
            <div className="profile-details">
              <p>Fullname: {userData.fullname}</p>
              <p>Email: {userData.email}</p>
              <p>No Phone: {userData.no_phone}</p>
              <p>Role: {userData.role === 1 ? "Penyewa" : "Pemilik"}</p>
              <button onClick={handleShowUpdateForm}>
                {showUpdateForm ? "Tutup Formulir Pembaruan" : "Perbarui Data"}
              </button>
            </div>
            {showUpdateForm && (
              <div className="update-form">
                <h3>Update Data</h3>
                <form onSubmit={handleUpdate}>
                  <div className="input-update">
                    <label>Fullname: </label>
                    <input
                      type="text"
                      name="fullname"
                      value={updatedData.fullname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-update">
                    <label>Email: </label>
                    <input
                      type="email"
                      name="email"
                      value={updatedData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-update">
                    <label>No Phone: </label>
                    <input
                      type="text"
                      name="no_phone"
                      value={updatedData.no_phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit">Update</button>
                </form>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
