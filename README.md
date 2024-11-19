Sökfunktion
StayCation erbjuder en avancerad sökfunktion där användare kan filtrera boenden baserat på:
Stad/region i Sverige
Typ av funktionsnedsättning eller särskilda behov
Tillgänglighetsfunktioner (t.ex. rullstolsramper, hiss, anpassade badrum)
Datum för vistelsen
Antal gäster

Boendepresentation
Varje boende presenteras med:
Detaljerade beskrivningar av tillgänglighetsanpassningar
Högupplösta bilder som tydligt visar anpassningar
Användarrecensioner med fokus på tillgänglighet
Information om närliggande faciliteter (t.ex. sjukhus, apotek)

Bokningssystem
Ett användarvänligt bokningssystem som:
Tillåter användare att välja datum och se realtidstillgänglighet
Erbjuder möjlighet att lägga till särskilda önskemål eller behov
Har en tydlig översikt över totalkostnaden

Användarprofiler
Användare kan skapa profiler där de kan:
Spara sina tillgänglighetspreferenser
Se bokningshistorik
Lämna recensioner av boenden de besökt

Värdprofiler
Värdar kan skapa profiler för att:
Lägga upp och hantera sina boenden
Kommunicera med gäster
Se bokningar och intäkter

Tillgänglighetsguide
En omfattande guide som förklarar olika tillgänglighetsanpassningar och hur man använder plattformen.
Teknisk implementation



Frontend
React: För att bygga ett dynamiskt och interaktivt användargränssnitt
TypeScript: För att förbättra kodkvalitet och underhållbarhet
Styled-components: För att skapa responsiva och tillgängliga komponenter
React Router: För navigering mellan olika sidor
Axios: För att hantera API-anrop till backend



Backend
Node.js med Express.js: För att bygga en skalbar server
TypeScript: För typsäker backend-kod
MongoDB: Som databas för att lagra användar- och boendedata
Mongoose: För databasmodellering och -hantering
JSON Web Tokens (JWT): För säker autentisering

Tillgänglighetsanpassningar
Implementering av ARIA-attribut för skärmläsare
Kontrastrika färgscheman för synnedsättningar
Tangentbordsnavigering för motoriska funktionsnedsättningar
Tydliga och lättlästa typsnitt

Responsiv design
Flexibel layout som anpassar sig till olika skärmstorlekar
Touchvänliga element för mobila enheter

API-integration
Integration med karttjänster för att visa boendens läge
Möjlig integration med hjälpmedelstjänster för ytterligare information

Övergripande struktur
Landningssida: Presenterar plattformens syfte och huvudfunktioner
Sökresultatsida: Visar filtrerade boenden baserat på användarens sökkriterier
Detaljsida för boende: Ger omfattande information om ett specifikt boende
Bokningssida: Hanterar bokningsprocessen
Användarprofil: Låter användare hantera sina uppgifter och bokningar
Värdprofil: Ger värdar verktyg för att hantera sina boenden
Administratörspanel: För plattformsadministratörer att övervaka och hantera systemet