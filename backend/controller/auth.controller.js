const { formidable } = require("formidable");
const validator = require("validator");
const registerModel = require("../models/auth.model");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const error = [];
    const flattenField = {};
    Object.keys(fields).forEach((key) => {
      flattenField[key] = fields[key][0];
    });
    const { username, email, password, confirmPassword } = flattenField;

    if (!username) {
      error.push("Provide your user name");
    }
    if (!email) {
      error.push("Provide your email address");
    }
    if (email && !validator.isEmail(email)) {
      error.push("Provided email has a wrong format");
    }
    if (!password) {
      error.push("Provide your password");
    }
    if (!confirmPassword) {
      error.push("Provide your confirm password");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("Password and confirm password doesn't match");
    }
    if (password && password.length < 8) {
      error.push("Password must be at least 8 characters");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide your avatar");
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const getImageName = files.avatar[0].originalFilename;
      const randNumber = Math.floor(Math.random() * 99999);
      files.avatar[0].originalFilename = randNumber + getImageName;

      const newPath = `../frontend/src/assets/images/${files.avatar[0].originalFilename}`;
      try {
        const checkUser = await registerModel.findOne({
          email,
        });
        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Provided email already existed"],
            },
          });
        } else {
          fs.copyFile(files.avatar[0].filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                username,
                email,
                password: await bcrypt.hash(password, 10),
                avatar: files.avatar[0].originalFilename,
              });
              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  username: userCreate.username,
                  avatar: userCreate.avatar,
                  registerTime: userCreate.createdAt,
                },
                process.env.SECRET,
                {
                  expiresIn: process.env.TOKEN_EXP,
                },
              );
              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000,
                ),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Successfully registered",
                token,
              });
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server Error"],
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Internal Server Error"],
          },
        });
      }
    }
  });
};

module.exports.userLogin = async (req, res) => {
  const error = [];
  const { email, password } = req.body;
  if (!email) {
    error.push("Please provide your email");
  }
  if (!password) {
    error.push("Please provide your password");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Provided email has a wrong format");
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      const checkUser = await registerModel
        .findOne({
          email: email,
        })
        .select("+password");

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password,
        );

        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.usermame,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.SECRET,
            {
              expiresIn: process.env.TOKEN_EXP,
            },
          );
          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000,
            ),
          };

          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Successfully logged in",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Your password is not valid"],
            },
          });
        }
      } else {
        res.status(400).json({
          error: {
            errorMessage: ["Your email is not found"],
          },
        });
      }
    } catch {
      res.status(404).json({
        error: {
          errorMessage: ["Internal Server Error"],
        },
      });
    }
  }
};
