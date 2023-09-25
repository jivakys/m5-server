const express = require("express");
const { empModel } = require("../model/empModel");
const empRouter = express.Router();

empRouter.post("/employees", async (req, res) => {
  const payload = req.body;
  try {
    const employee = await new empModel(payload);
    await employee.save();
    res.status(200).send({
      message: "New Emplyoee added",
      employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

empRouter.get("/allEmp", async (req, res) => {
  try {
    const emp = await empModel.find();
    res.status(201).send(emp);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

empRouter.put("/:id", async (req, res) => {
  try {
    const emp = await empModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).send({ msg: "employee update", emp });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

empRouter.delete("/:id", async (req, res) => {
  try {
    const emp = await empModel.findByIdAndRemove(req.params.id);
    res.status(204).send({ msg: "employee Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

empRouter.get("/filter", async (req, res) => {
  try {
    const department = req.query.department;
    const emp = await empModel.find({ department });
    res.status(201).send(emp);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

empRouter.get("/sort", async (req, res) => {
  try {
    const order = req.query.order === "desc" ? -1 : 1;
    const emp = await empModel.find().sort({ salary: order });
    res.status(201).send(emp);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

empRouter.get("/search", async (req, res) => {
  try {
    const firstname = req.query.firstname;
    const emp = await empModel.find({
      firstname: { $regex: firstname, $options: "i" },
    });
    res.status(201).send(emp);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

module.exports = { empRouter };
