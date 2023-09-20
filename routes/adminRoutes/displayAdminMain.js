// displayAdminMain.js: Display the main admin dashboard

module.exports = async (req , res) => {
  res.render('adminView', {
    currentTab: 'admin',
    title: "Employee Tools",  
    toolChoice: true,   
    filterOptions: false, 
    showTable: false,
    filterButtons: false,
    enterUser: false, 
    displayUser: false,
    editButtons: false
  });  
};
