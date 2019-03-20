const allInividualRegistrations = async (_, __, { dataSources }) => {
  const registrations = await dataSources.singleRegistrationAPI.getRegistrations();

  const data = registrations.entries.map(entry => {
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
      transactionId: entry['transaction_id'],
      paymentAmount: entry['payment_amount'],
      paymentStatus: entry['payment_status'],
      paymentMethod: entry['payment_method'],
      cardNumber: entry['14.1']
    };
    return entryObject;
  });

  return data;

  // const camper = {
  //   date: data['26'],
  //   entryId: data['id'],
  //   firstName: data['4.3'],
  //   lastName: data['4.6'],
  //   streetAddress: data['7.1'],
  //   streetAddress2: data['7.2'],
  //   city: data['7.3'],
  //   state: data['7.4'],
  //   zipcode: data['7.5'],
  //   phone: data['6'],
  //   email: data['5'],
  //   wiaaNumber: data['8'],
  //   wiaaClass: data['54'],
  //   officialsAssociation: data['42'],
  //   foodAllergies: data['34'],
  //   emergencyName: data['56'],
  //   emergencyNumber: data['22'],
  //   transactionId: data['transaction_id'],
  //   paymentAmount: data['payment_amount'],
  //   paymentStatus: data['payment_status'],
  //   paymentMethod: data['payment_method'],
  //   cardNumber: data['14.1']
  // };
  // return camper;
};

module.exports = {
  Query: {
    allInividualRegistrations
  }
};
