const axios = require('axios');
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async show(req, res) {

    const { github_username } = req.params;

    const dev = await Dev.find({
      github_username
    });

    return res.json(dev);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.find({ github_username });

    if (dev.length === 0) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
      const { name , bio, avatar_url } = apiResponse.data;
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
    
      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });
    }
  
    return res.json(dev);
  },

  async update(req, res) {

    const { github_username } = req.params;

    const alterations = req.body;

    if(alterations.github_username) {
      delete alterations.github_username;
    }

    console.log(alterations);

    await Dev.updateOne({ github_username }, alterations);

    return res.json({
      message: "Usuário alterado com sucesso!"
    })
  },
}