import prisma from "../db/prisma.js";

export async function getProfile(req, res) {
  try {
    const { userId } = req.body;
    console.log(userId);

    const profile = await prisma.profile.findUnique({ where: { userId } });
    res.json(profile);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(400).json({ message: "Unable to get profile info" });
  }
}
