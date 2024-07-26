const response = (statusCode, data, message, res) => {
  res.json({
    status_code: statusCode,
    payload: data,
    message: message,
    metadata: {
      prev: "",
      next: "",
      max: "",
    },
  });
};

module.exports = response;
