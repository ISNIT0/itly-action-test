/* eslint-disable */
import itly from '@itly/sdk';
import SchemaValidatorPlugin from '@itly/plugin-schema-validator';
import IterativelyPlugin from '@itly/plugin-iteratively';

class UserLoadsApp {
  constructor(properties) {
    this.name = 'User Loads App';
    this.id = '0f51dfcd-203e-4125-8f33-592ee3741f95';
    this.version = '2.0.0';
    this.properties = properties;
  }
}

class SumError {
  constructor(properties) {
    this.name = 'Sum Error';
    this.id = '21931c61-a44e-4772-b00d-fbb296608601';
    this.version = '2.0.0';
    this.properties = properties;
  }
}

class TypeCharacter {
  constructor(properties) {
    this.name = 'Type Character';
    this.id = 'f4287b42-dac7-475f-868c-b1285812b57d';
    this.version = '2.0.0';
    this.properties = properties;
  }
}

class DoSum {
  constructor(properties) {
    this.name = 'Do Sum';
    this.id = 'f659a84b-425a-4502-b50b-c145c0b3c5e3';
    this.version = '2.0.0';
    this.properties = properties;
  }
}

// prettier-ignore
class Itly {
  /*
   * Initialize the Itly SDK. Call once when your application starts.
   * @param {Object} options Configuration options to initialize the Itly SDK with.
   * @param {boolean} [options.disabled=false] Flag to completely disable the Itly SDK.
   * @param {string} [options.environment=development] The environment the Itly SDK is running in (development or production).
   * @param {Object} [options.plugins] Collection of Plugin's.
   * @param {Object} [options.destinations] Analytics provider-specific configuration.
   */
  load(options) {
    if (options.context) {
      throw new Error('Your tracking plan contains no context properties but a `context` object was provided on `options`.');
    }

    const {
      destinations = {},
      plugins = [],
      ...baseOptions
    } = options;


    const destinationPlugins = destinations.all && destinations.all.disabled
      ? []
      : [
        new IterativelyPlugin(options.environment === 'production'
          ? 'F8c9XOEai0Se8PJEzyt0G3QXYjYpqsny'
          : 'a6DtyPa7Hs3vcaOaaIi5aM-mw09bwdyI',
          {
            url: 'https://api.iterative.ly/t/version/6995aea3-a1f3-49b4-b761-33098c026589',
            environment: options.environment || 'development',
            ...destinations.iteratively,
          },
        ),
      ];

    itly.load({
      ...baseOptions,
      plugins: [
        new SchemaValidatorPlugin({
          'group': {"$id":"https://iterative.ly/company/eb140e69-0481-4d20-9494-ef2a8d463595/group","$schema":"http://json-schema.org/draft-07/schema#","title":"Group","description":"","type":"object","properties":{"tier":{"description":"The current plan of the account.","enum":["free","trial","premium"]},"createdAt":{"description":"The user's creation date (ISO-8601 date string).","type":"string"},"plan":{"description":"The payment terms of the account.","enum":["monthly","annual"]},"name":{"description":"The name of the account.","type":"string"}},"additionalProperties":false,"required":["tier","createdAt","plan","name"]},
          'identify': {"$id":"https://iterative.ly/company/eb140e69-0481-4d20-9494-ef2a8d463595/identify","$schema":"http://json-schema.org/draft-07/schema#","title":"Identify","description":"","type":"object","properties":{"createdAt":{"description":"The user's creation date (ISO-8601 date string).","type":"string"}},"additionalProperties":false,"required":["createdAt"]},
          'Do Sum': {"$id":"https://iterative.ly/company/eb140e69-0481-4d20-9494-ef2a8d463595/event/Do%20Sum/version/2.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Do Sum","description":"","type":"object","properties":{"sum":{"description":"","type":"string"}},"additionalProperties":false,"required":["sum"]},
          'Sum Error': {"$id":"https://iterative.ly/company/eb140e69-0481-4d20-9494-ef2a8d463595/event/Sum%20Error/version/2.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Sum Error","description":"","type":"object","properties":{"message":{"description":"","type":"string"}},"additionalProperties":false,"required":["message"]},
          'Type Character': {"$id":"https://iterative.ly/company/eb140e69-0481-4d20-9494-ef2a8d463595/event/Type%20Character/version/2.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Type Character","description":"","type":"object","properties":{"character":{"description":"","type":"string"}},"additionalProperties":false,"required":["character"]},
          'User Loads App': {"$id":"https://iterative.ly/company/eb140e69-0481-4d20-9494-ef2a8d463595/event/User%20Loads%20App/version/2.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"User Loads App","description":"","type":"object","properties":{"numLoads":{"description":"","type":"number"}},"additionalProperties":false,"required":["numLoads"]},
        }),
        ...destinationPlugins,
        ...plugins,
      ]
    });
  }

  /**
   * Alias a user ID to another user ID.
   * @param {string} userId The user's new ID.
   * @param {string} previousId The user's previous ID.
   */
  alias(userId, previousId) {
    itly.alias(userId, previousId);
  }

  /**
   * Identify a user and set or update that user's properties.
   * @param {string} [userId] The user's ID.
   * @param {Object} properties The user's properties.
   * @param {string} properties.createdAt The user's creation date (ISO-8601 date string).
   */
  identify(userId, properties) {
    if (Object.prototype.toString.call(userId) === '[object Object]') {
      properties = userId;
      userId = undefined;
    }

    if (!properties) {
      throw new Error('Your tracking plan contains at least one user property but `properties` were not passed as an argument.');
    }
    itly.identify(userId, properties);
  }

  /**
   * Associate the current user with a group and set or update that group's properties.
   * @param {string} groupId The group's ID.
   * @param {Object} properties The group's properties.
   * @param {string} properties.tier The current plan of the account.
   * @param {string} properties.createdAt The user's creation date (ISO-8601 date string).
   * @param {string} properties.plan The payment terms of the account.
   * @param {string} properties.name The name of the account.
   */
  group(groupId, properties) {
    if (!properties) {
      throw new Error('Your tracking plan contains at least one group property but `properties` were not passed as an argument.');
    }
    itly.group(groupId, properties);
  }

  /**
   * Track a page view.
   * @param {string} category The page's category.
   * @param {string} name The page's name.
   */
  page(category, name) {
    itly.page(category, name);
  }

  /**
   * Owner:  
   * @param {Object} properties The event's properties.
   * @param {number} properties.numLoads Property has no description in tracking plan.
   */
  userLoadsApp(properties) {
    if (!properties) {
      throw new Error('There is at least one property defined on this event in your tracking plan but `properties` were not passed as an argument.');
    }

    itly.track(new UserLoadsApp(properties));
  }

  /**
   * Owner:  
   * @param {Object} properties The event's properties.
   * @param {string} properties.message Property has no description in tracking plan.
   */
  sumError(properties) {
    if (!properties) {
      throw new Error('There is at least one property defined on this event in your tracking plan but `properties` were not passed as an argument.');
    }

    itly.track(new SumError(properties));
  }

  /**
   * Owner:  
   * @param {Object} properties The event's properties.
   * @param {string} properties.character Property has no description in tracking plan.
   */
  typeCharacter(properties) {
    if (!properties) {
      throw new Error('There is at least one property defined on this event in your tracking plan but `properties` were not passed as an argument.');
    }

    itly.track(new TypeCharacter(properties));
  }

  /**
   * Owner:  
   * @param {Object} properties The event's properties.
   * @param {string} properties.sum Property has no description in tracking plan.
   */
  doSum(properties) {
    if (!properties) {
      throw new Error('There is at least one property defined on this event in your tracking plan but `properties` were not passed as an argument.');
    }

    itly.track(new DoSum(properties));
  }

  track(event) {
    itly.track(event);
  }

  reset() {
    itly.reset();
  }
}

const itlySdk = new Itly();

export default itlySdk;
export { DoSum, SumError, TypeCharacter, UserLoadsApp };
