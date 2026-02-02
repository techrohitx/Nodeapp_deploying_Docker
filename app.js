const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// 🎨 Static HTML Page
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Node Docker Proxy App</title>
  <style>
    body {
      background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
      font-family: Arial, sans-serif;
      color: white;
      text-align: center;
      padding-top: 100px;
    }
    .card {
      background: rgba(0,0,0,0.6);
      padding: 40px;
      width: 420px;
      margin: auto;
      border-radius: 15px;
      box-shadow: 0 0 25px #00ffcc;
    }
    h1 {
      color: #00ffcc;
    }
    .badge {
      background: #00ffcc;
      color: black;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: bold;
      margin-top: 20px;
      display: inline-block;
    }
  </style>
</head>
<body>

  <div class="card">
    <h1>🚀 Node.js + Docker</h1>
    <p>Static Node application running inside Docker</p>
    <div class="badge">PROXY ENABLED</div>
    <p style="margin-top:25px;">Learning Proxy Server 🔁</p>
  </div>

</body>
</html>
  `);
});

// 🔁 Proxy Server Configuration
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://jsonplaceholder.typicode.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
