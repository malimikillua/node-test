import app from "./app";
const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});
