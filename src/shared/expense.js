import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:5000";

export const getExpense = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    console.log("error =>", error);
    alert("뭔가 잘못된 것 같아요! 데이터를 로드할 수가 없어요!");
  }
};

export const postEsxpense = async (newExpense) => {
  try {
    const response = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return response.data;
  } catch (error) {
    console.log("error =>", error);
    alert("뭔가 잘못된 것 같아요! 데이터가 써지지가 않아요!");
  }
};
