'use strict'

var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var path = require('path')
var _ = require('lodash')
var askName = require('inquirer-npm-name')
var extend = require('deep-extend')

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    if (this.options.name) {
      this.projectName = this.options.name
      return
    }
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('Seneca Redis Queue Transport') + ' generator!'
    ));

    askName({
      type: 'input',
      name: 'projectName',
      message: 'What would you like to name your project?',
      default: path.basename(process.cwd()),
      validate: function (str) {
        return str.length > 0;
      }
    }, this, function (name) {
      this.projectName = name;
      done();
    }.bind(this))
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_service.js'),
        this.destinationPath('service.js')
      );
      this.fs.copy(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copy(
        this.templatePath('test/_service.test.js'),
        this.destinationPath('test/service.test.js')
      );
    },

    pkg: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      extend(pkg, {
        name: this.projectName
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_Dockerfile'),
        this.destinationPath('Dockerfile')
      );
      this.fs.copy(
        this.templatePath('_options.json'),
        this.destinationPath('options.json')
      );
      this.fs.copy(
        this.templatePath('_jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('_istanbul.yml'),
        this.destinationPath('.istanbul.yml')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
});
