const {
  getIndividualRegistrationData,
  getCrewRegistrationData
} = require('../data/registration.utils');

const singleRegistration = async (_, args, { dataSources }) => {
  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const combinedData = [...individualData, ...hsCrewData];

  // find the registration with the transactionId = args.transactionId
  const registration = combinedData.find(
    registration => registration.transactionId === args.transactionId
  );
  return registration;
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

const searchRegistrations = async (_, args, { dataSources }) => {
  // if args.input is blank or < 2 characters return an empty array
  if (args.input === '' || args.input.split('').length < 2) return [];

  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const combinedData = [...individualData, ...hsCrewData];

  const filteredData = combinedData
    .map(reg => {
      if (
        reg.firstName.toLowerCase().includes(args.input.toLowerCase()) ||
        reg.lastName.toLowerCase().includes(args.input.toLowerCase()) ||
        reg.transactionId === args.input ||
        reg.state.toLowerCase() === args.input.toLowerCase()
      )
        return reg;
    })
    .filter(val => val != null);
  return filteredData;
};

module.exports = {
  Query: {
    singleRegistration,
    inividualRegistrations,
    hsCrewRegistrations,
    allRegistrations,
    searchRegistrations
  }
};
