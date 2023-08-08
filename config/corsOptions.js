const corsOptions = {
  credentials: true,
  //origin: "http://localhost:3000",
  origin: (origin, callback) => {
    callback(null, true);
  },
};

export default corsOptions;
