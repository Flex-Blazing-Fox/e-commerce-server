const getAuthorizedTasks = (req, id) => {
  if (req.authorizedTasks) {
    let authorizedTasks = req.authorizedTasks.map((task) => task.dataValues),
      tasks = authorizedTasks.find((task) => task.id === +id);
    return tasks;
  } else return;
};

module.exports = getAuthorizedTasks;
