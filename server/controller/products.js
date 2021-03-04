const productModel = require('../models/products')
const fs = require('fs')
const path = require('path')
const { fromPath } = require('pdf2pic')
const rimraf = require('rimraf')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types.ObjectId

class Product {
  // Delete worksheet file from uploads folder
  static deleteFile(fileName) {
    let basePath =
      path.resolve(__dirname + '../../../') + '/public/uploads/worksheets/'
    fs.unlink(basePath + fileName, (err) => {
      if (err) {
        return err
      }
    })
  }

  // Delete images of worksheet from uploads folder
  static deleteImages(images) {
    let basePath =
      path.resolve(__dirname + '../../../') +
      '/public/uploads/worksheets-images/'
    for (let i = 0; i < images.length; i++) {
      let filePath = basePath + `${images[i]}`
      fs.unlink(filePath, (err) => {
        if (err) {
          return err
        }
      })
    }
  }

  async getAllProduct(req, res) {
    try {
      let Products = await productModel
        .find({})
        .populate('pCategory', '_id cName cImage')
        .populate('pDescriptor1', '_id dContent dCode')
        .populate('pDescriptor2', '_id dContent dCode')
        .populate('pDescriptor3', '_id dContent dCode')
      if (Products) {
        return res.json({ Products })
      }
    } catch (err) {
      console.error(err)
    }
  }

  async postAddProduct(req, res) {
    let {
      pName,
      pCategory,
      pGrade,
      pLevel,
      pStatus,
      pDescriptor1,
      pDescriptor2,
      pDescriptor3,
      pFileName,
      pKeywords,
    } = req.body
    let files = req.files
    console.log('Upload images')
    console.log(files)
    if (pKeywords === '') {
      pKeywords = []
    } else if (!pKeywords.includes(',')) {
      pKeywords = [pKeywords]
    } else {
      pKeywords = pKeywords.split(',')
    }
    // Validate File upload
    if (files.length != 1) {
      return res.json({ error: 'Must need to upload the worksheet file' })
    }
    // Validate other fileds
    else if (
      !pName |
      !pCategory |
      !pStatus |
      !pGrade |
      !pLevel |
      !pDescriptor1 |
      !pDescriptor2 |
      !pDescriptor3
    ) {
      Product.deleteFile(files[0].filename)
      return res.json({ error: 'All filled must be required' })
    }
    // Validate Name and description
    else if (pName.length > 300) {
      Product.deleteFile(files[0].filename)
      return res.json({ error: 'Name must not be 300 charecter long' })
    } else {
      try {
        let allImages = []
        let basePath = path.resolve(__dirname + '../../../')
        let outputDir =
          basePath +
          '/public/uploads/worksheets-images/' +
          pFileName.split('-')[0]
        fs.mkdirSync(outputDir, { recursive: true })
        const options = {
          density: 300,
          savePath: outputDir,
          format: 'png',
          width: 250,
          height: 350,
          quality: 100,
        }
        const convert = fromPath(
          basePath + '/public/uploads/worksheets/' + pFileName,
          options
        )
        convert
          .bulk(-1)
          .then((images) => {
            images.forEach((image) => {
              allImages.push(image.name)
            })
          })
          .then(async () => {
            console.log(allImages)
            let newProduct = new productModel({
              pImages: allImages,
              pName,
              pGrade,
              pCategory,
              pLevel,
              pStatus,
              pFile: pFileName,
              pDescriptor1,
              pDescriptor2,
              pDescriptor3,
              pKeywords: pKeywords,
            })
            let save = await newProduct.save()
            if (save) {
              return res.json({ success: 'Product created successfully' })
            }
          })
      } catch (err) {
        console.error(err)
      }
    }
  }

  async postEditProduct(req, res) {
    let {
      pId,
      pName,
      pStatus,
      pGrade,
      pLevel,
      pFile,
      pDescriptor1,
      pDescriptor2,
      pDescriptor3,
      pFileName,
      pKeywords,
    } = req.body
    let files = req.files
    console.log(files)
    if (pKeywords === '') {
      pKeywords = []
    } else if (!pKeywords.includes(',')) {
      pKeywords = [pKeywords]
    } else {
      pKeywords = pKeywords.split(',')
    }
    let editData = {
      pName,
      pGrade,
      pStatus,
      pLevel,
      pDescriptor1: pDescriptor1,
      pDescriptor2: pDescriptor2,
      pDescriptor3: pDescriptor3,
      pKeywords: pKeywords,
    }
    // Validate other fileds
    if (
      !pId |
      !pName |
      !pLevel |
      !pDescriptor1 |
      !pDescriptor2 |
      !pDescriptor3 |
      !pStatus
    ) {
      if (files.length > 0) {
        Product.deleteFile(files[0].filename)
      }
      return res.json({ error: 'All filled must be required' })
    }
    // Validate Name and description
    else if (pName.length > 300) {
      if (files.length > 0) {
        Product.deleteFile(files[0].fileName)
      }
      return res.json({ error: 'Name must not be 300 characters long' })
    } else {
      try {
        let basePath = path.resolve(__dirname + '../../../')
        if (files.length > 0) {
          let fileName = files[0].filename
          Product.deleteFile(pFile)
          rimraf.sync(
            basePath +
              '/public/uploads/worksheets-images/' +
              pFile.split('-')[0]
          )
          let outputDir =
            basePath +
            '/public/uploads/worksheets-images/' +
            fileName.split('-')[0]
          fs.mkdirSync(outputDir, { recursive: true })
          const options = {
            density: 300,
            savePath: outputDir,
            format: 'png',
            width: 250,
            height: 350,
            quality: 100,
          }
          let allImages = []
          const convert = fromPath(
            basePath + '/public/uploads/worksheets/' + fileName,
            options
          )
          convert
            .bulk(-1)
            .then((images) => {
              images.forEach((image) => {
                allImages.push(image.name)
              })
            })
            .then(async () => {
              console.log(allImages)
              editData = { ...editData, pFile: fileName, pImages: allImages }
              console.log(editData)
              let editProduct = productModel.findByIdAndUpdate(pId, editData)
              editProduct.exec((err) => {
                if (err) console.error(err)
                return res.json({ success: 'Product edit successfully' })
              })
            })
        } else {
          if (pFileName) {
            editData = { ...editData, pFile: pFileName }
            fs.renameSync(
              basePath + '/public/uploads/worksheets/' + pFile,
              basePath + '/public/uploads/worksheets/' + pFileName
            )
            fs.renameSync(
              basePath +
                '/public/uploads/worksheets-images/' +
                pFile.split('-')[0],
              basePath +
                '/public/uploads/worksheets-images/' +
                pFileName.split('-')[0]
            )
          }
          console.log(editData)
          let editProduct = productModel.findByIdAndUpdate(pId, editData)
          editProduct.exec((err) => {
            if (err) console.error(err)
            return res.json({ success: 'Product edit successfully' })
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  async getDeleteProduct(req, res) {
    let { pId } = req.body
    if (!pId) {
      return res.json({ error: 'All filled must be required' })
    } else {
      try {
        let deleteProductObj = await productModel.findById(pId)
        let deleteProduct = await productModel.findByIdAndDelete(pId)
        if (deleteProduct) {
          let basePath =
            path.resolve(__dirname + '../../../') +
            '/public/uploads/worksheets-images/'
          // Deleting from static file
          Product.deleteFile(deleteProductObj.pFile)
          rimraf.sync(basePath + deleteProductObj.pFile.split('-')[0])
          return res.json({ success: 'Product deleted successfully' })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  async getSingleProduct(req, res) {
    let { pId } = req.body
    if (!pId) {
      return res.json({ error: 'All filled must be required' })
    } else {
      try {
        let singleProduct = await productModel
          .findById(pId)
          .populate('pCategory', 'cName')
          .populate('pRatingsReviews.user', 'name email userImage')
        if (singleProduct) {
          return res.json({ Product: singleProduct })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body
    if (!catId) {
      return res.json({ error: 'All filled must be required' })
    } else {
      try {
        let products = await productModel
          .find({ pCategory: catId })
          .populate('pCategory', 'cName cImage')
        if (products) {
          return res.json({ Products: products })
        }
      } catch (err) {
        return res.json({ error: 'Search product wrong' })
      }
    }
  }

  async getProductByCategoryDescriptor(req, res) {
    let { catId, dFirstId } = req.body
    if (!catId || !dFirstId) {
      return res.json({ error: 'All filled must be required' })
    } else {
      try {
        let products = await productModel
          .find({ pCategory: catId, pDescriptor1: dFirstId })
          .populate('pCategory', 'cName cImage')
          .populate('pDescriptor1', '_id dContent dCode')
          .populate('pDescriptor2', '_id dContent dCode')
          .populate('pDescriptor3', '_id dContent dCode')
        if (products) {
          return res.json({ Products: products })
        }
      } catch (err) {
        return res.json({ error: 'Search product wrong' })
      }
    }
  }

  async getWishProduct(req, res) {
    let { productArray } = req.body
    if (productArray.length === 0) {
      return res.json({ error: 'All filled must be required' })
    } else {
      try {
        let wishProducts = await productModel
          .find({ _id: { $in: productArray } })
          .populate('pCategory', 'cName')
          .populate('pDescriptor1', '_id dContent dCode')
        if (wishProducts) {
          return res.json({ Products: wishProducts })
        }
      } catch (err) {
        return res.json({ error: 'Filter product wrong' })
      }
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: 'All filled must be required' })
    } else {
      let checkReviewRatingExists = await productModel.findOne({ _id: pId })
      if (checkReviewRatingExists.pRatingsReviews.length > 0) {
        checkReviewRatingExists.pRatingsReviews.map((item) => {
          if (item.user === uId) {
            return res.json({ error: 'Your already reviewd the product' })
          } else {
            try {
              let newRatingReview = productModel.findByIdAndUpdate(pId, {
                $push: {
                  pRatingsReviews: {
                    review: review,
                    user: uId,
                    rating: rating,
                  },
                },
              })
              newRatingReview.exec((err, result) => {
                if (err) {
                  console.error(err)
                }
                return res.json({ success: 'Thanks for your review' })
              })
            } catch (err) {
              return res.json({ error: 'Cart product wrong' })
            }
          }
        })
      } else {
        try {
          let newRatingReview = productModel.findByIdAndUpdate(pId, {
            $push: {
              pRatingsReviews: { review: review, user: uId, rating: rating },
            },
          })
          newRatingReview.exec((err, result) => {
            if (err) {
              console.error(err)
            }
            return res.json({ success: 'Thanks for your review' })
          })
        } catch (err) {
          return res.json({ error: 'Cart product wrong' })
        }
      }
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body
    if (!rId) {
      return res.json({ message: 'All filled must be required' })
    } else {
      try {
        let reviewDelete = productModel.findByIdAndUpdate(pId, {
          $pull: { pRatingsReviews: { _id: rId } },
        })
        reviewDelete.exec((err, result) => {
          if (err) {
            console.error(err)
          }
          return res.json({ success: 'Your review is deleted' })
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
}

const productController = new Product()
module.exports = productController
