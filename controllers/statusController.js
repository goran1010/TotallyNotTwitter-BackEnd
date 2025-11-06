import prisma from "../db/prisma.js";
import supabase from "../db/supabase.js";

export function status(req, res) {
  const user = req.user;
  res.status(200).json({ id: user.id, username: user.username });
}

export function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Successfully logged out." });
  });
}

export async function updateProfile(req, res) {
  const { userId, firstName, lastName } = req.body;

  if (req.file) {
    const { size, buffer } = req.file;

    if (buffer && size > 0 && size <= 10 * 1024 * 1024) {
      const currentProfile = await prisma.profile.findUnique({
        where: { userId },
        select: { avatar: true },
      });

      if (currentProfile && currentProfile.avatar) {
        const currentAvatarPath = currentProfile.avatar
          .split("/")
          .slice(-2)
          .join("/");

        const { error } = await supabase.storage
          .from("avatars")
          .remove([currentAvatarPath]);
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Error removing old avatar:", error);
        }
      }

      const ext = req.file.originalname.split(".").pop();
      const filePath = `${userId}/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Error uploading file" });
      }

      const publicData = await supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      await prisma.profile.update({
        where: { userId: userId },
        data: {
          firstName: firstName,
          lastName: lastName,
          avatar: publicData.data.publicUrl,
        },
      });

      return res.json({
        userId,
        firstName,
        lastName,
        avatar: publicData.data.publicUrl,
      });
    }
  }

  await prisma.profile.update({
    where: { userId: userId },
    data: {
      firstName: firstName || null,
      lastName: lastName || null,
    },
  });
  res.json({ userId, firstName, lastName });
}
