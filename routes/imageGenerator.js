import express from 'express';
const router = express.Router();

// create routes
router.get('/', (req, res) => {
  async function query(data) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        headers: {
          Authorization: 'Bearer ' + process.env.HF_ACCESS_TOKEN,
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  query({ inputs: 'A cat with a halloween hat' }).then((response) => {
    // Use image
    res.type(response.type);
    response.arrayBuffer().then((buffer) => {
      res.send(Buffer.from(buffer));
    });
  });
});

export default router;
