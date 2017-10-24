'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the badass ' + chalk.red('react-cafe-spa') + ' generator!'
    ));

    const defaultProjectName = this.destinationPath().split(path.sep).pop();
    console.log(defaultProjectName)

    const prompts = [{
      type:'string',
      name:'projectName',
      message:'What is the name of this project?',
      default:defaultProjectName
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath(),
      this.destinationPath()
    );
  }

  install() {
    this.installDependencies({
      yarn:true,
      npm:false,
      bower:false
    });
  }

  end(){
    this.log('Run ' + chalk.bold('yarn start') + ' to get going!');
    this.log('Happy coding!');
  }
};
