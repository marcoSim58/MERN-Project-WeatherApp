import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import UserModel from "./models/User.js";
import session from "express-session";

import bcrypt from "bcrypt";
import passport from "passport";

import cookieParser from "cookie-parser";
import { Strategy } from "passport-local";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ["Content-Type", "Accept", "Origin", "X-Requested-With"],
    allowedHeaders: ["Content-Type", "Accept", "Origin", "X-Requested-With"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(
  session({
    secret: "danieljack",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);

app.use(cookieParser("danieljack"));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL);

const API_KEY = process.env.OPEN_WEATHER_KEY;
const API_KEY2 = process.env.VISUALCROSSING_KEY;

app.post("/getDaily", async (req, res) => {
  const cordinates = req.body;

  try {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cordinates.lat},${cordinates.lon}/next5days?unitGroup=metric&include=current&key=${API_KEY2}&contentType=json`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/getHourly", async (req, res) => {
  const cordinates = req.body;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${API_KEY}&units=metric&cnt=6`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/getweather", async (req, res) => {
  const { location } = req.body;

  try {
    if (location) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          const weatherData = response.data;
          res.json(weatherData);
        })
        .catch((error) => {
          res.status(error.response.status).json(error.response.data.message);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/getairIndex", async (req, res) => {
  const cordinates = req.body;

  try {
    if (cordinates) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${API_KEY}`
        )
        .then((response) => {
          res.json(response.data.list[0].main.aqi);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/location", async (req, res) => {
  try {
    const { newLocation, name } = req.body;

    if (newLocation && name) {
      const updatedUser = await UserModel.updateOne(
        { name: name },
        {
          $set: { location: newLocation },
        }
      );

      req.session.passport.user.location = newLocation;
      res.json({ updatedUser, newLocation });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password, location } = req.body;
  const userExist = await UserModel.findOne({ name: username });
  const emailExist = await UserModel.findOne({ email: email });
  // console.log(req.body);
  if (userExist || emailExist) {
    res.json(userExist ? "badusername" : "badmail");
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      UserModel.create({
        name: username,
        email,
        password: hash,
        location,
      })
        .then(() => res.json(200).status(200))
        .catch((err) => res.json(err.message));
    });
  }
});

app.post("/authCheck", (req, res) => {
  console.log(req.headers.cookie, "hit");

  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).send("Not authenticated");
  }
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.json({ message: "Logged out successfully" });
  });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Internal server error");
    }
    if (!user) {
      res.status(401).json(info.message);
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json("Login error");
        }
        res.status(200).json({
          name: user.name,
          email: user.email,
          location: user.location,
        });
      });
    }
  })(req, res, next);
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await UserModel.findOne({ name: username });

      if (result) {
        const user = result;
        const storedHashedPassword = user.password;

        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false, {
                message: "The password is incorrect",
              });
            }
          }
        });
      } else {
        return cb(null, false, { message: "User Not Found!" });
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  const { _id, ...editedLocation } = user.location.toObject();
  const newUser = {
    name: user.name,
    location: editedLocation,
    email: user.email,
  };
  cb(null, newUser);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server is running on port 3001");
});
