const corsOptions = {
  credentials: true,
  //origin: "https://catena.motoburti.ge",
  origin: (origin, callback) => {
    callback(null, true);
  },
};

export default corsOptions;
