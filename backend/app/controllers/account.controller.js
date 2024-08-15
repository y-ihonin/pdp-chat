exports.profileMe = async (req, res) => {
  await req.user.populate("roles");

  const roleNames = req.user.roles.map(role => role.name);

  const payload = {
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    roles: roleNames,
  };

  res.send(payload);
};

