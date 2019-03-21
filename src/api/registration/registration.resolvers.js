const individualSessions = require('../session/session.datasource');

const allInividualRegistrations = async (_, __, { dataSources }) => {
  const registrations = await dataSources.singleRegistrationAPI.getRegistrations();

  const data = registrations.entries.map(entry => {
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
      .filter(value => value != '')
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
            id: 111,
            title: 'THIS ENTRY HAS AN ERROR',
            category: 'ERROR',
            level: 'ERROR',
            date: 'ERROR',
            time: 'ERROR',
            location: 'ERROR',
            year: 'ERROR',
            crewDeal: false,
            price: 111
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
};

module.exports = {
  Query: {
    allInividualRegistrations
  }
};
