const ServiceModel = require("../Models/Servicerequest");
class ServiceController {
  static createservice = async (req, res) => {
    let d = req.body;
    let data1 = await ServiceModel.create(d);
    res.send({ msg: "Service Successfully Created!...", data1 });
  };
  static getallservice = async (req, res) => {
    let pages = req.query.pages;
    try {
      let user = await ServiceModel.find()
        .skip(10 * (pages - 1))
        .limit(10); //pagination 0f 10 user detail.
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Data Not Found" });
    }
  };
  static getServiceByid = async (req, res) => {
    try {
      let serviceid = req.params.id;
      console.log("serviceid", serviceid);
      const service = await ServiceModel.findById(serviceid);
      res
        .status(200)
        .json({ msg: "Supervisior Successfully get!...", service });
    } catch (err) {
      res.status(500).json({ msg: "Data Not Found" });
    }
  };
  static editservice = async (req, res) => {
    try {
      let id = req.params.id;
      let updateservice = req.body;

      let updaterequest = await ServiceModel.findByIdAndUpdate(
        id,
        updateservice,
        {
          new: true,
        }
      );
      if (!updaterequest) {
        res.status(404).json({ msg: "User Not Found" });
      }
      res
        .status(200)
        .json({ msg: "Service update successfully!..", updaterequest });
    } catch (err) {}
  };
 
  static deleteservice = async (req, res) => {
    try {
      let d = req.params.id;
      const service = await ServiceModel.deleteOne({ _id: d }); // Assuming 'id' is the field in your schema
      if (service.deletedCount === 1) {
        res.status(200).json({ msg: "Service successfully deleted!", service });
      } else {
        res.status(404).json({ msg: "Service not found or not deleted!" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Internal server error", error: err.message });
    }
  };
}
module.exports = ServiceController;