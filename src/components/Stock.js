import React from 'react';
import numeral from 'numeral';

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

  getImage = () => {
    const query = this.state.name.split(' ')[0];
    return fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(([{ domain, logo }]) => {
        return {
          domain,
          logo,
        };
      })
      .catch((e) => console.log(e));
  }

  getStockInfo = () => {
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=${ALPHAVANTAGE_API_KEY}`)
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
          return {
            price: stockData['05. price'],
            closed: stockData['07. latest trading day'],
            change: stockData['09. change'],
            changePercent: stockData['10. change percent'],
          };
        })
        .catch((e) => console.log(e));
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
                <span className="bold">{numeral(details.price).format('$0,0.00')}</span>
                <span className={details.change >= 0 ? 'stock--up' : 'stock--down'}>
                  {numeral(details.change).format('0.00')} ({numeral(details.changePercent.slice(0, -2)).format('0.00')}%)
                </span>
                <span>Closed: {details.closed}</span>
              </div>
            ) : (<div></div>)}

          </div>
        </div>
      </div>
    )
  }
}

export default Stock;