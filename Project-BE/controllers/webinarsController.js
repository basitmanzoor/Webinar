const Webinar = require("../models/webinarModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//POST Webinar by the admin
const createWebinar = catchAsync(async (req, res, next) => {
  const data = req.body;
  //   const user_id = req.params._id;
  const webinar = await Webinar.create(data);

  if (!webinar) {
    return next(new AppError("Webinar cannot be created", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Webinar created successfully",
    data: {
      webinar,
    },
  });
});

//Get the past webinars
const getpastwebinars = catchAsync(async (req, res, next) => {
  let currentTime = new Date().toISOString();

  const webinar = await Webinar.find({
    startTime: { $lt: currentTime },
  }).select("-video");

  if (!webinar) {
    return next(
      new AppError("Cannot find the webinars that are already in the past", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Past Webinars found successfully",
    data: {
      webinar,
    },
  });
});

//Get the upcomming webinars
const getupcommingwebinars = catchAsync(async (req, res, next) => {
  let currentTime = new Date().toISOString();

  const webinar = await Webinar.find({
    startTime: { $gt: currentTime },
  })
    .select("-video")
    .select("-registeredUsers");

  if (!webinar) {
    return next(
      new AppError("Cannot find the webinars that are upcomming", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Upcoming Webinars found successfully",
    data: {
      webinar,
    },
  });
});

//Get the ongoing webinars
const ongoingwebinars = catchAsync(async (req, res, next) => {
  let currentTime = new Date().toISOString();

  const webinar = await Webinar.find({
    startTime: { $lte: currentTime },
    endTime: { $gt: currentTime },
  }).select("-video");

  if (!webinar) {
    return next(
      new AppError("Cannot find the webinars that are upcomming", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Ongoing Webinars found successfully",
    data: {
      webinar,
    },
  });
});

//register for webinar using name and email
const registerWebinar = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const webinarId = req.params.id;
  const name = req.user.name;
  const email = req.user.email;
  const userId = req.user._id;

  let user = await User.findById(userId);
  if (user.registeredWebinars.includes(webinarId)) {
    return res.status(200).json({
      status: "registered",
      message: "You are already registered for this webinar",
    });
  }
  const webinar = await Webinar.findByIdAndUpdate(
    webinarId,
    {
      //push the webinar booking
      $push: {
        registeredUsers: {
          name,
          email,
        },
      },
    },
    { new: true }
  );

  if (!webinar) {
    return next(new AppError("Cannot register for the webinar "));
  }

  user = await User.findByIdAndUpdate(userId, {
    $push: {
      registeredWebinars: webinarId,
    },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Successfully registered for Webinar",
    data: {
      webinar,
    },
  });
});

//update the attended webinar by the user and handle the ongoing, past and upcoming webinars
const attendWebinar = catchAsync(async (req, res, next) => {
  const webinarId = req.params.id;
  const userId = req.user._id;
  let currentTime = new Date().toISOString();

  let user = await User.findById(userId);
  const webinar = await Webinar.findById(webinarId);

  if (!user.registeredWebinars.includes(webinarId)) {
    return res.status(200).json({
      status: "registered",
      message: "You are not registered for this webinar",
    });
  }

  if (!webinar) {
    return next(new AppError("Webinar not found", 404));
  }
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  let c = new Date(currentTime);
  let s = new Date(webinar.startTime);
  let e = new Date(webinar.endTime);

  if (c < s) {
    // Webinar has not started yet
    return res.status(200).json({
      status: "past",
      message: `Webinar has not started yet, Please wait till ${s}`,
    });
  } else if (c > e) {
    // Webinar is already over
    return res.status(200).json({
      status: "future",
      message: "Webinar is over",
    });
  }

  //check if the webinar is already attended
  if (user.attendedWebinars.includes(webinarId)) {
    return res.status(200).json({
      status: "attended",
      message: "You have already attended this webinar",
    });
  }
  // User can enter the webinar
  // Add the webinarId to the user's attended webinars

  setTimeout(async () => {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, attendedWebinars: { $ne: webinarId } }, // Check if webinarId is not already in the attendedWebinars array
      {
        $push: {
          attendedWebinars: webinarId,
        },
      },
      { new: true } // Return the updated document
    );

    // if (!updatedUser) {
    //   // return next(new AppError("updated user not dound", 404));
    //   console.log(
    //     `Webinar ID ${webinarId} is already in the attendedWebinars array.`
    //   );
    // }
  }, e - c);

  res.status(200).json({
    status: "success",
    message: "Successfully entered the webinar",
    data: {
      webinar,
    },
  });
});

//Get the list of regustered webinars
const registeredWebinars = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate(
    "registeredWebinars",
    "-registeredUsers"
  );

  if (!user) {
    return next(new AppError("user not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Registered webinars found successfully",
    data: {
      registeredWebinars: user.registeredWebinars,
    },
  });
});

//Get the list of attended webinars by the user (populate)
const getattendedWebinars = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId) // Exclude the registeredUsers field
    .populate("attendedWebinars", "-registeredUsers");

  if (!user) {
    return next(new AppError("user not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Registered webinars found successfully",
    data: {
      attendedWebinars: user.attendedWebinars,
    },
  });
});

//get allwebinars
const getallwebinars = catchAsync(async (req, res, next) => {
  const webinar = await Webinar.find().select("-video");

  if (!webinar) {
    return next(new AppError("Cannot find the webinars", 404));
  }

  res.status(200).json({
    status: "success",
    message: "All Webinars found successfully",
    data: {
      webinar,
    },
  });
});

//Watch webinar or get webinar by ID
const watchwebinar = catchAsync(async (req, res, next) => {
  const webinarId = req.params.id;
  const userId = req.user._id;
  let currentTime = new Date().toISOString();
  const user = await User.findById(userId);

  const webinar = await Webinar.findById(webinarId).select("-registeredUsers");

  let c = new Date(currentTime);
  let s = new Date(webinar.startTime);
  let e = new Date(webinar.endTime);
  if (!webinar) {
    return next(new AppError("Webinar not found with the given ID", 404));
  }

  if (!user.registeredWebinars.includes(webinarId)) {
    res.status(200).json({
      status: "not registered",
      message: "webinar not registered by the user. Please register first",
    });
  }
  if (c > e) {
    res.status(200).json({
      status: "over",
      message: "webinar is over",
    });
  }
  res.status(200).json({
    status: "success",
    message: "webinar found successfully",
    data: {
      webinar,
    },
  });
});

//get registered users
const getRegisteredUsers = catchAsync(async (req, res, next) => {
  const webinarId = req.params.id;
  const webinar = await Webinar.findById(webinarId).select("registeredUsers");
  if (!webinar) {
    return next(new AppError("Webinar not found with the given ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "webinar found successfully",
    data: {
      webinar,
    },
  });
});

module.exports = {
  getallwebinars,
  getpastwebinars,
  createWebinar,
  getupcommingwebinars,
  ongoingwebinars,
  registerWebinar,
  attendWebinar,
  getattendedWebinars,
  registeredWebinars,
  watchwebinar,
  getRegisteredUsers,
};
