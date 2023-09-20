// displayFilteredUsers.js: Retrieve and display users filtered by admin criteria

const Main = require('../../models/DBsetup').getUserMainModel();

module.exports = async (req , res) => {
  // Extract the filtering criteria from the request query
  const freq = req.query['admin-frequency'];
  const proj = req.query['admin-projects'];


  // Find the users that match the frequency and projects criteria
  const userList = await Main.find({
    $or: [
      { frequency: freq },
      { frequency: 'all' }
    ],
    projects: { $in: proj }
  });
  
  
  // Convert the retrieved user documents to plain objects
  const userObjectList = userList.map(userData => userData.toObject());

  // Check if any users were found
  if (userObjectList) {
    // Render the admin view with the filtered users and the current filter criteria
    res.render('adminView', { 
      currentTab: 'admin',
      title: "Admin Tools - Edit User", 
      userList: userObjectList,      
      projectFilter: proj,
      frequencyFilter: freq,
      toolChoice: true,   
      filterOptions: false, 
      showTable: true,
      filterButtons: true,
      enterUser: false, 
      displayUser: false,
      editButtons: false
    });
  } else {
    // If no users were found, render the admin view with an appropriate message
    res.render('adminView', { 
      currentTab: 'admin',
      title: "Admin Tools - Edit User", 
      message: "Search Came Up empty",
      toolChoice: true,   
      filterOptions: true, 
      showTable: false,
      filterButtons: false,
      enterUser: false, 
      displayUser: false,
      editButtons: false
    });
  }
};
