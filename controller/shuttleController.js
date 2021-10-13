const { Shuttles } = require("../models");
const joi = require("joi");
const { body } = require("express-validator");

module.exports = {
  createShuttle: async (req, res) => {
    const body = req.body;
    try {
      const checkJoi = joi.object({
        city: joi.STRING().require(),
        address: joi.STRING().require(),
        total_bus: joi.INTEGER().require(),
        published: joi.BOOLEAN().require(),
      });
      const { error } = checkJoi.validate(
        {
          ...body,
        },
        { abortEarly: false }
      );
      if (error) {
        res.staus(400).json({
          status: "failed",
          massage: "wrong input",
          error: error["detail"][o]["massage"],
        });
      }
      const createnewShuttle = await Shuttles.create({
        city: body.city,
        address: body.address,
        total_bus: body.total_bus,
        published: body.published,
      });
      res.status(200).json({
        status: "success",
        massage: "shuttle create successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },
  readShuttle: async (req, res) => {
    try {
      const readShuttle = await Shuttles.findAll(
        res.status(200).json({
          status: "success",
          massage: "success retrived data",
          data: readShuttle,
        })
      );
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },
  updateShuttle: async (req, res) => {
    const body = req.body;
    const shuttleId = req.params.id;
    try {
      const updateShuttle = await Shuttles.update(
        { ...body },
        {
          where: {
            id: shuttleId,
          },
        }
      );
      if (!updateShuttle[0]) {
        res.status(400).json({
          status: "failed",
          massage: "unable to update",
        });
      }
      res.status(200).json({
        status: "success",
        massage: "bus has been update successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const deleteShuttle = await Shuttles.destroy({
        where: { id },
      });
      if (!deleteBus[0]) {
        res.status(400).json({
          status: "failed",
          massage: "unable to delete",
        });
      }
      res.status(200).json({
        status: "success",
        massage: "deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },
};
