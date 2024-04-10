// This script is run to clear out and seed the databases with data for demo purposes.
// It's useful now, but when in production, I run it weekly to clear out 
// any data from users who may have entered real information or offensive information. 

const fs = require('fs').promises;
const DBSetup = require('./DBsetup.js');
const bcrypt = require('bcrypt');
const LoginUser = DBSetup.getUserLoginsModel();
const User =  DBSetup.getUserMainModel();

async function main() {
	// Clear out all entries from all collections to "reset" the data.
  await LoginUser.deleteMany({});
  await User.deleteMany({});

	// Get the seed data from the JSON file
  const contactsData = await fs.readFile('/var/www/html/mossletters/models/contacts.json');
  const contacts = JSON.parse(contactsData);

	// Apply the same process to each entry in contacts
	const promises = contacts.map(async contact => {
		// Because this is fake, we're hashing the same password for fake users. 
		const hashedPassword = await bcrypt.hash("DummyUserNoPassword", 10);

		// Create new user in the logins DB Schema
		let login = new LoginUser({
			email: contact.email,
			password: hashedPassword,
		});

		// Put user into the the DB
		const savedLogin = await login.save();

		// Now get and separate names for the main DB.
		let [firstName, lastName] = contact.name.split(' ');

		// Convert JSON date text (formatted as "year,month,day,hour,minute") into a Date object.
		const dateComponents = contact.entryDate.split(',').map(Number);
		const date = new Date(...dateComponents);		// ooooooh spread operator :) 

		// Create new user in the main User DB Schema
		let user = new User({
			created: date,
			firstName: firstName,
			lastName: lastName, 
			email: contact.email,
			frequency: contact.frequency, 		// The type of mossletters the user prefers to receive
			projects: contact.projects,				// Which mossletter topics the user wishes to receive  						
			loginID: savedLogin._id,					// The user's ID in the logins DB. 
		});
		
		// Put that one into it's DB too
		return user.save();
	});

	// Waiting for the promises from the previous block to resolve
  await Promise.all(promises);


  process.exit();
}

// Run it and log any errors.
main().catch(error => console.error(error));