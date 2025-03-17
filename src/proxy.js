const express = require("express");
const router = express.Router();

router.get("/download-pdf", async (req, res) => {
  const pdfUrl = req.query.url;

  if (!pdfUrl) {
    return res.status(400).send("URL is required");
  }

  try {
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(pdfUrl);

    if (!response.ok) {
      throw new Error("Falhou a busca do PDF");
    }

    res.setHeader("Content-Type", "application/pdf");
    response.body.pipe(res);

  } catch (error) {
    res.status(500).send("Erro ao baixar PDF", error);
  }
});

module.exports = router;
