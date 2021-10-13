const { BusSchedule, Bus, BusProvider, Shuttle } = require("../models");
const joi = require("joi");
const Sequelize = require("sequelize");
const { body } = require("express-validator");

module.exports = {
  createbusSchedule: async (req, res) => {
    model.sequelize
      .transaction({
        autocommit: false,
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
      })
      .then(async (transaction) => {
        try {
          if (user.roles == "user") {
            return res.status(400).json({
              status: "failed",
              massage: "not allowed",
            });
          }
          const checkJoi = joi.object({
            provider_name: joi.string().required(),
            city: joi.string().required(),
            email: joi.string().required(),
            phone: joi.string().required(),
            tax_id: joi.string().required(),
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
          const createProvider = await BusProvider.create(
            {
              provider_name: body.provider_name,
              city: body.city,
              email: body.email,
              phone: body.phone,
              website: body.website,
              facebook: body.facebook,
              instagram: body.instagram,
              photo: body.photo,
              banking_name: body.banking_name,
              banking_account: body.banking_account,
              tax_id: body.tax_id,
              ktp_owner: body.ktp_owner,
              owner_picture: body.owner_picture,
            },
            { transaction }
          );

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
          const createnewBus = await Bus.create(
            {
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
            },
            { transaction }
          );
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
          const createnewShuttle = await Shuttle.create(
            {
              city: body.city,
              address: body.address,
              total_bus: body.total_bus,
              published: body.published,
            },
            { transaction }
          );
          const creatbusSchedule = await BusSchedule.create(
            {
              departure_time: body.TIME,
              arrival_time: body.TIME,
              shuttle_id: createnewShuttle.dataValues.id,
              bus_id: createnewBus.dataValues.id,
              bus_provider_id: createProvider.dataValues.id,
              destination_city: body.STRING,
              departure_city: body.STRING,
              destination_shuttle: body.STRING,
              departure_shuttle: body.STRING,
              available_seat: body.INTEGER,
            },
            { transaction }
          );
          transaction.commit();
          res.status(200).json({
            status: "success",
            massage: "data create success",
          });
        } catch (error) {
          console.log(error);
          transaction.rollback();
        }
      });
  },

  updateBusschedule: async (req, res) => {
    const body = req.body;
    const scheduleID = req.params.id;
    try {
      const editSchedule = await BusSchedule.update(
        { ...body },
        {
          where: {
            id: scheduleID,
          },
        }
      );
      if (!editSchedule[0]) {
        res.status(400).jsaon({
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
      const deleteSchedule = await BusSchedule.destroy({
        where: { id },
      });
      if (!deleteSchedule[0]) {
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
