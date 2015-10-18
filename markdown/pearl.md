Pearl is an open source project at Involution Studios aimed to bring more personalization and _personification_ to daily health - we want to create a 24/7 health assistant just for you. Pearl can go about this by having various 30-second conversations with you throughout the day - not only on exercise and diet but also medical goals potentially prescribed by your doctor.

During the summer of 2015, Michael Chi and I worked together to build the foundation, API, and frontend for this product. The components of this project include:

- **A hybrid app frontend** - Written with [Ionic](http://ionicframework.com/) and initially designed for iOS, [Pearl Client](https://github.com/openpearl/PearlClient) is an iPhone app that can take in various data sources such as with the iPhone’s Healthkit and have conversations with you through interactive chat bubbles.

- **A Rails API backend** - Pearl’s backend provides extensible and clear-cut endpoints for many different types of clients to interact with it - beyond just an iPhone app. The goal for the future is to implement devices such as Amazon Echo or Fitbit for a more comprehensive health picture. Pearl’s backend is composed of subsystems, such as a ‘brain’ that can maintain a conversation context and times to start conversations.

- **HIPAA compliant Data Source**  - Always with security in mind, we keep all personal health information within [Truevault](https://www.truevault.com/) and never save to unsecure data sources. Our adapters with Truevault make it simple to have real-time, secure conversations.

- **Utilities for building conversation plugins** - Pearl is built open-source to encourage other contributors who can build their own conversation plugins. Using [Pearl Storyboard](https://github.com/openpearl/PearlStoryboard), you can build a static conversation without touching code. For more intelligence, developers can build a Ruby script(s) following our basic framework.

My main contributions were in developing the front-end hybrid app and the conversation -building utilities web app. Mike and I worked in an iterative process with a series of design and code reviews throughout the 10 weeks.

Today, Pearl is a work-in-progress ready to be launched to the Apple App Store. More developers are always welcome! Visit us at [github.com/openpearl](https://www.github.com/openpearl)
