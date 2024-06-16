import NavbarUserComponent from "../components/NavbarUserComponent";
import ListProperty from "../components/PropertyPageComponent/ListProperty";
import "../dist/property.css";

const PropertyPage = () => {
  return (
    <div>
      <NavbarUserComponent />
      <ListProperty />
    </div>
  );
};

export default PropertyPage;
