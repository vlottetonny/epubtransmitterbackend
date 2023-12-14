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

Zorg ervoor dat je deze commando's uitvoert in de hoofdmap van het project, waar jhet`package.json` bestand zich bevindt.

## Dit zijn de endpoints van de backend die je kunt aanroepen:

>1. **Endpoint**: `GET /code/get`
    - **Beschrijving**: Haalt een code op.
    - **Parameters**: Geen
    - **Verzoek Body**: Geen
    - **Reactie**: Een tekenreeks die de code voorstelt.

> 2. **Endpoint**: `POST /code/connect`
    - **Beschrijving**: Verbindt een code.
    - **Parameters**: Geen
    - **Verzoek Body**: Een JSON-object met een enkele eigenschap `code` die een tekenreeks is.
    - **Voorbeeld Verzoek Body**: `{ "code": "A123BC" }`
    - **Reactie**: Een bericht dat het resultaat van de verbinding aangeeft.

>3. **Endpoint**: `POST /epub/send`
    - **Beschrijving**: Verstuurt een epub-bestand en een code.
    - **Parameters**: Geen
    - **Verzoek Body**: Formulier-gegevens die een `code` veld bevatten dat een tekenreeks is en een `file` veld dat het epub-bestand is.
    - **Voorbeeld Verzoek Body**: `{ "code": "AB12C3", "file": <bestand> }`
    - **Reactie**: Een JSON-object met een bericht dat het resultaat van de bestandsverwerking aangeeft.

