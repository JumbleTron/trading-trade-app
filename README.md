# TradeTraining 📈

TradeTraining to platforma open-source zbudowana w **Next.js (App Router)** oraz **MySQL** (za pomocą **Drizzle ORM**), przeznaczona do interaktywnej nauki czytania wykresów i analizy technicznej rynków finansowych.

Aplikacja pozwala na naukę rozpoznawania sygnałów kupna (**BUY**) oraz sprzedaży (**SELL**) ze szczególnym uwzględnieniem rynków surowcowych (**złoto, ropa**), par walutowych (**USD/EUR, PLN/EUR**) oraz indeksu **US500** (S&P 500).

## 🚀 Technologie
* **Next.js 14+ (App Router)** & TypeScript
* **MySQL 8.x** + **Drizzle ORM**
* **Auth.js** (NextAuth v5) do uwierzytelniania użytkowników
* **Lightweight Charts (TradingView)** dla wykresów giełdowych
* CSS Variables dla motywu jasnego/ciemnego (Premium Dark/Light Glassmorphism)

## 📂 Struktura Bazy Danych
Zaimplementowany schemat Drizzle ORM obsługuje:
* Użytkowników i sesje logowania
* Strukturę kursu (Rozdziały i Lekcje)
* Interaktywne zadania typu **Predict & Reveal** oraz **Quiz**
* Zapisywanie postępów użytkownika (ukończone lekcje) i historię prób ćwiczeń

## 🛠️ Instalacja i Uruchomienie

1. Sklonuj repozytorium:
   ```bash
   git clone git@github.com:JumbleTron/trading-trade-app.git
   cd trading-trade-app
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

3. Skonfiguruj plik `.env` (stwórz na podstawie pliku `.env` wpisując swoje hasło do MySQL i sekret auth):
   ```env
   DATABASE_URL="mysql://uzytkownik:haslo@127.0.0.1:3306/trade_training"
   AUTH_SECRET="twoj-unikalny-klucz-auth"
   ```

4. Wygeneruj i wgraj tabele do bazy MySQL:
   ```bash
   npm run db:push
   ```

5. Uruchom seedowanie bazy danych z początkowymi lekcjami i quizem:
   ```bash
   npm run db:seed
   ```

6. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```

## 📄 Licencja
Projekt udostępniony na licencji **MIT**.
