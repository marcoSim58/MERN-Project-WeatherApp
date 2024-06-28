import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import UserModel from "./models/User.js";
import session from "express-session";

import bcrypt from "bcrypt";
import passport from "passport";
import configurePassport from "./passportConfig.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  })
);

app.use(
  session({
    secret: "DANIELCRAIG",
    resave: false,
    saveUninitialized: true,
    // cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    // }
  })
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport();

mongoose.connect(
  "mongodb+srv://codingninja:codingninja@app-admin.uesct1h.mongodb.net/?retryWrites=true&w=majority&appName=App-admin/user"
);

const API_KEY = "9e1f47438e4c72ffd0672f2f512c607f";

app.post("/getDaily", async (req, res) => {
  const cordinates = req.body;
  // console.log(cordinates);

  try {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cordinates.lat},${cordinates.lon}/next5days?unitGroup=metric&key=AYLFGFJJYYMTWQ49NVX4UP85A&contentType=json`
    );

    res.json(response.data);

    console.log(response.data);
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
    // console.log(response.data);
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
          `https://api.openweathermap.org/data/2.5/weather?q=Dombivli&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          const weatherData = response.data;
          res.json(weatherData);
          // console.log(weatherData);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with an error status code
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.log("No Response:", error.request);
          } else {
            // Something else happened while setting up the request
            console.log("Error:", error.message);
          }
        });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/getairIndex", async (req, res) => {
  const cordinates = req.body;

  // console.log(req.body);

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
    const location = req.body.newLocation;
    const name = req.body.name;
    if (location && name) {
      const updatedUser = await UserModel.updateOne(
        { name: name },
        {
          $set: { location: location },
        }
      );
      res.json({ updatedUser, location });
      // res.json(updatedUser.location);
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password, location } = req.body;
  const userExist = await UserModel.findOne({ name: username });
  const emailExist = await UserModel.findOne({ email: email });

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
        .then((response) => res.json(response))
        .catch((err) => res.json(err.message));
    });
  }
});

app.post("/login", (req, res, next) => {
  // const { username, password } = req.body;

  passport.authenticate("local", (err, user, info) => {
    // console.log("err:", err);
    // console.log("user:", user);
    // console.log("info:", info);
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
        res.status(200).json(user);
      });
    }
  })(req, res, next);

  // UserModel.findOne({ name: username })
  //   .then((user) => {
  //     if (user) {
  //       bcrypt.compare(password, user.password, (err, response) => {
  //         if (response) {
  //           res.json(user);
  //         } else {
  //           res.json("The password is incorrect");
  //         }
  //       });
  //     } else {
  //       res.json("User Not Found!");
  //     }
  //   })
  //   .catch((err) => res.json(err.message));
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
