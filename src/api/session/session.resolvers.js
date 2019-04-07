const sessionsDataSource = require('../data/sessions.datasources');
const {
  getIndividualRegistrationData,
  getCrewRegistrationData
} = require('../data/registration.utils');

const singleSession = async (_, args, { dataSources }) => {
  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const allRegistrationData = [...individualData, ...hsCrewData];

  // Get the session from sessionsDataSource that correlates with args.id
  const session = sessionsDataSource.find(
    session => session.id === parseInt(args.id)
  );

  // Add an empty officials array to the session ojbect
  session.officials = [];

  // loop thru all registrations and push the officials
  // that registered for that session onto the sessions array
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

const allSessions = async (_, __, { dataSources }) => {
  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const allRegistrationData = [...individualData, ...hsCrewData];

  // loop thru the sessionDataSource and count all registrations from
  // allRegistrationData for each session to get the numberAttending and
  // the officials for each session.
  const addDataToSessions = sessionsDataSource.map(dataSourceSession => {
    dataSourceSession.officials = [];
    allRegistrationData.forEach(registration => {
      registration.sessions.forEach(registrationSession => {
        if (dataSourceSession.id === registrationSession.id) {
          dataSourceSession.officials.push(registration);
        }
      });
    });

    dataSourceSession.totalAttending = dataSourceSession.officials.length;
    return dataSourceSession;
  });

  return addDataToSessions;
};

module.exports = {
  Query: {
    singleSession,
    allSessions
  }
};
