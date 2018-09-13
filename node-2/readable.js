const {Readable} = require('stream');

class DataProviderStream extends Readable {
  constructor({dataProvider, ...props}) {
    super(props);
    this.dataProvider = dataProvider;
  }

  _read() {
    this.push(this.dataProvider());
  }
}

exports.DataProviderStream = DataProviderStream;