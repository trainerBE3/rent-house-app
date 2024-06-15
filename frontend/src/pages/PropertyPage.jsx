import NavbarProperty from "../components/PropertyPageComponent/NavbarProperty";
import ListProperty from "../components/PropertyPageComponent/ListProperty";
import "../dist/property.css";

const PropertyPage = () => {
  return (
    <div>
      <NavbarProperty />
      <ListProperty />
    </div>
  );
};

export default PropertyPage;
