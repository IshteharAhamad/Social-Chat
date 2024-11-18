import mongoose from "mongoose";

const DBConnection = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.DB_URL}`);
    // console.log(connection.connection.host);
  } catch (error) {
    process.exit(1);
  }
};
export default DBConnection;
