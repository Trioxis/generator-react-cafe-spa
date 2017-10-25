'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const Chance = require('chance');
const CafeCMS = require('./cafeCMS');

const chance = new Chance();

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the badass ' + chalk.red('react-cafe-spa') + ' generator!')
    );

    const defaultProjectName = this.destinationPath()
      .split(path.sep)
      .pop();
    console.log(defaultProjectName);

    const prompts = [
      {
        type: 'string',
        name: 'projectName',
        message: 'What is the name of this project?',
        default: defaultProjectName
      },
      {
        type: 'confirm',
        name: 'setupCafeUser',
        message: 'Would you like to setup a new CafeCMS user?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = Object.assign({}, props, {
        cafeWebsiteName: props.projectName,
        cafeUserName: props.projectName,
        cafeSecret:
          chance.word({ length: 4 }) +
          '-' +
          chance.word({ length: 4 }) +
          '-' +
          chance.word({ length: 4 })
      });
    });
  }

  setupCafe() {
    if (!this.props.setupCafeUser) {
      return;
    }

    const user = {
      key: this.props.cafeUserName,
      secret: this.props.cafeSecret,
      website: this.props.cafeWebsiteName
    };

    return CafeCMS.createUser(user)
      .then(() =>
        CafeCMS.authenticate({
          key: this.props.cafeUserName,
          secret: this.props.cafeSecret
        })
      )
      .then(res => {
        const authKey = res.data.generateUserSession;

        return CafeCMS.createContent(
          {
            siteName: this.props.cafeWebsiteName
          },
          authKey
        );
      });
  }

  writing() {
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), this.props);
  }

  install() {
    this.installDependencies({
      yarn: true,
      npm: false,
      bower: false
    });
  }

  end() {
    this.log('\n\n');
    this.log('Run ' + chalk.bold('yarn start') + ' to start local dev');
    this.log('\n');
    this.log('Go to ' + chalk.bold('http://edit.cms.cafe') + ' to edit content');
    this.log('Username: ' + chalk.bold(this.props.cafeUserName));
    this.log('Password: ' + chalk.bold(this.props.cafeSecret));
    this.log('Write those down somewhere!');
    this.log('\n');
    this.log('Happy coding!');
  }
};
