require('dotenv').config();
const bcrypt = require('bcrypt');


async function createAdmin(db) {
  try {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,10);
    const existingAdmin = await db.admin.findOne({ where: { email: process.env.ADMIN_EMAIL } });

    if (!existingAdmin) {
      await db.admin.create({
        email: process.env.ADMIN_EMAIL,
        name: 'Default Admin',
        password: hashedPassword,
        role: 'admin'
      });

      console.log('Admin account created successfully');
    } else {
      console.log('Admin account already exists');
    }
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
}
 module.exports = createAdmin;