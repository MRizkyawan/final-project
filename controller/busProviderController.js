const { BusProvider } = require("../models");
const joi = require("joi");

module.exports = {
  createbusProvider: async (req, res) => {
    const body = req.body;
    const user = req.user;
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
      const createProvider = await BusProvider.create({
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
      });
      res.status(200).json({
        status: "success",
        massage: "succes create provider",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },

  readbusProvider: async (req, res) => {
    try {
      const readbusProvider = await BusProvider.findAll();
      res.status(200).json({
        status: "success",
        massage: "success retrived data",
        data: readbusProvider,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },

  updatebusProvider: async (req, res) => {
    const body = req.body;
    const providerID = req.params.id;
    try {
      const editbusProvider = await BusProvider.update(
        { ...body },
        {
          where: {
            id: providerID,
          },
        }
      );
      if (!editbusProvider[0]) {
        res.status(400).json({
          status: "failed",
          massage: "unable to update",
        });
      }
      res.status(200).json({
        status: "success",
        massage: "updated success",
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        massage: "internal server error",
      });
    }
  },
};
