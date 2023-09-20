// filterXML.js: Endpoint to present admin-selected users as XML

const Main = require('../../models/DBsetup').getUserMainModel();

module.exports = async (req, res) => {
  // Retrieve frequency and projects filter parameters from the request
  const freq = req.query['admin-frequency'];
  const proj = req.query['admin-projects'];

  // Query the database for users that match the provided frequency and projects filters
  const userList = await Main.find({frequency: freq, projects: { $in: proj }});

  // Initialize the XML string, starting with the XML declaration and root element
  let userXML = '<?xml version="1.0" encoding="UTF-8"?>\n<users>';

  // Iterate through the user list, appending each user's data as XML to the userXML string
  for (let user of userList) {
    userXML +=
      `
      <user>
      <created>${user.created}</created>
      <firstName>${user.firstName}</firstName>
      <lastName>${user.lastName}</lastName>
      <email>${user.email}</email>
      <projects>
        ${user.projects.map(project => `<project>${project}</project>`).join('')}
      </projects>
      <frequency>${user.frequency}</frequency>
    </user>
      `;
  }

  // Close the root element
  userXML += '</users>';

  // Set the Content-Type header to 'application/xml' to indicate that the response is in XML format
  res.setHeader('Content-Type', 'application/xml');

  // Send the constructed XML data as the response
  res.send(userXML);
};
