import axios from 'axios'

export const sendCodeToRunServer = async function(lang: string, code: string) {
    let headersList = {
        "Accept": "*/*",
      }

      let formdata = new FormData();
      formdata.append("code", code);
      formdata.append("lang", lang);

      let bodyContent = formdata;

      let reqOptions = {
        url: `http://127.0.0.1:5000/`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }

      let response = await axios.request(reqOptions);
      return response.data
}