import { Component} from '@angular/core';
import { CryptoCurrency } from 'src/app/models/crypto.model';
import { CryptoService } from 'src/app/services/home.service';
import { Observable, timer } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  cryptoList: CryptoCurrency[] = [];
  currentDate: Date;
  selectedCryptoName: string = '';
  selectedCryptoName2: string = '';
  selectedCryptoWallet: string = '';
  selectedCryptoSymbol: string = '';
  selectedCryptoSymbol2: string = '';
  selectedCryptoQuanity: string = '';
  selectedCryptoQuanity2: string = '';
  randomValue: number=0;
  isHovered=''
  isHidden:boolean=false
  countdown: Observable<number> = timer(0, 1000); // Observable that ticks every second
  remainingTime: number = 900; // Initial countdown time in seconds (15 minutes)
  id:number=0;
  randomNumber: number=0;


  constructor(private cryptoService: CryptoService,
    private clipboard: Clipboard) {
      this.currentDate = new Date();
    }

  ngOnInit() {
    // this.cryptoService.selectedCryptoName$.subscribe((cryptoName) => {
    //   this.selectedCryptoName = cryptoName;
    //   console.log('Selected Crypto in Payment:', this.selectedCryptoName);
    // });
    // const currentCurrency = this.selectedCryptoName.toLowerCase();
    // const selectedCrypto = this.cryptoList.find(crypto => crypto.id === currentCurrency);
    // console.log(selectedCrypto);
    this.getCryptoWallet()
    this.getCryptoName()
    this.getCryptoName2()
    this.getCryptoSymbol()
    this.getCryptoSymbol2()
    this.getCryptoQuanity()
    this.getCryptoQuanity2()
    this.id= Math.floor(10000 + Math.random() * 90000)
    this.getCryptoList()
    this.startCountdown();
    const storedNumber = localStorage.getItem('randomNumber');

    if (storedNumber) {
      this.randomNumber = +storedNumber;
    } else {
      this.randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      localStorage.setItem('randomNumber', this.randomNumber.toString());
    }
  }
  ngOnDestroy() {
    // Очищення числа при виході з компоненти (наприклад, при переході на іншу сторінку)
    localStorage.removeItem('randomNumber');
  }
 
  getCryptoWallet():void{
    this.cryptoService.selectedCryptoName$.subscribe((cryptoWallet) => {
      this.selectedCryptoName = cryptoWallet;
      console.log('Selected Wallet Crypto in Payment:', this.selectedCryptoName);
    });
  }
  paymentCompleted():void{
    this.isHidden=true
  }
  getCryptoName():void{
    this.cryptoService.selectedCryptoWallet$.subscribe((cryptoName) => {
      this.selectedCryptoWallet = cryptoName;
  
      console.log('Selected Crypto in Payment:', this.selectedCryptoWallet);
    });
  }
  getCryptoName2():void{
    this.cryptoService.selectedCryptoName2$.subscribe((cryptoName2) => {
      this.selectedCryptoName2 = cryptoName2;
  
      console.log('Selected Crypto in Payment:', this.selectedCryptoName2);
    });
  }
  getCryptoSymbol():void{
    this.cryptoService.selectedCryptoSymbol$.subscribe((cryptoSymbol) => {
      this.selectedCryptoSymbol =cryptoSymbol;
  
      console.log('Selected Crypto Symbol in Payment:', this.selectedCryptoSymbol);
    });
  }
  getCryptoSymbol2():void{
    this.cryptoService.selectedCryptoSymbol2$.subscribe((cryptoSymbol2) => {
      this.selectedCryptoSymbol2 =cryptoSymbol2;
  
      console.log('Selected Crypto Symbol in Payment:', this.selectedCryptoSymbol2);
    });
  }
  getCryptoQuanity():void{
    this.cryptoService.selectedCryptoQuanity$.subscribe((cryptoQuanity) => {
      this.selectedCryptoQuanity = cryptoQuanity;
  
      console.log('Selected Crypto Quanity in Payment Quanity:', this.selectedCryptoQuanity);
    });
  }
  getCryptoQuanity2():void{
    this.cryptoService.selectedCryptoQuanity2$.subscribe((cryptoQuanity2) => {
      this.selectedCryptoQuanity2 = cryptoQuanity2;
  
      console.log('Selected Crypto Quanity in Payment Quanity:', this.selectedCryptoQuanity2);
    });
  }
  getCryptoList(): void {
    this.cryptoService.getCryptoList().subscribe((cryptoList) => {
      this.cryptoList = cryptoList;
    });
  
    
    }
    getImagePath(cryptoId: string):string {
      return `assets/images/${cryptoId}.png`;
    }
    copyToClipboard() {
      const textToCopy = `${this.selectedCryptoQuanity}.0`;
      this.clipboard.copy(textToCopy);
    }
    copyToClipboard2() {
      const textToCopy = `${this.selectedCryptoName}`;
      this.clipboard.copy(textToCopy);
    }
    startCountdown(): void {
      this.countdown.subscribe(() => {
        this.updateRemainingTime();
      });
    }
  
    updateRemainingTime(): void {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else if(this.remainingTime==0){
        this.isHidden=true
      }
        
    }
  
    formatTime(seconds: number): string {
      const minutes: number = Math.floor(seconds / 60);
      const remainingSeconds: number = seconds % 60;
  
      const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds: string = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  }