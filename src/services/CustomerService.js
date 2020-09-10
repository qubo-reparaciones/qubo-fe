export default class ApiService {
  static register(data) {
    return this.postHttp('/customer', data);
  }

  static postHttp(url, data) {
    // process.env.API_URL
    return fetch('http://localhost:8080' + url, {
      method: 'POST',
      body: data && JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}