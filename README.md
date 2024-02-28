# REST API per la gestione di un canile virtuale

Questo progetto implementa una REST API per la gestione di un canile virtuale, consentendo agli utenti di recuperare, aggiungere, adottare e gestire i cani all'interno del sistema.

| Methods | Urls                 | Actions                                   |
| ------- | -------------------- | ----------------------------------------- |
| GET     | api/dogs             | Recupera tutti i cani presenti nel canile |
| GET     | api/dogs/:id         | Recupera un cane specifico per id         |
| POST    | api/dogs/new         | Aggiunge un nuovo cane                    |
| PUT     | api/dogs/:id/adopt   | Adotta un cane                            |
| PUT     | api/dogs/custody     | Aggiunge un cane in custodia              |
| DELETE  | api/dogs/custody/:id | Rimuove un cane dalla custodia            |

## Setup del progetto

### Configurazione del file .env

Il progetto utilizza un file `.env` per gestire le variabili d'ambiente. Prima di avviare l'applicazione, è necessario creare un file `.env` nella radice del progetto e configurare le seguenti variabili:

```
NODE_ENV=""       # Ambiente di sviluppo
DB_CONN_STRING="" # Stringa di connessione al database
DB_NAME=""        # Nome del database
HTTP_PORT=        # Porta HTTP
JWT_SECRET=       # Stringa di chiave per firmare i jwt
```

### Installazione delle dipendenze

Per installare le dipendenze, eseguire il seguente comando da terminale:

```
npm install
```

### Esecuzione

Per eseguire il progetto, digitare il comando da terminale:

```
npm run dev
```
