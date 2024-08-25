// const db = require("./db");

import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export default function configurePassport() {
  console.log("hit");
  // passport.use(
  //   new LocalStrategy(async function verify(username, password, cb) {
  //     try {
  //       const result = await UserModel.findOne({ name: username });

  //       if (result) {
  //         const user = result;
  //         const storedHashedPassword = user.password;
  //         //   console.log(storedHashedPassword);
  //         bcrypt.compare(password, storedHashedPassword, (err, result) => {
  //           if (err) {
  //             return cb(err);
  //           } else {
  //             if (result) {
  //               return cb(null, user);
  //             } else {
  //               return cb(null, false, {
  //                 message: "The password is incorrect",
  //               });
  //             }
  //           }
  //         });
  //       } else {
  //         return cb(null, false, { message: "User Not Found!" });
  //       }
  //     } catch (err) {
  //       return cb(err);
  //     }
  //   })
  // );

  // passport.serializeUser((user, cb) => {
  //   console.log(user, "called1");
  //   cb(null, user);
  // });

  // passport.deserializeUser((user, cb) => {
  //   // const result = await UserModel.findOne({ name: username });
  //   console.log(user, "called");
  //   cb(null, user);
  // });
}
