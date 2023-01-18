import axios from "axios";

const postConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const submitInvoiceForm = (val: any) => {
  return axios.post("/api/submit-form", val, postConfig);
};
