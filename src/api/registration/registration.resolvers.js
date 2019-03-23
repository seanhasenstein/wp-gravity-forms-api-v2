const {
  getIndividualRegistrationData,
  getCrewRegistrationData
} = require('../data/registration.functions');

const singleRegistration = async (_, args, { dataSources }) => {
  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const combinedData = [...individualData, ...hsCrewData];

  // find the registration with the transactionId = args.transactionId
  const registration = combinedData.filter(
    registration => registration.transactionId === args.transactionId
  );
  return registration[0];
};

const inividualRegistrations = async (_, __, { dataSources }) => {
  const data = getIndividualRegistrationData(dataSources);
  return data;
};

const hsCrewRegistrations = async (_, __, { dataSources }) => {
  const data = await getCrewRegistrationData(dataSources);
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
    singleRegistration,
    inividualRegistrations,
    hsCrewRegistrations,
    allRegistrations
  }
};
