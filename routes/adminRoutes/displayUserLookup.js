// displayUserLookup.js: Display user lookup tools

module.exports = async (req , res) => {
  res.render('adminView', { 
    currentTab: 'admin',
    title: "Admin Tools - Edit User", 
    toolChoice: true,   
    filterOptions: false, 
    showTable: false,
    filterButtons: false,
    enterUser: true, 
    displayUser: false,
    editButtons: false
  });
};
