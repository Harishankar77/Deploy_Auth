const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://hari-auth.onrender.com"
    : "http://localhost:4000";

export default backendUrl;
