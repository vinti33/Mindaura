
// Temporary auth middleware
export const authMiddleware = (req, res, next) => {
  // Hardcode a fake user for now (replace with real auth later)
  req.user = { id: "64f3c123abc456789def0123" }; // this "id" is fine!
  next();
};
