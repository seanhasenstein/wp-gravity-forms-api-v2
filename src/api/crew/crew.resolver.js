const { getCrewRegistrationData } = require('../data/registration.utils');

const allCrews = async (_, __, { dataSources }) => {
  // Get all high school crew registrations
  const hsCrewRegistrations = await getCrewRegistrationData(dataSources);

  // map over each registration and put them all into an array
  const registrations = hsCrewRegistrations.map(registration => {
    // combine the official registering's first and last name
    const name = `${registration.firstName} ${registration.lastName}`;
    // create an array of the officials crew members
    const officials = [...registration.crewMembers];
    // add the official registering to the crew members array and sort
    officials.push(name);
    officials.sort();

    return {
      name,
      crewSize: registration.crewSize,
      crewMembers: officials,
      transactionId: registration.transactionId,
      isRegistered: true,
      sessions: registration.sessions
    };
  });

  const crewBreakdown = registrations.map(crew => {
    const result = crew.crewMembers.map(official => {
      const registeredOfficial = registrations.find(
        crewMember => crewMember.name === official
      );
      if (registeredOfficial) return registeredOfficial;
      if (!registeredOfficial) {
        return {
          name: official,
          isRegistered: false
        };
      }
    });

    return {
      crewMembers: result
    };
  });

  const crewReducer = crewBreakdown.reduce((crewAccumulator, currentCrew) => {
    let isCrewUnique = true;
    // Put the currentCrew names into an array
    const currentCrewArray = currentCrew.crewMembers.map(
      official => official.name
    );

    for (let i = 0; i < crewAccumulator.length; i++) {
      // Put the currentAccumulatorCrew names into an array
      const currentAccumulatorCrew = crewAccumulator[i].crewMembers.map(
        official => official.name
      );

      // Compare the currentCrewArray names with the currentAccumulatorCrew names
      // If the names are the same then the crew is a duplicate and break out of the loop
      if (
        currentCrewArray.every(name => currentAccumulatorCrew.includes(name))
      ) {
        isCrewUnique = false;
        break;
      }
    }
    if (isCrewUnique) {
      // filter out crew sizes from each crew member and
      // add to the currentCrew object. If crew members entered
      // different values, send that message for the admin to follow-up with
      const crewSizeArray = currentCrew.crewMembers
        .map(member => member.crewSize)
        .filter(val => val !== undefined)
        .filter((el, i, arr) => {
          return i === arr.indexOf(el);
        });
      if (crewSizeArray.length === 1) {
        currentCrew.crewSize = crewSizeArray[0];
      }
      if (crewSizeArray.length > 1) {
        currentCrew.crewSize = 'Crew members entered both 2 and 3 person.';
      }

      // Filter out duplicate sessions from all of the crew members sessions
      // and add the result to the currentCrew object
      const sessionsArray = currentCrew.crewMembers
        .map(member => member.sessions)
        .filter(val => val !== undefined)
        .flat()
        .filter((el, i, arr) => {
          return i === arr.indexOf(el);
        });
      //
      currentCrew.sessions = sessionsArray;

      // push the modified currentCrew object on the crewAccumulator
      crewAccumulator.push(currentCrew);
      return crewAccumulator;
    }

    return crewAccumulator;
  }, []);

  return crewReducer;
};

const sessionCrews = async (_, args, { dataSources }) => {
  const session = args.id;
  // Get all high school crew registrations
  const hsCrewRegistrations = await getCrewRegistrationData(dataSources);

  // map over each registration and put them all into an array
  const registrations = hsCrewRegistrations.map(registration => {
    // combine the official registering's first and last name
    const name = `${registration.firstName} ${registration.lastName}`;
    // create an array of the officials crew members
    const officials = [...registration.crewMembers];
    // add the official registering to the crew members array and sort
    officials.push(name);
    officials.sort();

    return {
      name,
      crewSize: registration.crewSize,
      crewMembers: officials,
      transactionId: registration.transactionId,
      isRegistered: true,
      sessions: registration.sessions
    };
  });

  const crewBreakdown = registrations.map(crew => {
    const result = crew.crewMembers.map(official => {
      const registeredOfficial = registrations.find(
        crewMember => crewMember.name === official
      );
      if (registeredOfficial) return registeredOfficial;
      if (!registeredOfficial) {
        return {
          name: official,
          isRegistered: false
        };
      }
    });

    return {
      crewMembers: result
    };
  });

  const crewReducer = crewBreakdown.reduce((crewAccumulator, currentCrew) => {
    let isCrewUnique = true;
    // Put the currentCrew names into an array
    const currentCrewArray = currentCrew.crewMembers.map(
      official => official.name
    );

    for (let i = 0; i < crewAccumulator.length; i++) {
      // Put the currentAccumulatorCrew names into an array
      const currentAccumulatorCrew = crewAccumulator[i].crewMembers.map(
        official => official.name
      );

      // Compare the currentCrewArray names with the currentAccumulatorCrew names
      // If the names are the same then the crew is a duplicate and break out of the loop
      if (
        currentCrewArray.every(name => currentAccumulatorCrew.includes(name))
      ) {
        isCrewUnique = false;
        break;
      }
    }
    if (isCrewUnique) {
      // filter out crew sizes from each crew member and
      // add to the currentCrew object. If crew members entered
      // different values, send that message for the admin to follow-up with
      const crewSizeArray = currentCrew.crewMembers
        .map(member => member.crewSize)
        .filter(val => val !== undefined)
        .filter((el, i, arr) => {
          return i === arr.indexOf(el);
        });
      if (crewSizeArray.length === 1) {
        currentCrew.crewSize = crewSizeArray[0];
      }
      if (crewSizeArray.length > 1) {
        currentCrew.crewSize = 'Crew members entered both 2 and 3 person.';
      }

      // Filter out duplicate sessions from all of the crew members sessions
      // and add the result to the currentCrew object
      const sessionsArray = currentCrew.crewMembers
        .map(member => member.sessions)
        .filter(val => val !== undefined)
        .flat()
        .filter((el, i, arr) => {
          return i === arr.indexOf(el);
        });
      //
      currentCrew.sessions = sessionsArray;

      // push the modified currentCrew object on the crewAccumulator
      crewAccumulator.push(currentCrew);
      return crewAccumulator;
    }

    return crewAccumulator;
  }, []);

  // map thru the crewReducer array
  const result = crewReducer
    .map(crew => {
      // if (session !== crew.sessions[0].id) return;
      if (session === crew.sessions[0].id) {
        return crew;
      }
    })
    .filter(val => val !== undefined);

  return result;
};

module.exports = {
  Query: {
    allCrews,
    sessionCrews
  }
};
