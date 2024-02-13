# Prova pratica - Junior Backend Developer

### Descrizione

L'obiettivo di questa prova è sviluppare un'applicazione backend per la gestione di un canile virtuale. L'applicazione dovrà permettere agli utenti di visualizzare i cani disponibili, adottarli e lasciarli in custodia. Si dovranno utilizzare NodeJS con il framework Express e TypeScript per lo sviluppo dell'applicazione. Inoltre, sono richiesti l'uso delle aggregazioni MongoDB per le query al database e l'implementazione di un sistema di cache locale **senza l'utilizzo di librerie esterne** per ottimizzare le prestazioni delle API.

### Requisiti Specifici

1. **Database**: Utilizzare MongoDB per gestire i dati. Strutturare una collezione `dogs` che include campi come `id`, `name`, `breed`, `age`, `status` (available, adopted, in-custody), `adoptionDate`.

2. **Aggregazione MongoDB**: Implementare una query di aggregazione che permetta di ottenere statistiche giornaliere sui cani disponibili, adottati e in custodia.

3. **API RESTful**: Sviluppare un'API RESTful che permetta di eseguire le seguenti operazioni:

   - Elenco dei cani disponibili.
   - Registrazione di un nuovo cane, specificando nome, razza, e età.
   - Dati di un singolo cane.
   - Statistiche giornaliere sui cani (**Aggregazione MongoDB**).
   - Adozione di un cane, specificando l'ID del cane.
   - Messa in custodia di un cane, specificando nome, razza, e età.
   - Rilascio di un cane dalla custodia, specificando l'ID del cane.

4. **Sistema di Cache Locale**: Implementare un sistema di cache per memorizzare le risposte delle query più frequenti, come l'elenco dei cani disponibili. Implementare un meccanismo di purge della cache quando un cane viene adottato o lasciato in custodia, per assicurare che le informazioni restituite dalle API siano aggiornate.

5. **TypeScript**: Utilizzare TypeScript per tutto lo sviluppo, definendo interfacce o classi adeguate per i dati gestiti e le risposte delle API.

6. **Documentazione**: Documentare le api RESTful con Swagger.

### Bonus

- Implementare autenticazione e autorizzazione per le operazioni di adozione e custodia.

### Criteri di Valutazione

- Correttezza funzionale dell'applicazione.
- Pulizia e chiarezza del codice.
- Uso efficace di TypeScript, compresa la tipizzazione.
- Implementazione e utilizzo di aggregazioni MongoDB.
- Efficienza del sistema di cache, inclusa la gestione del purge.
- Documentazione del codice e delle API.

### Consegna

Il candidato dovrà fornire il codice sorgente dell'applicazione eseguendo il fork di questo repository e includere un README con istruzioni per l'installazione e l'esecuzione dell'applicazione, insieme a eventuali note sullo sviluppo.

### Tempo massimo per la prova:

7 giorni
