define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AVATAR = 'https://s3.amazonaws.com/uifaces/faces/twitter/sachagreif/128.jpg';
  var NAME = 'John Citizen';
  var HANDLE = '@johncitizen';

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.composedTweet = null;
      this.tweets = [];

      this.tweets = [{
        avatar: 'https://pbs.twimg.com/profile_images/615392662233808896/EtxjSSKk_bigger.jpg',
        name: 'TechCrunch',
        handle: '@TechCrunch',
        text: 'Naval Ravikant on China money into Silicon Valley: This trickle could become a tsunami'
      }, {
        avatar: 'https://pbs.twimg.com/profile_images/1332650890/strayfromthepath_flagtee_artworkslide_bigger.jpg',
        name: 'Stray From The Path',
        handle: '@strayfromdapath',
        text: 'This week has been such shit. The only thing that\'s made me happy is the impending STYG/Expire/KL tour and Shinsuke Nakamura entrance at NXT'
      }, {
        avatar: 'https://pbs.twimg.com/profile_images/668902554957316096/IpjBGyjC_bigger.jpg',
        name: 'Chris Sacca',
        handle: '@sacca',
        text: 'I want a sports channel that is only highlights. 100% plays of the day/week/month. No shows. No narrative. Who\'s with me?'
      }];
    }

    App.prototype.createTweet = function createTweet() {
      this.tweets.unshift({
        avatar: AVATAR,
        name: NAME,
        handle: HANDLE,
        text: this.composedTweet
      });

      this.composedTweet = null;
    };

    App.prototype.handleKeyPress = function handleKeyPress(evt) {
      if (evt.keyCode === 13 && ths.composedTweet) {
        this.createTweet();
        evt.preventDefault();
      } else {
        return true;
      }
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/elements/tweet',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweet = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var Tweet = exports.Tweet = (_class = function Tweet() {
    _classCallCheck(this, Tweet);

    _initDefineProp(this, 'tweet', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'tweet', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./styles.css\"></require>\n\n  <require from=\"./resources/elements/tweet\"></require>\n\n  <h1>Tweeter</h1>\n\n  <div class=\"container\">\n    <div class=\"compose-container\">\n      <textarea placeholder=\"Say something\" value.bind=\"composedTweet\" keypress.delegate=\"handleKeyPress($event)\"></textarea>\n      <button type=\"button\" disabled.bind=\"!composedTweet\" click.delegate=\"createTweet()\">Say it!</button>\n    </div>\n\n    <tweet-feed>\n      <tweet repeat.for=\"tweet of tweets\" tweet.bind=\"tweet\"></tweet>\n    </tweet-feed>\n  </div>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "* {\n  box-sizing: border-box;\n  position: relative;\n}\n\nbody {\n  background-color: #F5F8FA;\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  padding: 0;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n}\n\ntextarea {\n  border: none;\n  display: inline-block;\n  height: 70px;\n  padding: 12px;\n  resize: none;\n  width: 340px;\n}\n\nbutton {\n  background: #DDD;\n  border: none;\n  color: #000;\n  cursor: pointer;\n  display: inline-block;\n  height: 70px;\n  margin-left: 8px;\n  vertical-align: top;\n  width: 120px;\n}\n\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.compose-container {\n  margin-bottom: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  max-width: 620px;\n  width: 100%;\n}\n\ntweet-feed {\n  background: #FFF;\n  border: 1px solid #e1e8ed;\n  display: block;\n}\n\ntweet {\n  border-bottom: 1px solid #e1e8ed;\n  display: flex;\n  flex-direction: row;\n  padding: 20px 10px;\n}\n  tweet:last-child {\n    border-bottom: none;\n  }\n\n.tweet-avatar {\n  flex-basis: 48px;\n  height: 48px;\n  margin-right: 10px;\n}\n\n.tweet-avatar img {\n  border-radius: 5px;\n  display: block;\n}\n\n.tweet-body {\n  flex: 1;\n}\n\n.tweet-meta {\n  color: #DDD;\n  margin-bottom: 5px;\n}\n\n.tweet-meta strong {\n  color: #111;\n}\n\n.tweet-text {\n  font-size: 14px;\n  line-height: 18px;\n}\n"; });
define('text!resources/elements/tweet.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"tweet-avatar\"><img src.bind=\"tweet.avatar\"></div>\n  <div class=\"tweet-body\">\n    <div class=\"tweet-meta\"><strong>${tweet.name}</strong> <span>${tweet.handle}</span></div>\n    <div class=\"tweet-content\">${tweet.text}</div>\n  </div>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map