import { program as program } from 'commander';

program.option('-h', '--help', 'Help Guide').action(() => {
  console.log('Hello help.');
});

program.parse(process.argv);
