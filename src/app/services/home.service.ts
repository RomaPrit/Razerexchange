import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map,BehaviorSubject} from 'rxjs';
import { CryptoCurrency } from 'src/app/models/crypto.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiUrl = 'https://api.coincap.io/v2';
  private storageKey = 'cryptoWallets';


 
  private selectedCryptoNameSource = new BehaviorSubject<string>('');
  selectedCryptoName$ = this.selectedCryptoNameSource.asObservable();
  
  private selectedCryptoName2Source = new BehaviorSubject<string>('');
  selectedCryptoName2$ = this.selectedCryptoName2Source.asObservable();


  private selectedCryptoWalletSource = new BehaviorSubject<string>('');
  selectedCryptoWallet$ = this.selectedCryptoWalletSource.asObservable();


  private selectedCryptoSymbolSource = new BehaviorSubject<string>('');
  selectedCryptoSymbol$ = this.selectedCryptoSymbolSource.asObservable();

  private selectedCryptoSymbol2Source = new BehaviorSubject<string>('');
  selectedCryptoSymbol2$ = this.selectedCryptoSymbol2Source.asObservable();


  private selectedCryptoQuanitySource = new BehaviorSubject<string>('');
  selectedCryptoQuanity$ = this.selectedCryptoQuanitySource.asObservable();

  private selectedCryptoQuanity2Source = new BehaviorSubject<string>('');
  selectedCryptoQuanity2$ = this.selectedCryptoQuanity2Source.asObservable();

  setSelectedCryptoName(cryptoWallet: string) {
    this.selectedCryptoNameSource.next(cryptoWallet);
  }
  setSelectedCryptoName2(cryptoName2: string) {
    this.selectedCryptoName2Source.next(cryptoName2);
  }
  setSelectedCryptoWallet(cryptoName: string) {
    this.selectedCryptoWalletSource.next(cryptoName);
  }
  setSelectedCryptoSymbol(cryptoSymbol: string) {
    this.selectedCryptoSymbolSource.next(cryptoSymbol);
  }
  setSelectedCryptoSymbol2(cryptoSymbol2: string) {
    this.selectedCryptoSymbol2Source.next(cryptoSymbol2);
  }
  setSelectedCryptoQuanity(cryptoQuanity: string) {
    this.selectedCryptoQuanitySource.next(cryptoQuanity);
  }
  setSelectedCryptoQuanity2(cryptoQuanity2: string) {
    this.selectedCryptoQuanity2Source.next(cryptoQuanity2);
  }
  
  constructor(private http: HttpClient) {}

  getCoinPrices(): Observable<any> {
    const endpoint = '/assets';

    return this.http.get(`${this.apiUrl}${endpoint}`);
  }
 

  getCryptoList(): Observable<CryptoCurrency[]> {
    return this.getCoinPrices().pipe(
      map((data: any) => {
        return data.data.map((crypto: any) => new CryptoCurrency(crypto.id, crypto.name, crypto.priceUsd, crypto.symbol));
      })
    );
  }
 
  getCryptoWallet(name: string): Observable<string | null> {
    // Ваша логіка для отримання гаманця за ім'ям криптовалюти
    // Наприклад, можна використовувати серверний запит або зберігати локально
    // У цьому прикладі повертаємо гаманець як рядок або null, якщо не знайдено
    return new Observable((observer) => {
      // Можна додати власний код для отримання гаманця за ім'ям
      // У цьому прикладі просто повертаємо рядок 'Wallet for {name}'
      observer.next(`Wallet for ${name}`);
      observer.complete();
    });
  }
  getAllCryptoWallets(): Observable<{ [cryptoName: string]: string }> {
    return this.getCryptoList().pipe(
      map((cryptoList) => {
        const storedWallets = this.getStoredWallets();
        const wallets: { [cryptoName: string]: string } = {};
        cryptoList.forEach((crypto) => {
          wallets[crypto.name] = storedWallets[crypto.name] || '';
        });
        return wallets;
      })
    );
  }

  saveWallet(crypto: CryptoCurrency): void {
    const storedWallets = this.getStoredWallets();
    storedWallets[crypto.name] = crypto.wallet;
    localStorage.setItem(this.storageKey, JSON.stringify(storedWallets));
  }

  private getStoredWallets(): { [cryptoName: string]: string } {
    const storedWalletsJson = localStorage.getItem(this.storageKey) || '{}';
    return JSON.parse(storedWalletsJson);
  }
}