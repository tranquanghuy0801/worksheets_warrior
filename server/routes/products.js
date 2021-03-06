const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/worksheets')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.pFileName)
  },
})

const upload = multer({ storage: storage })

router.get('/all-product', productController.getAllProduct)
router.post('/product-by-category', productController.getProductByCategory)
router.post(
  '/by-category-descriptor',
  productController.getProductByCategoryDescriptor
)
router.post('/wish-product', productController.getWishProduct)

router.post('/add-product', upload.any(), productController.postAddProduct)
router.post('/edit-product', upload.any(), productController.postEditProduct)
router.post('/delete-product', productController.getDeleteProduct)
router.post('/single-product', productController.getSingleProduct)

router.post('/add-review', productController.postAddReview)
router.post('/delete-review', productController.deleteReview)

module.exports = router
