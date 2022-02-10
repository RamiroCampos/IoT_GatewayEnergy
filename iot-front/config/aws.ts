import axios from "axios";
import { toast } from "react-toastify";
import thingSpeakApi from "./axios";

const postAwsData = async () => {
  const url =
    "https://aiudh3hi27.execute-api.us-east-2.amazonaws.com/gateway/sendEmailEnergyGateway";

  try {
    const { data } = await thingSpeakApi.get("/feeds.json?average=daily");
    const thingSpeakData: any[] = data.feeds.filter(
      (obj: any) => obj.field1 !== null
    );
    const response = await axios({
      method: "POST",
      url: url,
      data: JSON.stringify({ thingSpeakData }),
    });

    if (response.status === 200) {
      toast.success("Email enviado!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("Erro ao enviar email!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

export default postAwsData;
