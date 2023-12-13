const ContractModel = require("../Models/Contract");
class ContractController {
    static createcontact = async (req, res) => {
        try{
            let d = req.body;
            let data = await ContractModel.create(d);
            await data.save();
             res.status(201).json({ msg: "Contact successfully created!..", data });
        } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
       }
    };
    static getcontactus = async (req,res) => {
        let pages = req.query.pages;
        try{
            let user = await ContractModel.find()
            .skip(10 * (pages -1))
            .limit(10);
            res.status(200).json(user);
        }catch (error) {
            res.status(500).json({ msg: "Data Not Found" });
          }
    };
}
module.exports = ContractController;