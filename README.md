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

## Istruzioni per il setup del progetto

```
npm install
```
