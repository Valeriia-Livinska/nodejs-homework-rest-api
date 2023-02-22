const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    console.log(email);
    console.log(subscription);
    
  res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
