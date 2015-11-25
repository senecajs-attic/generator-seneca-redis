'use strict'

var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var path = require('path')

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('Seneca Redis Queue Transport') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What would you like to name your project?',
      default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
      this.projectName = this._.camelize(this._.slugify(this._.humanize(props.projectName)));

      done();
    }.bind(this));
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
});