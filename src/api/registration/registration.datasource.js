const { RESTDataSource } = require("apollo-datasource-rest");

class SingleRegistrationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://officialsconnection.org/wp-json/gf/v2/forms/11/entries";
  }

  willSendRequest(request) {
    request.headers.set(
      "Authorization",
      "Basic Y2tfNjI4MDQ0MzEwODEyY2I0ZTU1ZDRjMWI1NzYyYmM4Y2JiNGY3NjEzMDpjc19lZGNjZmNlZjkyYWRhODdjZjQ3ODhkYWQ2N2NmOTVhODc1NzRlNTMx"
    );
  }

  async getRegistrations() {
    const results = await this.get("/");
    return results;
  }
}

module.exports = SingleRegistrationAPI;
