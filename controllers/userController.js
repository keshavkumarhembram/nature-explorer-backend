const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter 
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if(!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({
    quality: 90
    // above value is in %age
  }).toFile(`public/img/users/${req.file.filename}`);
  next();
});

const filterObj = (obj, ...allowedFields) => {
  newObj = {};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.updateMe =catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTs password data
  if(req.body.password || req.body.passwordConfirm) {
    return next('This route is not for password updates. Please use /update-password', 400);
  }
  console.log(req.body);
  const filteredBody = filterObj(req.body, 'name', 'email');
  console.log(filteredBody);
  if(req.file) filteredBody.photo = req.file.filename;
  // 2. Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody,{
    new: true,
    runValidators: true
  })
  console.log(updateUser);
  res.status(200).json({
    status: 'success',
    user: updateUser
  })
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {acive: false});
})

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

// DO NOT UPDATE PASSWORD WITH THIS
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
