const errorHandler = (err, req, res, next) => {
  if (err.message.includes("PDF")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Resume file size should be less than 2MB",
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Server error",
  });
};

export default errorHandler;
