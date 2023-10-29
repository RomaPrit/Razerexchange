export class CryptoCurrency {
  id: string;
  name: string;
  priceUsd: number;
  wallet: string;
  symbol:string;
  image:string;
  

  constructor(id: string, name: string, priceUsd: number, symbol:string) {
    this.id = id;
    this.name = name;
    this.priceUsd = priceUsd;
    this.wallet = ''; 
    this.image= '';
    this.symbol=symbol
  }
}