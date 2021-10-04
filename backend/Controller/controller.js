const DB = require("../Model/database");

exports.PostForm = (req, res, next) => {
  const Name = req.body.fullname;
  const Email = req.body.email;
  const Phone_Number = req.body.phone;
  const Message = req.body.msg;

  const db = new DB({
    Name,
    Email,
    Phone_Number,
    Message,
  });
  db.save().then((result) => {
    res.send(200).json({ message: "User Created" });
    console.log("Created");
  });
};
