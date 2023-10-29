import { Component } from '@angular/core';

import { CryptoCurrency } from 'src/app/models/crypto.model';
import { CryptoService } from 'src/app/services/home.service';

import { trigger, state, style, transition, animate } from '@angular/animations';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('blockAnimation', [
      state('hidden', style({
        transform: 'translateY(100%)'
      })),
      state('visible', style({
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('300ms ease-in-out')),
      transition('visible => hidden', animate('300ms ease-in-out'))
    ])
  ]
})
export class HomeComponent {
  
  cryptoList: CryptoCurrency[] = [];
  quantity: string = '';
  quantity2: string = '';
  quantity3: string = '';
  // quantity3: string = '';
  selectedCryptoName: any = '';
  selectedCryptoSymbol:string='';
  selectedCryptoSymbol2:string='';
  selectedCryptoName2: any = '';
  selectedCryptoWallet: string | null = null;
  isHovered: string | null = null;
  isHovered2: string | null = null;
  isClicked: boolean = false;
  exchangeImages: any;
  calculated: boolean = false;
  exchange:boolean=false;
  selectedCrypto: CryptoCurrency | null = null;
  rates: number = 0;
  walletAddress: string = '';
  placeholderText: string = "address";
  isTrue:boolean=true
  quantity4: string='';
  userEmail: string='';
  agreedToRules: boolean=false;
  agreedToPolicy: boolean=false;
  blockState: string = 'hidden';
  isListOpen = false; // Додайте цю змінну

  constructor(private cryptoService: CryptoService) {}

    ngOnInit() {
    this.getCryptoList();
    this.loadWallets(); 
   
    
    }
    toggleDisabled(): void {
      this.isTrue = !this.isTrue;
    }
    getCryptoList(): void {
    this.cryptoService.getCryptoList().subscribe((cryptoList) => {
      this.cryptoList = cryptoList;
      console.log(cryptoList);
      
    });
    }

  saveWallet(crypto: CryptoCurrency): void {
    console.log(`Wallet address for ${crypto.name}: ${crypto.wallet}`);
    this.cryptoService.saveWallet(crypto);
    console.log(crypto.wallet);

  }

  private loadWallets(): void {
    this.cryptoService.getAllCryptoWallets().subscribe((wallets) => {
      this.cryptoList.forEach((crypto) => {
        crypto.wallet = wallets[crypto.name] || '';
      });
    });


  }
  toggleBlock() {
    this.blockState = this.blockState === 'hidden' ? 'visible' : 'hidden';
  }
  setQuantity(cryptoName: string): void {
    // Встановлюємо значення змінної quantity рівним назві криптовалюти
    this.quantity = cryptoName;
    // Встановлюємо ідентифікатор вибраної криптовалюти
    this.selectedCryptoName = cryptoName;
    this.placeholderText="Enter your"+this.selectedCryptoName+"adress"
    console.log(this.placeholderText);
    
  }
  setQuantity3(cryptoName: string): void {
    // Встановлюємо значення змінної quantity рівним назві криптовалюти
    this.quantity3 =this.selectedCryptoName.toString()+this.placeholderText;
    // Встановлюємо ідентифікатор вибраної криптовалюти
    this.selectedCryptoName = cryptoName;
   
    console.log(this.placeholderText);
    
  }
  setQuantity2(cryptoName2: string): void {
    // Встановлюємо значення змінної quantity рівним назві криптовалюти
    this.quantity2 = cryptoName2;
    this.selectedCryptoName2 = cryptoName2;
  }

  getImagePath(cryptoId: string): string {
    return `assets/images/${cryptoId}.png`;
  }


  selectCrypto(crypto: CryptoCurrency): void {
    console.log('Selecting Crypto 1:', crypto);
    this.selectedCryptoName = crypto.id;
   
    this.selectedCryptoSymbol=crypto.symbol
    this.isHovered = crypto.id; // Додайте цей рядок
   
    this.cryptoService.setSelectedCryptoSymbol(this.selectedCryptoSymbol);
    this.cryptoService.setSelectedCryptoWallet(this.selectedCryptoName);
    this.cryptoService.setSelectedCryptoQuanity(this.quantity);
  this.isListOpen = false;
  }
  
  getPlaceholder():string{
    return `${this.selectedCryptoName} ${this.placeholderText}`;
  }
  selectCrypto2(crypto: CryptoCurrency): void {
    console.log('Selecting Crypto 2:', crypto);
    this.selectedCryptoName2 = crypto.id;
    this.selectedCryptoSymbol2 = crypto.symbol;
    this.selectedCryptoWallet = crypto.wallet;
    this.isHovered2 = crypto.id; // Додайте цей рядок
    this.cryptoService.setSelectedCryptoName2(this.selectedCryptoName2);
    this.cryptoService.setSelectedCryptoName(this.selectedCryptoWallet);
    this.cryptoService.setSelectedCryptoSymbol2(this.selectedCryptoSymbol2);
   
  }

  clearSelectedCrypto(): void {
    this.quantity = '';
  }
  clearSelectedCrypto2(): void {
    this.quantity2 = '';
  }
  toggleList(event: MouseEvent) {
    event.preventDefault(); // Заборонити подальший обробник подій click
    this.isListOpen = !this.isListOpen;
  }
  calculateTotal(): void {
    console.log('Selected Crypto ID:', this.selectedCryptoName);
    console.log('Quantity:', this.quantity);

    // Перевірка, чи вибрана криптовалюта
    if (!this.selectedCryptoName) {
      console.error('Invalid selection');
      return;
    }


    if (isNaN(Number(this.quantity))) {
      console.error('Invalid quantity');
      return;
    }


    console.log('Crypto List:', this.cryptoList);

    const currentCurrency = this.selectedCryptoName.toLowerCase();
    const currentCurrency2 = this.selectedCryptoName2.toLowerCase()

    const selectedCrypto = this.cryptoList.find(crypto => crypto.id === currentCurrency);


    console.log('Selected Crypto:', selectedCrypto?.wallet);


    if (!selectedCrypto) {
      console.error('Selected crypto not found:', this.selectedCryptoName);
      return;
    }


    const total = selectedCrypto.priceUsd * Number(this.quantity);


    console.log('Total:', total);


    console.log('Selected Crypto ID (Column Take):', currentCurrency2);


    const selectedCrypto2 = this.cryptoList.find(crypto => crypto.id === currentCurrency2);


    console.log('Selected Crypto (Column Take):', selectedCrypto2);


    if (!selectedCrypto2) {
      console.error('Selected crypto not found (Column Take):', currentCurrency2);
      return;
    }


    let total2 = total / selectedCrypto2.priceUsd;


    console.log('Total (Column Take):', parseFloat(total2.toFixed(5)));
    this.quantity2 = parseFloat(total2.toFixed(5)).toString();
    this.cryptoService.setSelectedCryptoQuanity2(this.quantity2);
    let number: number = parseFloat(Number(this.quantity2).toFixed(5))
    this.rates= parseFloat(Number(selectedCrypto?.priceUsd / selectedCrypto2?.priceUsd).toFixed(5));
    let rate = parseFloat(Number(selectedCrypto?.priceUsd / selectedCrypto2?.priceUsd).toFixed(5))
    const selectedCrypto3 = this.cryptoList.find(crypto => crypto.id === this.selectedCryptoName2.toLowerCase());


    if (!selectedCrypto3) {
      console.error('Selected crypto not found (Column Take):', this.selectedCryptoName2);
      return;
    }
    this.toggleDisabled()

    this.selectedCryptoName = this.selectedCryptoName.charAt(0).toUpperCase() + this.selectedCryptoName.substr(1)
    this.exchangeInfo = {
      currency: selectedCrypto2.name,
      amount: number,
      rate: rate
    };

    this.calculated = true
    this.exchange=true
    console.log(this.calculated);
    

  }

  resetCalculation(): void {
    this.quantity = '';
    this.quantity2 = '';
    this.selectedCryptoName = '';
    this.selectedCryptoName2 = '';
    this.exchangeInfo = {
      currency: '',
      amount: '',
      rate: ''
    };
    this.isHovered = ''
    this.isHovered2 = ''
    this.quantity = '';
    this.quantity2 = '';
    this.selectedCryptoName = '';
    this.selectedCryptoName2 = '';

    this.calculated = false;
    this.exchange=false;
    this.isTrue=true;
  }


  exchangeInfo: { currency: string, amount: any, rate: any } | null = null ;
}


