const { products } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!products.length) {
    return res.status(400).json({
      msg: "Malumot topilmadi",
      variant: "error",
      payload: null,
    });
  }
  res.status(200).json({
    msg: "Barcha malumotlar",
    variant: "success",
    payload: products,
    total: products.length,
  });
});

router.post("/", (req, res) => {
  let existProduct = products.find(
    (product) => product.title === req.body.title
  );
  if (existProduct) {
    return res.status(400).json({
      msg: "Title mavjud",
      variant: "warning",
      payload: null,
    });
  }
  let newProduct = {
    id: new Date().getTime(),
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    url: req.body.url,
  };
  products.push(newProduct);
  res.status(201).json({
    msg: "Qoshildi",
    variant: "success",
    payload: newProduct,
  });
});

router.delete("/:id", (req, res) => {
  let productsIndex = products.findIndex(
    (products) => products.id === parseInt(req.params.id)
  );
  if (productsIndex < 0) {
    return res.status(400).json({
      msg: "Product topilmadi",
      variant: "error",
      payload: null,
    });
  }
  products.splice(productsIndex, 1);
  res.status(200).json({
    msg: "O'chirildi",
    variant: "success",
    payload: null,
  });
});

router.put("/:id", (req, res) => {
  let id = +req.params.id;
  let productsIndex = products.findIndex((product) => product.id === id);
  if (productsIndex < 0) {
    return res.status(400).json({
      msg: "Product topilmadi",
      variant: "error",
      payload: null,
    });
  }
  let updateProduct = {
    id,
    ...req.body,
  };
  products.splice(productsIndex, 1, updateProduct);
  res.status(200).json({
    msg: "O'zgartirildi",
    variant: "success",
    payload: updateProduct,
  });
});

module.exports = router;
