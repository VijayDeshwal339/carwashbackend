const ContactModel = require("../Models/Contact");
class ContactController {
  static createcontact = async (req, res) => {
    try {
      let d = req.body;
      let data = await ContactModel.create(d);
      await data.save();
      // await data.save();
      res.status(200).json({ msg: "Contact successfully created!..", data });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };
  static getcontactus = async (req, res) => {
    let pages = req.query.pages;
    try {
      let user = await ContactModel.find()
        .skip(10 * (pages - 1))
        .limit(10); //pagination 0f 10 user detail.
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Data Not Found" });
    }
  };
}
module.exports = ContactController;