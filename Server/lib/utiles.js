// import jwt from "jsonwebtoken";

// export const genrateToken = (userId) => {
//   const token = jwt.sign(
//     { id: userId }, // ✅ payload as object
//     process.env.JWT_SECRET, // ✅ secret key from .env
//     { expiresIn: "7d" } // optional expiry time
//   );
//   return token;
// };


import jwt from "jsonwebtoken";

export const genrateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
