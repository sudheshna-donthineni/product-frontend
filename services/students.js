import client from "services/API/rootClient.js";

export default {
  getAllStudents() {
    return new Promise((resolve) => {
      client.get("/students/get-all").then((response) => {
        // console.log("API:", response.data)
        resolve(response.data);
      });
    });
  },
};
