import prisma from "../db";

// Get all
export const getSettings = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      settings: true,
    },
  });

  res.json({ data: user.settings });
};

// Create product
export const createSettings = async (req, res, next) => {
  try {
    const settings = await prisma.settings.create({
      data: {
        belongsToId: req.user.id,
        ...req.body,
      },
    });

    console.log("Product created: ", settings);

    res.json({ data: settings });
  } catch (e) {
    next(e);
  }
};

//Update product
export const updateSettings = async (req, res) => {
  const { id } = req.params;
  const settings = await prisma.settings.update({
    where: {
      id_belongsToId: {
        id,
        belongsToId: req.user.id,
      },
    },
    data: {
      ...req.body,
    },
  });

  res.json({ data: settings });
};
