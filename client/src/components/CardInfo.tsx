import "../assets/styles/cardInfo.css";
import { useAadhaar } from "../contexts/aadhaarContext";

const CardInfo = () => {
  const { ocrResult, isProcessing } = useAadhaar();

  const renderDetail = (label: string, value: string | boolean | undefined) => {
    let displayValue: string;
    let colorClass = "";

    if (value === true) {
      displayValue = "MATCHED";
      colorClass = "status-green";
    } else if (value === false) {
      displayValue = "MISMATCH!";
      colorClass ="status-red";
    } else if (typeof value === 'string' && value.includes("Age")) {
       displayValue = value;
    }
     else if (value) {
      displayValue = value;
    } else {
      displayValue = "N/A";
    }

    return (
      <div className="detail-row">
        <span className="detail-label">{label}:</span>
        <span className={`detail-value ${colorClass}`}>{displayValue}</span>
      </div>
    );
  };

  const renderContent = () => {
    if (isProcessing) {
      return (
        <div className="message-container">
          <p className="processing-message">Extracting details, please wait...</p>
        </div>
      );
    }
      
    if (ocrResult) {
      const {
        name,
        dob,
        gender,
        uid,
        address,
        pincode,
        isUidMatch,
        ageBand,
      } = ocrResult;

      return (
        <div className="aadhaar-details-grid">
          {renderDetail("Name", name)}
          {renderDetail("UID ", uid)}
          {renderDetail("Date of Birth",dob)}
          {renderDetail("Age Band", ageBand)}
          {renderDetail("Gender", gender)}
          {renderDetail("Address", address)}
          {renderDetail("Pincode", pincode)}
          <hr className="divider" />
          {renderDetail("UID Match Status", isUidMatch)}
        </div>
      );
    }

    return (
      <p className="initial-message">
        Start Performing OCR by inputting your Aadhaar front and back
      </p>
    );
  };

  return (
    <div className="card-body">
      <h3>Parsed Aadhaar Data</h3>
      <div className="api-response-box">
        {renderContent()}
      </div>
    </div>
  );
};

export default CardInfo;
