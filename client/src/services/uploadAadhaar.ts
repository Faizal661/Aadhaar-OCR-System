import api from "../config/axios.config.ts";

const uploadAadhaarImages = async (data: {
  frontImage: File;
  backImage: File;
}) => {
  const formData = new FormData();
  formData.append("aadhaarFront", data.frontImage);
  formData.append("aadhaarBack", data.backImage);

  const response = await api.post("/upload-aadhaar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default uploadAadhaarImages