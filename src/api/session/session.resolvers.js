const sessionsDataSource = require('../data/sessions.datasources');
const {
  getIndividualRegistrationData,
  getCrewRegistrationData
} = require('../data/registration.functions');

const singleSession = async (_, args, { dataSources }) => {
  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const allRegistrationData = [...individualData, ...hsCrewData];

  // Get the session from sessionsDataSource that correlates with args.id
  const sessionArray = sessionsDataSource.filter(
    session => session.id === parseInt(args.id)
  );

  // Pull out the session from the sessionArray
  const session = sessionArray[0];
  // Add an empty officials array to the session ojbect
  session.officials = [];

  // loop thru all registrations and add relevant registrations to the session.officials array
  allRegistrationData.forEach(registration => {
    // loop thru registration.entry.sessions array
    registration.sessions.forEach(registrationSession => {
      if (session.id === registrationSession.id) {
        session.officials.push(registration);
      }
    });
  });

  session.totalAttending = session.officials.length;

  return session;
};

module.exports = {
  Query: {
    singleSession
  }
};
