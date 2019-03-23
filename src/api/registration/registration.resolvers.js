const {
  getIndividualRegistrationData,
  getCrewRegistrationData
} = require('../data/registration.functions');

const inividualRegistrations = async (_, __, { dataSources }) => {
  const data = getIndividualRegistrationData(dataSources);
  return data;
};

const hsCrewRegistrations = async (_, __, { dataSources }) => {
  const data = getCrewRegistrationData(dataSources);
  return data;
};

const allRegistrations = async (_, __, { dataSources }) => {
  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const combinedData = [...individualData, ...hsCrewData];
  return combinedData;
};

module.exports = {
  Query: {
    inividualRegistrations,
    hsCrewRegistrations,
    allRegistrations
  }
};
