import "../assets/styles/imageUpload.css";
import uploadIcon from "../assets/images/upload_icon.png";
import imageIcon from "../assets/images/upload_image.png";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import uploadAadhaarImages from "../services/uploadAadhaar";
import { useAadhaar } from "../contexts/aadhaarContext";
import toast from "react-hot-toast";

const ImageUpload = () => {
  const { setOcrResult, setIsProcessing } = useAadhaar();

  const AADHAAR_FRONT_REF = useRef<HTMLInputElement>(null);
  const AADHAAR_BACK_REF = useRef<HTMLInputElement>(null);

  const [aadhaarFrontFile, setAadhaarFrontFile] = useState<File | null>(null);
  const [aadhaarBackFile, setAadhaarBackFile] = useState<File | null>(null);

  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState("");
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState("");

  const uploadAadhaarImagesMutation = useMutation({
    mutationFn: uploadAadhaarImages,
    onMutate: () => {
      setIsProcessing(true);
      setOcrResult(null);
    },
    onSuccess: (data) => {
      console.log("Upload successful!", data);
      toast.success("Successfully parsed Aadhaar details.", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background:'#99FF99'
        },
      });
      setOcrResult(data.extractedAadhaarData);
    },
    onError: (err) => {
      setOcrResult(null);
      toast(
        err.message || "Failed to parse Aadhaar details due to server error.",
        {
          icon: "❌",
          style: {
            borderRadius: "10px",
          },
        }
      );
    },
    onSettled: () => {
      setIsProcessing(false);
    },
  });

  const frontImageClick = () => {
    AADHAAR_FRONT_REF.current?.click();
  };

  const backImageClick = () => {
    AADHAAR_BACK_REF.current?.click();
  };

  const aadhaarFrontImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setAadhaarFrontFile(file);
      setAadhaarFrontPreview(imageUrl);
      setOcrResult(null);
    }
  };

  const aadhaarBackImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setAadhaarBackFile(file);
      setAadhaarBackPreview(imageUrl);
      setOcrResult(null);
    }
  };

  const removeImage = (side: string) => {
    if (side === "front") {
      setAadhaarFrontPreview("");
      setAadhaarFrontFile(null);
    } else if (side === "back") {
      setAadhaarBackPreview("");
      setAadhaarBackFile(null);
    }
    setOcrResult(null);
  };

  const handleUpload = () => {
    if (!aadhaarFrontFile || !aadhaarBackFile) {
      toast("Please select both Aadhaar front and back images.", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background:"#f333"
        },
      });
      return;
    }

    uploadAadhaarImagesMutation.mutate({
      frontImage: aadhaarFrontFile,
      backImage: aadhaarBackFile,
    });
  };

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

      <button
        id="parse-btn"
        onClick={handleUpload}
        disabled={uploadAadhaarImagesMutation.isPending}
      >
        {uploadAadhaarImagesMutation.isPending
          ? "Uploading..."
          : "Parse Aadhaar"}
      </button>
    </div>
  );
};

export default ImageUpload;
