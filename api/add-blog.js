export default async function handler(req, res) {

  // ONLY allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {

    const { title, content } = req.body;

    console.log(title);
    console.log(content);

    return res.status(200).json({
      success: true,
      message: "Blog received successfully"
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

}
