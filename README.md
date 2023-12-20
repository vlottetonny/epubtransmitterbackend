# epubtransmitterbackend

Hier is een korte handleiding over hoe je het project kunt starten en bouwen:

1. **Het project bouwen**
   Om het project te bouwen, gebruik je eerst `npm i` om de `Node modules` te installeren. Daarna gebruik je het `build` script dat gedefinieerd is in het `package.json` bestand. Dit script verwijdert eerst de bestaande `dist` map (als die er is) met behulp van `rimraf`, en voert dan de TypeScript compiler uit om je TypeScript code te compileren naar JavaScript. Je kunt dit script uitvoeren met het volgende commando in je terminal:

   ```bash
   npm i
   npm run build
   ```

2. **Het project starten**
   Om het project te starten, gebruik je het `start` script dat gedefinieerd is in het `package.json` bestand. Dit script voert eerst het `prestart` script uit, dat het `build` script aanroept om ervoor te zorgen dat het project is gebouwd. Daarna start het de gecompileerde JavaScript code met Node.js. Je kunt dit script uitvoeren met het volgende commando in je terminal:

   ```bash
   npm start
   ```

3. **Het project in ontwikkelmodus draaien**
   Als je aan het project werkt en wilt dat het automatisch opnieuw start wanneer je wijzigingen aanbrengt in je code, kun je het `serve` script gebruiken. Dit script start de TypeScript compiler in watch-modus en gebruikt `nodemon` om het project opnieuw te starten wanneer er wijzigingen worden gedetecteerd. Je kunt dit script uitvoeren met het volgende commando in je terminal:

   ```bash
   npm run serve
   ```

Zorg ervoor dat je deze commando's uitvoert in de hoofdmap van het project, waar het`package.json` bestand zich bevindt.

## MongoDB Credentials

Om dit project te gebruiken, moet je MongoDB credentials instellen. Deze credentials worden gebruikt om verbinding te maken met de MongoDB database. Volg de onderstaande stappen om je MongoDB credentials in te stellen:

1. Maak een nieuw bestand aan in de hoofdmap van het project en noem het `.env`.

2. Open het `.env` bestand en voeg de volgende regels toe:

   ```dotenv
   MONGO_USER=<jouw MongoDB gebruikersnaam>
   MONGO_PASSWORD=<jouw MongoDB wachtwoord>
   MONGO_HOST=<jouw MongoDB host>
   
## Endpoints

Dit zijn de endpoints van de backend die je kunt aanroepen:

>1. **Endpoint**: `GET /code/get` <br/>
    - **Beschrijving**: Haalt een code op. <br/>
    - **Parameters**: Geen <br/>
    - **Verzoek Body**: Geen <br/>
    - **Reactie**: Een tekenreeks die de code voorstelt. <br/>

> 2. **Endpoint**: `POST /code/connect` <br/>
    - **Beschrijving**: Verbindt een code. <br/>
    - **Parameters**: Geen <br/>
    - **Verzoek Body**: Een JSON-object met een enkele eigenschap `code` die een tekenreeks is. <br/>
    - **Voorbeeld Verzoek Body**: `{ "code": "A123BC" }` <br/>
    - **Reactie**: Een bericht dat het resultaat van de verbinding aangeeft. <br/>

>3. **Endpoint**: `POST /epub/send` <br/>
    - **Beschrijving**: Verstuurt een epub-bestand en een code. <br/>
    - **Parameters**: Geen <br/>
    - **Verzoek Body**: Formulier-gegevens die een `code` veld bevatten dat een tekenreeks is en een `file` veld dat het epub-bestand is. <br/>
    - **Voorbeeld Verzoek Body**: `{ "code": "AB12C3", "file": <bestand> }` <br/>
    - **Reactie**: Een JSON-object met een bericht dat het resultaat van de bestandsverwerking aangeeft. <br/>

