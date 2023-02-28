const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: 'confirmation of registration',
    // html: `<div>
    // <h1>Welcome to the phonebook server</h1>
    // <p>click to confirm registration &darr;</p>
    // <a target="_blank" href="http://localhost:3000/goit-react-hw-08-phonebook/user">Press to confirm</a>
    // </div>`,
    html: `<div>
    <h1>Welcome to the phonebook server</h1>
    <p>click to confirm registration &darr;</p>
    <a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Press to confirm</a>
    </div>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
