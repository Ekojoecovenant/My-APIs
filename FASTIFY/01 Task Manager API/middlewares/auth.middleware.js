import jwt from "jsonwebtoken";

export async function verifyToken(req, reply) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return reply.code(401).send({ msg: "No token provided" });

    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id, email, role, is_premium}
  } catch (err) {
    return reply.code(401).send({ msg: "Invalid token" });
  }
}

export function requireRole(role) {
  return async (req, reply) => {
    if (req.user.role !== role) {
      return reply.code(403).send({ msg: "Forbidden: Unauthorized User" });
    }
  };
}

export function requirePremium(req, reply) {
  if (!req.user.is_premium) {
    return reply.code(403).send({ msg: "Premium required" });
  }
}

// exports.verifyToken = (req, res, next) => {
//   const auth = req.headers["authorization"];
//   const token = auth?.split(" ")[1];

//   if (!token) return res.status(401).json({ msg: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ msg: "Invalid token" });
//   }
// };
