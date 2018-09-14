require('log-timestamp');
const {Readable} = require('stream');

class DataProviderStream extends Readable {
  constructor({dataProvider, ...props}) {
    super(props);
    this.dataProvider = dataProvider;
    this.on('end', () => console.log('Readable. Generation end!'));
  }

  _read() {
    const generatedItem = this.dataProvider();
    this.push(generatedItem);
    console.log(`Readable. Generated - ${generatedItem}`);
  }
}

exports.DataProviderStream = DataProviderStream;