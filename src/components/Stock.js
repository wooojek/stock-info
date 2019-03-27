import React from 'react';

const { ALPHAVANTAGE_API_KEY } = process.env;

export class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      symbol: props.symbol,
      market: props.market,
      domain: props.domain || '',
      logo: props.logo || 'https://via.placeholder.com/64',
    }
  }

  getImage = async () => {
    return new Promise((resolve) => {
      const query = this.state.name.split(' ')[0];
      fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(([{ domain, logo }]) => {
          resolve({
            domain,
            logo,
          });
        })
        .catch((e) => console.log(e));
    });
  }

  getStockInfo = async () => {
    return new Promise((resolve) => {
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=${ALPHAVANTAGE_API_KEY}`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data['Note']) {
            throw Error(data['Note']);
          }
          const stockData = data['Global Quote'];
          resolve({
            price: stockData['05. price'],
            closed: stockData['07. latest trading day'],
            change: stockData['09. change'],
            changePercent: stockData['10. change percent'],
          });
        })
        .catch((e) => console.log(e));
    });
  }

  async componentDidMount() {
    try {
      const { domain, logo } = await this.getImage();
      const details = await this.getStockInfo();

      this.setState(() => ({
        details,
        domain,
        logo,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const details = this.state.details;
    const market = this.state.market;
    return (
      <div className="list-item">
        <div className="stock-container">
          <div
            className="stock-img"
            style={{ backgroundImage: `url(${this.state.logo})` }}
          >
          </div>
          <div className="stock-info">
            <div className="stock-info__names">
              <span className="bold">{this.state.name}</span>
              <span>{this.state.symbol}</span>
              {this.state.domain ? (<span>{this.state.domain}</span>) : false}
            </div>
            {market ? (
              <div className="stock-info__market">
                <span>{market.region}</span>
                <span>{market.marketOpen} - {market.marketClose}</span>
                <span>{market.timezone}</span>
              </div>
            ) : (<div></div>)}
            {details ? (
              <div className="stock-info__details">
                <span className="bold">{details.price}</span>
                <span>{details.change} ({details.changePercent})</span>
                <span>{details.closed}</span>
              </div>
            ) : (<div></div>)}

          </div>
        </div>
      </div>
    )
  }
}

export default Stock;