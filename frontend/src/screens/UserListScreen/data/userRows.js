const userRows = (users) =>
  users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    actions: user._id,
  }));

export default userRows;
