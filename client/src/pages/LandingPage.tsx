import "../assets/styles/LandingPage.css";
import CardInfo from "../components/CardInfo";
import ImageUpload from "../components/ImageUpload";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <ImageUpload />
      <CardInfo />
    </div>
  );
};

export default LandingPage;
