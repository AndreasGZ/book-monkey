import axios, { AxiosResponse, Method } from "axios";

export default function bookApi<T>(method: Method, path: string, callback: (data: T) => void, data: any = ""): void {
  const basePath = "https://api3.angular-buch.com";
  let myInterceptor: number;

  // Add a response interceptor, for Get to get one Book
  // eslint-disable-next-line prefer-const
  myInterceptor = axios.interceptors.response.use(function (response) {
    if (response.data.published)
      // Published formatieren
      response.data.published = new Date(response.data.published).toLocaleDateString();
    return response;
  }, function (error) {
    error = "Can't get Books";
    return Promise.reject(error);
  });

  axios({
    url: `${basePath}${path}`,
    method: method,
    data: data
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