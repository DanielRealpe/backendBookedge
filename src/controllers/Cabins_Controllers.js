import { validationResult } from "express-validator";
import upload from "../middlewares/Multer.js";
import {
  getAllCabinsService,
  getCabinByIdService,
  createCabinService,
  updateCabinService,
  deleteCabinService,
  addComfortsService,
  updateComfortsService,
  changeStatusCabinService,
} from "../services/Cabin_Services.js";

export const getAllCabins = async (req, res) => {
  try {
    const cabins = await getAllCabinsService();
    res.status(200).json(cabins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCabinById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const cabin = await getCabinByIdService(req.params.id);
    res.status(200).json(cabin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createCabin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const cabinData = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
    };
    const cabin = await createCabinService(cabinData);
    res.status(201).json(cabin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateCabin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  upload.single("imagen")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const cabinData = {
        ...req.body,
        imagen: req.file ? req.file.filename : req.body.imagen,
      };
      await updateCabinService(req.params.id, cabinData);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const deleteCabin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await deleteCabinService(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addComforts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id, comfortId } = req.params;
    const { description, dateEntry } = req.body;
    await addComfortsService(id, comfortId, description, dateEntry,);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComforts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {  dateEntry, description } = req.body;
    await updateComfortsService(req.params.id, req.params.comfortId,description, dateEntry);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const changeStatusCabin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await changeStatusCabinService(req.params.id, req.body.status);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

