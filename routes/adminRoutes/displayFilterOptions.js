// displayFilterOptions.js: Displays filter dashboard elements of admin view

module.exports = async (req , res) => {
  res.render('adminView', { 
    currentTab: 'admin',
    title: "Admin Tools - Edit User", 
    toolChoice: true,   
    filterOptions: true, 
    showTable: false,
    filterButtons: true,
    enterUser: false, 
    displayUser: false,
    editButtons: false
  });
};
