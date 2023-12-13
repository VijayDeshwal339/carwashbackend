const ServicePlanModel = require("../Models/ServicePlan");
class ServicePlanController {
  static serviceplan = async function (req, res) {
    try {
      const { ServiceType, Amount, CardContent } = req.body;
      const serviceplan = new ServicePlanModel({
        ServiceType,
        Amount,
        CardContent,
      });
      await serviceplan.save();
      res.status(200).json({ serviceplan });
    } catch (error) {
      res.status(400).json({ msg: "Error" });
    }
  };
 
}
module.exports = ServicePlanController;