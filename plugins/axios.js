export default function({ $axios, error }) {
  $axios.onError(e => {
    if (e.response.status === 401) {
      error({
        statusCode: "401",
        message: "You're not authenticated"
      });
    } else if (e.response.status === 403) {
      error({
        statusCode: "403",
        message: "You're not authorized to access this page"
      });
    } else if (e.response.status === 404) {
      error({ statusCode: "404", message: "This page could not be found" });
    }
  });
}
