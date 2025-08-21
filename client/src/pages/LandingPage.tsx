import "../assets/styles/LandingPage.css";
import CardInfo from "../components/CardInfo";
import ImageUpload from "../components/ImageUpload";
import AadhaarLogo from "../assets/images/Aadhaar_Logo.svg.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <img src={AadhaarLogo} alt="aadhaar png" className="aadhaar-logo" />
        <h1>Aadhaar OCR System</h1>
      </div>
      <div className="landing-body">
        <ImageUpload />
        <CardInfo />
      </div>
    </div>
  );
};

export default LandingPage;
