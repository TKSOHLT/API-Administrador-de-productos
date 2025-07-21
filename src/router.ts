import { Router } from "express";

const router = Router();

//*Nota: HTTP solo soporta dos verbos "POST" y "GET"
router.get("/", (req, res) => {
  console.log("Desde get");
});

router.post("/", (req, res) => {
  console.log("Desde post");
});

router.put("/", (req, res) => {
  console.log("Desde put");
});

router.patch("/", (req, res) => {
  console.log("Desde patch");
});

router.delete("/", (req, res) => {
  console.log("Desde delete");
});

export default router;
