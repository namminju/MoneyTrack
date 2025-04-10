import axios from "axios";
import dateUtil from "./date";

//API키
const API_KEY = 'O068G145zX5ZVutMYuoBN0XSgi8SxANZ'; //원래 이렇게 저장하면 안돔

//URL
const API_URL = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";

const today = new Date(); //오늘
const yesterday = today.setDate(today.getDate() - 1);  //어제
const formatYesterday = dateUtil.formatDate(yesterday, 'yyyyMMdd');

let url = `/exchange?authkey=${API_KEY}&searchdate=${formatYesterday}&data=AP01`;
// let url = `${API_URL}?authkey=${API_KEY}&searchdate=${formatYesterday}&data=AP01`;

const exchangeRate = {

  /**원달러 환율 */
  async Wondollor(from = 1, to = '') {
    url += '&cur_unit=USD';
    const response = await axios.get(url);
    return response.data;
  },

  /**원옌 환율 */
  async WonYen(from = 1, to = '') {
    url += '&cur_unit=JPY(100)';
    const response = await axios.get(url);
    return response.data;
  },

  /**원위안 환율 */
  async WonYen(from = 1, to = '') {
    url += '&cur_unit=CNH';
    const response = await axios.get(url);
    return response.data;
  }
}

export default exchangeRate;
