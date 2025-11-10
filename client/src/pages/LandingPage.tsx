import "../assets/styles/LandingPage.css";
import CardInfo from "../components/CardInfo";
import ImageUpload from "../components/ImageUpload";
import AadhaarLogo from "../assets/images/Aadhaar_Logo.svg.png";
import { AadhaarProvider } from "../contexts/aadhaarProvider";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <img src={AadhaarLogo} alt="aadhaar png" className="aadhaar-logo" />
        <h1>Aadhaar OCR System</h1>
      </div>
      <AadhaarProvider>
        <div className="landing-body">
          <ImageUpload />
          <CardInfo />
        </div>
      </AadhaarProvider>
    </div>
  );
};

export default LandingPage;
