const Agri = require('../models/Agri');

async function getAllAgri() {
  try {
    const agri = await Agri.find();
    return agri;
  } catch (error) {
    throw Error('Error while getting all agri data');
  }
}

async function getAgriById(id) {
  try {
    const agri = await Agri.findById(id);
    return agri;
  } catch (error) {
    throw Error('Error while getting agri data by ID');
  }
}

async function createAgri(agriData) {
  try {
    const agri = new Agri(agriData);
    await agri.save();
    return agri;
  } catch (error) {
    throw Error('Error while creating agri data');
  }
}

async function updateAgri(id, agriData) {
  try {
    const agri = await Agri.findByIdAndUpdate(id, agriData, { new: true });
    return agri;
  } catch (error) {
    throw Error('Error while updating agri data');
  }
}

async function deleteAgri(id) {
  try {
    await Agri.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw Error('Error while deleting agri data');
  }
}

module.exports = {
  getAllAgri,
  getAgriById,
  createAgri,
  updateAgri,
  deleteAgri,
};
