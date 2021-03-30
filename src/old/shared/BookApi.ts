import axios, { AxiosResponse, Method } from "axios";

export default function bookApi<T>(method: Method, path: string, callback: (data: T) => void): void {
  const basePath = "https://api3.angular-buch.com";
  let myInterceptor: number;

  // Add a response interceptor, for Get to get one Book
  if (method === "get" && path.includes("/book/"))
    myInterceptor = axios.interceptors.response.use(function (response) {
      // Published formatieren
      response.data.published = new Date(response.data.published).toLocaleDateString().toString();
      return response;
    }, function (error) {
      error = "Can't get Books";
      return Promise.reject(error);
    });

  axios({
    url: `${basePath}${path}`,
    method: method
  }).then(
    (response: AxiosResponse<T>) => {
      callback(response.data);
    }
  ).then(
    // Interceptor nach dem Aufruf wieder rauswerfen
    () => { axios.interceptors.response.eject(myInterceptor); }
  ).catch(
    error => console.log(error)
  );
}