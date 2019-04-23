class APIError extends Error {
  constructor(message = 'Internal Server Error', status = 500) {
    super(message);
    this.status = status;
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        status: this.status
      }
    };
  }
}

module.exports = APIError;
