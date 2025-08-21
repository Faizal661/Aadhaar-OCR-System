import "../assets/styles/imageUpload.css";
import uploadIcon from "../assets/images/upload_icon.png";
import imageIcon from "../assets/images/upload_image.png";
import { useRef, useState } from "react";

const ImageUpload = () => {
  const AADHAAR_FRONT_REF = useRef<HTMLInputElement>(null);
  const AADHAAR_BACK_REF = useRef<HTMLInputElement>(null);

  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState("");
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState("");

  function frontImageClick() {
    AADHAAR_FRONT_REF.current?.click();
  }

  function backImageClick() {
    AADHAAR_BACK_REF.current?.click();
  }

  function aadhaarFrontImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAadhaarFrontPreview(imageUrl);
    }
  }

  function aadhaarBackImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAadhaarBackPreview(imageUrl);
    }
  }

  function removeImage(side: string) {
    if (side === "front") setAadhaarFrontPreview("");
    else if (side === "back") setAadhaarBackPreview("");
  }

  return (
    <div className="upload-body">
      <h3>Aadhaar Front</h3>

      {!aadhaarFrontPreview ? (
        <div className="upload-card" onClick={frontImageClick}>
          <img src={uploadIcon} alt="upload Icon" className="upload-icon" />
          <p>Click Here To Upload Image</p>
        </div>
      ) : (
        <>
          <div className="image-preview">
            <button
              className="remove-image-btn"
              onClick={() => removeImage("front")}
            >
              X
            </button>
            <img
              src={aadhaarFrontPreview}
              alt="aadhaar-front-preview"
              className="aadhaar-preview-image"
            />
          </div>
          <div className="change-image-div">
            <img src={imageIcon} alt="iamge icon" className="image-icon" />
            <button className="change-image-btn" onClick={frontImageClick}>
              {" "}
              Press to Re-Upload{" "}
            </button>
          </div>
        </>
      )}

      <h3>Aadhaar Back</h3>
      {!aadhaarBackPreview ? (
        <div className="upload-card" onClick={backImageClick}>
          <img src={uploadIcon} alt="upload Icon" className="upload-icon" />
          <p>Click Here To Upload Image</p>
        </div>
      ) : (
        <>
          <div className="image-preview">
            <button
              className="remove-image-btn"
              onClick={() => removeImage("back")}
            >
              X
            </button>
            <img
              src={aadhaarBackPreview}
              alt="aadhaar-back-preview"
              className="aadhaar-preview-image"
            />
          </div>
          <div className="change-image-div">
            <img src={imageIcon} alt="iamge icon" className="image-icon" />
            <button className="change-image-btn" onClick={backImageClick}>
              Press to Re-Upload
            </button>
          </div>
        </>
      )}

      <input
        type="file"
        name="aadhaar-input-front"
        id="aadhaar-input-front"
        className="aadhaar-input"
        ref={AADHAAR_FRONT_REF}
        accept="image/*"
        onChange={aadhaarFrontImageChange}
      />
      <input
        type="file"
        name="aadhaar-input-back"
        id="aadhaar-input-back"
        className="aadhaar-input"
        ref={AADHAAR_BACK_REF}
        accept="image/*"
        onChange={aadhaarBackImageChange}
      />

      <button id="parse-btn">parse aadhaar</button>
    </div>
  );
};

export default ImageUpload;
