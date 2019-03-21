const {
  individualSessions,
  hsCrewDealSessions
} = require('../session/session.datasource');

async function getIndividualRegistrationData(dataSources) {
  const registrations = await dataSources.singleRegistrationAPI.getRegistrations();

  const data = registrations.entries.map(entry => {
    // Put each session entry into an array so we can manipulate the data
    const sessionsArray = [
      entry['50.1'],
      entry['50.2'],
      entry['50.3'],
      entry['50.4'],
      entry['50.5'],
      entry['50.6'],
      entry['50.7'],
      entry['50.8'],
      entry['50.9'],
      entry['51.1'],
      entry['51.2'],
      entry['51.3'],
      entry['51.4'],
      entry['51.5'],
      entry['51.6'],
      entry['51.7'],
      entry['51.8'],
      entry['51.9']
    ];

    const updatedSessionsArray = sessionsArray
      // Filter out the blank array values
      .filter(value => value != '')
      // Map over the sessionsArray and update the values
      .map(entry => {
        if (entry === '170 (Kau WC Fri Sat') {
          return (entry = individualSessions[0]);
        }
        if (entry === '170 (Kau WC Sat Sun)') {
          return (entry = individualSessions[1]);
        }
        if (entry === '170 (Kau MC Sat Sun)') {
          return (entry = individualSessions[2]);
        }
        if (entry === '85 (Kau HS Fri)') {
          return (entry = individualSessions[3]);
        }
        if (entry === '85 (Kau HS Sat AM)') {
          return (entry = individualSessions[4]);
        }
        if (entry === '85 (Kau HS Sat PM Two Person)') {
          return (entry = individualSessions[5]);
        }
        if (entry === '85 (Kau HS Sat PM Three Person)') {
          return (entry = individualSessions[6]);
        }
        if (entry === '85 (Kau HS Sun Two Person)') {
          return (entry = individualSessions[7]);
        }
        if (entry === '85 (Kau HS Sun Three Person)') {
          return (entry = individualSessions[8]);
        }
        if (entry === '170 (Ply WC Fri Sat)') {
          return (entry = individualSessions[9]);
        }
        if (entry === '170 (Ply WC Sat Sun)') {
          return (entry = individualSessions[10]);
        }
        if (entry === '170 (Ply MC Sat Sun)') {
          return (entry = individualSessions[11]);
        }
        if (entry === '85 (Ply HS Fri)') {
          return (entry = individualSessions[12]);
        }
        if (entry === '85 (HS Sat AM)') {
          return (entry = individualSessions[13]);
        }
        if (entry === '85 (HS Sat PM Two Person)') {
          return (entry = individualSessions[14]);
        }
        if (entry === '85 (HS Sat PM Three Person)') {
          return (entry = individualSessions[15]);
        }
        if (entry === '85 (HS Sun Two Person)') {
          return (entry = individualSessions[16]);
        }
        if (entry === '85 (HS Sun Three Person)') {
          return (entry = individualSessions[17]);
        } else {
          return {
            id: 0,
            title: 'Could not find this session',
            category: '-',
            level: '-',
            date: '-',
            time: '-',
            location: '-',
            year: '-',
            crewDeal: false,
            price: 0
          };
        }
      });

    var entryObject = {
      date: entry['26'],
      entryId: entry['id'],
      firstName: entry['4.3'],
      lastName: entry['4.6'],
      streetAddress: entry['7.1'],
      streetAddress2: entry['7.2'],
      city: entry['7.3'],
      state: entry['7.4'],
      zipcode: entry['7.5'],
      phone: entry['6'],
      email: entry['5'],
      wiaaNumber: entry['8'],
      wiaaClass: entry['54'],
      officialsAssociation: entry['42'],
      foodAllergies: entry['34'],
      emergencyName: entry['56'],
      emergencyNumber: entry['22'],
      sessions: updatedSessionsArray,
      transactionId: entry['transaction_id'],
      paymentAmount: entry['payment_amount'],
      paymentStatus: entry['payment_status'],
      paymentMethod: entry['payment_method'],
      cardNumber: entry['14.1']
    };

    return entryObject;
  });
  return data;
}

async function getCrewRegistrationData(dataSources) {
  const registrations = await dataSources.hsCrewRegistrationAPI.getRegistrations();

  const data = registrations.entries.map(entry => {
    const sessionsArray = [
      entry['3.1'],
      entry['3.2'],
      entry['3.3'],
      entry['3.4'],
      entry['3.5'],
      entry['3.6'],
      entry['4.1'],
      entry['4.2'],
      entry['4.3'],
      entry['4.4'],
      entry['4.5'],
      entry['4.6']
    ];

    const updatedSessionsArray = sessionsArray
      // Filter out the blank array values
      .filter(value => value != '')
      // Map over the sessionsArray and update the values
      .map(entry => {
        if (entry === '75 (Kau HS Fri)') {
          return (entry = hsCrewDealSessions[0]);
        }
        if (entry === '75 (Kau HS Sat AM)') {
          return (entry = hsCrewDealSessions[1]);
        }
        if (entry === '75 (Kau HS Sat PM Two Person)') {
          return (entry = hsCrewDealSessions[2]);
        }
        if (entry === '75 (Kau HS Sat PM Three Person)') {
          return (entry = hsCrewDealSessions[3]);
        }
        if (entry === '75 (Kau HS Sun Two Person)') {
          return (entry = hsCrewDealSessions[4]);
        }
        if (entry === '75 (Kau HS Sun Three Person)') {
          return (entry = hsCrewDealSessions[5]);
        }
        if (entry === '75 (Ply HS Fri)') {
          return (entry = hsCrewDealSessions[6]);
        }
        if (entry === '75 (HS Sat AM)') {
          return (entry = hsCrewDealSessions[7]);
        }
        if (entry === '75 (HS Sat PM Two Person)') {
          return (entry = hsCrewDealSessions[8]);
        }
        if (entry === '75 (HS Sat PM Three Person)') {
          return (entry = hsCrewDealSessions[9]);
        }
        if (entry === '75 (HS Sun Two Person)') {
          return (entry = hsCrewDealSessions[10]);
        }
        if (entry === '75 (Ply HS Sun Three Person)') {
          return (entry = hsCrewDealSessions[11]);
        } else {
          return {
            id: 0,
            title: 'Could not find this session',
            category: '-',
            level: '-',
            date: '-',
            time: '-',
            location: '-',
            year: '-',
            crewDeal: true,
            price: 0
          };
        }
      });

    var entryObject = {
      date: entry['1'],
      entryId: entry['id'],
      firstName: entry['6.3'],
      lastName: entry['6.6'],
      streetAddress: entry['9.1'],
      streetAddress2: entry['9.2'],
      city: entry['9.3'],
      state: entry['9.4'],
      zipcode: entry['9.5'],
      phone: entry['8'],
      email: entry['7'],
      wiaaNumber: entry['11'],
      wiaaClass: entry['10'],
      officialsAssociation: entry['12'],
      crewSize: entry['2'],
      crewMembers: entry['23'],
      foodAllergies: entry['13'],
      emergencyName: entry['14'],
      emergencyNumber: entry['16'],
      sessions: updatedSessionsArray,
      transactionId: entry['transaction_id'],
      paymentAmount: entry['payment_amount'],
      paymentStatus: entry['payment_status'],
      paymentMethod: entry['payment_method'],
      cardNumber: entry['19.1']
    };

    return entryObject;
  });
  return data;
}

const inividualRegistrations = async (_, __, { dataSources }) => {
  getIndividualRegistrationData(dataSources);
};

const hsCrewRegistrations = async (_, __, { dataSources }) => {
  getCrewRegistrationData(dataSources);
};

const allRegistrations = async (_, __, { dataSources }) => {
  const individualData = await getIndividualRegistrationData(dataSources);
  const hsCrewData = await getCrewRegistrationData(dataSources);
  const combinedData = individualData.concat(hsCrewData);
  return combinedData;
};

module.exports = {
  Query: {
    inividualRegistrations,
    hsCrewRegistrations,
    allRegistrations
  }
};
