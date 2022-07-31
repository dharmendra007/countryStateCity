//import express
const express = require("express");

// Include routings
const userRoutes = require("./userRoutes");
const stockRoutes = require("./stockRoutes");
const saleRoutes = require("./saleRoutes");
const brandRoutes = require("./brandRoutes");
const productCategoryRoutes = require("./productCategoryRoutes");
const measurementRoutes = require("./measurementRoutes");
const branchRoutes = require("./branchRoutes");

const router = express.Router();

router.get("/healthcheck", (req, res) => {
    const greeting = "Healthy";
    res.json(greeting);
});
// Include routes
router.use("/user", userRoutes);
router.use("/stock", stockRoutes);
router.use("/sale", saleRoutes);
router.use("/brand", brandRoutes);
router.use("/productCategory", productCategoryRoutes);
router.use("/measurement", measurementRoutes);
router.use("/branch", branchRoutes);

module.exports = router;