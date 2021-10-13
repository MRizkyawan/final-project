const { Bus } = require("../models");
const joi = require("joi");

module.exports = {
  createBus: async (req, res) => {
    const body = req.body;
    try {
      const checkJoi = joi.object({
        bus_name: joi.string().require(),
        air_conditioner: joi.boolean().require(),
        toilet: joi.boolean().require(),
        free_meal: joi.boolean().require(),
        charger: joi.boolean().require(),
        comfortable_seat: joi.boolean().require(),
        wifi: joi.boolean().require(),
        photo_collection: joi.array().items(joi.text()).require(),
        seat: joi.integer().require(),
      });
      const { error } = checkJoi.validate(
        {
          ...body,
        },
        { abortEarly: false }
      );
      if (error) {
        res.status(400).json({
          status: "failed",
          massage: "wrong input",
          error: error["details"][0]["message"],
        });
      }
      const createnewBus = await Bus.create({
        bus_name: body.bus_name,
        air_conditioner: body.air_conditioner,
        toilet: body.toilet,
        free_meal: body.free_meal,
        charger: body.charger,
        comfortable_seat: body.comfortable_seat,
        wifi: body.wifi,
        photo_collection: body.photo_collection,
        seat: body.seat,
        published: body.published,
        review_id: body.review_id,
      });
      res.status(200).json({
        status: "success",
        massage: "bus created successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },

  readBus: async (req, res) => {
    try {
      const readBus = await Bus.findAll();
      res.status(200).json({
        status: "success",
        massage: "success retrived data",
        data: readBus,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },

  updateBus: async (req, res) => {
    const body = req.body;
    const busID = req.params.id;
    try {
      const editBus = await Bus.update(
        { ...body },
        {
          where: {
            id: busID,
          },
        }
      );

      if (!editBus[0]) {
        res.status(400).json({
          status: "failed",
          massage: "unable to edit",
        });
      }
      res.status(200).json({
        status: "success",
        massage: "edited successfully",
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
      const deleteBus = await Bus.destroy({
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
        massage: "deleted successfuly",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },
};
