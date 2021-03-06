module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    type: {
      type: 'list',
      message: 'Do you want to use router?',
      choices:[{
        name: 'With React-Router',
        value: 'multi',
        short: 'Multi(With-Router)'
      },{
        name: 'No React-Router',
        value: 'single',
        short: 'Single(No-Router)'
      }]
    },
    stateContainer:{
      when: function(answers){
        return answers.type === 'single'
      },
      type: 'confirm',
      message: 'Do you want to use redux?',
      default: false
    },
    eslint: {
      type: 'confirm',
      require: true,
      message: 'lint JS with ESLint?',
      default: true
    },
    eslintConfig: {
      when: 'eslint',
      type: 'list',
      message: 'Which eslint config would you like to use?',
      choices: [{
        name: 'Standard (https://github.com/feross/standard)',
        value: 'standard',
        short: 'Standard'
      }, {
        name: 'none (configure it yourself)',
        value: 'none',
        short: 'None'
      }]
    },
    unit: {
      type: 'confirm',
      require: true,
      message: 'Setup unit tests with Karma + Mocha?',
      default: true
    }
  },
  filters: {
    '.eslintignore': 'eslint',
    '.eslintrc.js': 'eslint',
    'test/**/*': 'unit'
  },
  completeMessage: 'To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev'
}