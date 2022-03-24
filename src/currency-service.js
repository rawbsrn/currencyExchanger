export default class CurrencyService {  
  static async getCurrency(code1, code2) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${code1}/${code2}`);
      if (!response.ok) {
        console.log(response);
        throw Error(response.type);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}