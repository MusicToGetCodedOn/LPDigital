const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // 1. Admin User Seeding
  const username = process.env.PORTFOLIO_USERNAME || "admin";
  const rawPassword =
    process.env.PORTFOLIO_PASSWORD || "bwd2026";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  // 2. Projekte mit bereinigten Tags & Link/Bild-Feldern
  const projects = [
  {
    id: "soundscope",
    title: "SoundScope",
    category: "Privat",
    tags: "React,Node.js,JavaScript,API,MongoDB,Fullstack",
    description:
      "Das Projekt SoundScope ist eine Webanwendung, die aktuelle Musikwiedergaben über die Spotify-API ausliest und anzeigt. Die Software dient der Erfassung von Hörgewohnheiten und bietet eine Client-Server-Architektur zur Authentifizierung und Speicherung von Abspieldaten in einer Datenbank.",
    initialSituation:
      "Die Entwicklung adressiert den Bedarf, die aktuell abgespielten Titel eines Nutzers automatisiert zu erfassen und auf einem Dashboard darzustellen. Ziel war die Erstellung einer Anwendung, die Wiedergabedaten über Spotify-API-Endpunkte abruft und diese nicht nur anzeigt, sondern auch für eine spätere Historienauswertung persistent speichert.",
    technologies: "Für die clientseitige Entwicklung wurde die JavaScript-Bibliothek React in Kombination mit dem Build-Tool Vite gewählt. Serverseitig basiert die Anwendung auf Node.js unter Verwendung des Webframeworks Express. Als Datenbanktechnologie kommt MongoDB zum Einsatz, wobei die Datenmodellierung über den Objekt-Dokumenten-Mapper Mongoose erfolgt. Für HTTP-Anfragen zwischen den Diensten und externen Schnittstellen wird die Bibliothek Axios verwendet.",
    implementation:
      "Die Anwendung ist strukturell in Client- und Server-Verzeichnisse unterteilt. Das Backend beinhaltet Konfigurationsdateien für die Datenbankanbindung und definiert ein dediziertes Datenschema für den Wiedergabeverlauf über ein PlayHistory-Modell. Im Frontend wird die Navigation durch separate Routen-Komponenten für eine Haupt- und eine Profilansicht abgebildet. Eine zentrale technische Komponente war die Implementierung der Authentifizierungslogik, welche in einem eigenen React-Hook gekapselt wurde, um den Status zu verwalten.Entwicklung einer Web-Anwendung mit React im Frontend und Node.js im Backend, die über OAuth 2.0 an die Spotify Web API angebunden ist.",
    results:
      "Der aktuelle Stand der Software umfasst ein konfiguriertes System aus Frontend und Backend. Die Benutzeroberfläche stellt Ansichten für die Hauptseite und das Profil bereit, ergänzt durch eine Kopfzeilen-Komponente. Die serverseitige Infrastruktur ist für die Entgegennahme von Anfragen, die Kommunikation mit der MongoDB-Datenbank und das Speichern der Wiedergabehistorie eingerichtet.",
    learnings:
      "Aus der Architektur des Projekts lässt sich die Anwendung des MERN-Stacks ableiten, insbesondere die Trennung von React-Frontend und Node.js-Backend. Der Code demonstriert Vorgehensweisen bei der Modellierung von Datenbank-Schemata mit Mongoose sowie die Kapselung von Authentifizierungsprozessen in clientseitigen Hooks. ",
    imageUrl: "/projects/soundscope.png",
    documentUrl: "/abstracts/Project_Abstract_SoundScope.pdf",
    githubUrl: "https://github.com/MusicToGetCodedOn/Sound_Scope",
    liveUrl: null,
  },
  {
    id: "lpfinance",
    title: "LPFinance",
    category: "Gibb",
    tags: ".NET MAUI,C#,Frontend",
    description:
      "LPFinance ist eine übersichtliche Desktop-Anwendung, die für Kleinbetriebe und Einzelunternehmen konzipiert wurde, um Einnahmen, Ausgaben und Kundeninformationen zentral zu erfassen. Die Softwarerichtet sich an Nutzer mit geringen IT- und Buchhaltungskenntnissen und bietet eine reduzierte Benutzeroberfläche zur täglichen Finanzdokumentation und Auswertung.",
    initialSituation:
      "Die Entwicklung von LPFinance resultiert aus den Anforderungen der Buchhaltungsservice Müller AG, welche ihren Kunden aus dem Segment der Kleinbetriebe eine digitale Alternative zu manuellen Tabellenkalkulationen zur Verfügung stellen wollte. Die Zielgruppe benötigt ein Werkzeug zur Dokumentation von Finanzbewegungen und zur Generierung von Monatsübersichten, ohne tiefgehendes Fachwissen vorauszusetzen. Das Ziel bestand darin, wiederkehrende Aufgaben zu vereinfachen, die Fehlerquote bei der manuellen Erfassung durch Kontrollmechanismen zu senken und eine lokale, offline-fähige Desktop-Lösung zu schaffen.",
    technologies: "Das Projekt wurde auf Basis des Cross-Platform-Frameworks .NET MAUI realisiert, wobei C# als Programmiersprache für die Anwendungslogik und XAML für die Deklaration der Benutzeroberfläche dienen. Die Codebasis ist so konfiguriert, dass sie Build-Ziele für Windows, Android, iOS, Tizen und MacCatalyst unterstützt. Für das lokale Datenmanagement kommt eine in C# geschriebene Service-Klasse namens DataService zum Einsatz, welche die Speicherung und den Abruf der Daten abstrahiert. Die visuelle Gestaltung greift auf plattformübergreifende Ressourcen wie SVG-Icons und lokale Schriftarten zurück.",
    implementation:
      "Die Architektur der Anwendung folgt dem Strukturmuster von .NET MAUI, bei dem die Navigationshierarchie zentral über eine AppShell-Komponente gesteuert wird. Die Benutzeroberfläche ist in logische Bereiche unterteilt, die durch dedizierte Ansichten wie die OverviewPage, die AddBookingPage und die AccountsPage repräsentiert werden. Eine technische Vorgabe war die Implementierung einer lokalen Datenspeicherung, um die Offline-Funktionalität zu gewährleisten. Die Datenhaltung wurde im DataService gekapselt, um die UI-Komponenten von der Logik zu entkoppeln und Fehlerkontrollen bei der Eingabe abzufangen.",
    results:
      "Der Projektstand beinhaltet eine grafische Benutzeroberfläche mit Navigationsstrukturen zwischen den Modulen zur Erfassung von Konten und Buchungen. Anwender können über die Masken neue finanzielle Transaktionen eintragen und sich die Daten in einer Monatsübersicht darstellen lassen. Durch die lokale Speicherung wird der Anspruch an die Datensicherheit und die Offline-Verfügbarkeit auf dem Endgerät erfüllt. Eine definierte Exportfunktion ermöglicht zudem die Ausgabe der Monatsberichte als PDF-Dokument für die externe Weiterverarbeitung.",
    learnings:
      "Das Repository demonstriert die Strukturierung einer .NET MAUI-Anwendung durch die Trennung von XAML-basiertem Layout und dem dazugehörigen C#-Code-Behind der einzelnen Seiten. Aus der Dateistruktur lässt sich der Einsatz von ressourcenbasiertem Styling über dedizierte Dictionaries für Farben und globale Stile ablesen, was die Konsistenz der UI-Elemente sicherstellt. Das Projekt veranschaulicht zudem die Vorgehensweise bei der Umsetzung lokaler Datenverarbeitung und formularbasierter Datenerfassung im Kontext einer Desktop-Applikation.",
    imageUrl: "/projects/lpfinance.png",
    documentUrl: "/abstracts/Project_Abstract_LPFinance.pdf",
    githubUrl: "https://github.com/MusicToGetCodedOn/LPFinance",
    liveUrl: null,
  },
  {
    id: "gamebase",
    title: "Gamebase",
    category: "Gibb",
    tags: "React,Node.js,JavaScript,API,Fullstack",
    description:
      "Gamebase ist eine Webanwendung, die aus einer React-basierten Frontend-Applikation und einem serverseitigen Node.js-Backend besteht und der Anzeige, Suche und Kategorisierung von Videospielen dient. Die Software richtet sich an Nutzer, die Spieledaten filtern, Detailinformationen abrufen und persönliche Präferenzen verwalten möchten, und bietet dafür eine modulare grafische Benutzeroberfläche.",
    initialSituation:
      "Die Entwicklung des Projekts basiert auf der Anforderung, strukturierte Daten zu Videospielen über eine Client-Server-Architektur abrufbar und visuell erfassbar zu machen. Das Problem bestand darin, eine Lösung zu schaffen, die nicht nur statische Informationen anzeigt, sondern auch dynamische Interaktionen wie das Suchen, Filtern und das Verwalten von Benutzersitzungen ermöglicht. Ziel war die Implementierung einer Single-Page-Application, die eine komponentenbasierte Navigation zwischen verschiedenen Ansichten wie Top-Bewertungen, aktuellen Trends und individuellen Spieldetails sicherstellt.",
    technologies: "Das Projekt nutzt im Frontend React als grundlegende Bibliothek für die Erstellung der Benutzeroberfläche, während Vite als Build-Tool für die lokale Entwicklungsumgebung und Kompilierung dient. Für das State-Management kommen React Contexts zum Einsatz, um Authentifizierungsstatus, visuelle Themen (Light/Dark-Mode) und Benachrichtigungen global zu steuern. Die Datenbeschaffung erfolgt über asynchrone JavaScript-Funktionen, die in dedizierten Utility-Modulen ausgelagert sind. Das Backend ist in JavaScript geschrieben und basiert auf einer serverseitigen Node.js-Laufzeitumgebung, deren primärer Einstiegspunkt durch eine zentrale Server-Datei definiert wird. Die Abhängigkeitsverwaltung beider Komponenten erfolgt über den Node Package Manager.",
    implementation:
      "Die Architektur der Anwendung basiert auf einer klaren strukturellen Trennung von Präsentations- und Logikschicht. Im Frontend sind die Benutzeroberflächen in wiederverwendbare UI-Komponenten wie Modals, Karten und Raster unterteilt, die über spezifische Routen für Entdecken, Kontoverwaltung und Detailansichten gerendert werden. Eine technische Herausforderung stellte die Kapselung der API-Aufrufe dar, welche durch die Auslagerung in dedizierte Utility-Skripte für gefilterte, populäre und top-bewertete Spiele gelöst wurde. Zudem erforderte die Implementierung von benutzerspezifischen Einstellungen und Sitzungen eine globale Zustandsverwaltung, die über Context-Provider für Authentifizierung und UI-Themen realisiert ist, um Logik von der reinen Darstellung zu entkoppeln.",
    results:
      "Das System verfügt über eine voll funktionsfähige Navigationsstruktur mit implementierten Modulen zur Darstellung von Spielübersichten und Detaildaten. Kernfunktionen wie die thematische Anpassung der Benutzeroberfläche über einen Theme-Toggle, die Authentifizierung mittels Login- und Logout-Komponenten sowie die Anzeige von Systemmeldungen über Toasts sind in die Anwendung integriert. Die Darstellung der Spiele erfolgt über dedizierte Ansichten wie Karussells und strukturierte Raster, wobei die Daten über die entsprechenden Hilfsfunktionen dynamisch geladen werden können.",
    learnings:
      "Die Dateistruktur des Repositories verdeutlicht etablierte Verfahren in der komponentenbasierten Softwareentwicklung mit React, insbesondere die strikte Kapselung von Routen, UI-Elementen und globalem Zustand. Der Code zeigt auf, wie durch den Einsatz von Context-Providern die direkte Weitergabe von Properties über mehrere Ebenen (Prop-Drilling) vermieden wird und wie sich externe Datenabrufe strukturiert vom eigentlichen Rendering-Prozess der Benutzeroberfläche trennen lassen. Darüber hinaus illustriert das Projekt die physische Aufteilung einer Webanwendung in unabhängige Verzeichnisse für Frontend- und Backend-Dienste.",
    imageUrl: "/projects/gamebase.png",
    documentUrl: "/abstracts/Project_Abstract_Gamebase.pdf",
    githubUrl: "https://github.com/MusicToGetCodedOn/Gamebase-frontend",
    liveUrl: "https://gamebase-frontend.vercel.app/",
  },
  {
    id: "district37",
    title: "District37",
    category: "Privat",
    tags: "React,Node.js,JavaScript,MongoDB,Fullstack",
    description:
      "Das Projekt District37 ist eine Webanwendung zur Verwaltung von Terminen und Dienstleistungen, die primär für einen Friseursalon oder einen ähnlichen Dienstleistungsbetrieb konzipiert wurde. Die Software ermöglicht es Benutzern, sich zu registrieren, Dienstleistungen einzusehen und Buchungen vorzunehmen. Ein integrierter administrativer Bereich bietet Funktionen zur Verwaltung der Termine, zur Auswertung von Daten sowie zur Pflege des Dienstleistungsangebots. Die Architektur basiert auf einer vollständigen Trennung von Client und Server.",
    initialSituation:
      "Die Entwicklung adressiert den Bedarf an einer digitalen Terminverwaltung, um manuelle Buchungsprozesse abzulösen. Ziel war die Erstellung einer Plattform, auf der Kunden eigenständig Termine für spezifische Dienstleistungen anfragen können. Gleichzeitig erforderte die Aufgabenstellung eine Administrationsschnittstelle, die dem Betreiber eine Übersicht der anstehenden Termine bietet, eine grafische Auswertung der Buchungsdaten ermöglicht und den Export dieser Daten für weitere betriebliche Zwecke unterstützt.",
    technologies: "Für die Entwicklung des Frontends kam die JavaScript-Bibliothek React in Kombination mit dem Build-Tool Vite zum Einsatz. Die clientseitige Navigation wird durch React Router abgebildet, während die HTTP-Kommunikation mit dem Backend über Axios erfolgt. Serverseitig basiert die Anwendung auf Node.js und dem Webframework Express. Als Datenbanktechnologie wird MongoDB verwendet, wobei die Datenmodellierung und Kommunikation über den Objekt-Dokumenten-Mapper Mongoose stattfindet. Zur Absicherung der Routen und der Benutzerauthentifizierung implementiert das System JSON Web Tokens, und Passwörter werden vor der Speicherung mit der Bibliothek bcryptjs kryptografisch gehasht.",
    implementation:
      "Die Anwendung folgt einer klassischen Client-Server-Architektur. Das Backend ist strukturiert in Modelle, Controller und Middleware, wobei dedizierte Schema-Definitionen für Benutzer, Termine und Dienstleistungen existieren. Die Authentifizierungslogik wird serverseitig über eine eigene Middleware geschützt. Eine zentrale technische Anforderung bei der Implementierung war die sichere Verwaltung des Sitzungszustandes, was im Frontend über einen zentralen React-Kontext und eine geschützte Routen-Komponente gelöst wurde. Zudem erforderte die administrative Ansicht die Integration von Diagramm-Komponenten zur Datenvisualisierung sowie eine Funktion zum korrekten Formatieren und Exportieren der Datenbankinhalte als CSV-Datei.",
    results:
      "Der aktuelle Stand der Software umfasst ein voll funktionsfähiges System aus Frontend und Backend. Erfolgreich umgesetzt wurden die Benutzerregistrierung und das Login-Verfahren, eine Ansicht der angebotenen Dienstleistungen sowie ein interaktives Formular zur Terminbuchung. Der administrative Bereich ist mit einem Dashboard ausgestattet, das neben der tabellarischen Terminübersicht auch grafische Auswertungen und die geforderte Exportfunktion bereitstellt. Bildlaufleisten und formularbasierte Eingaben zur Pflege von Personen und Dienstleistungen ergänzen den Funktionsumfang.",
    learnings:
      "Aus der Projektarchitektur lässt sich die konsequente Anwendung des MERN-Stacks ableiten, die eine strikte Trennung von Geschäftslogik und Präsentationsschicht voraussetzt. Der Code verdeutlicht Vorgehensweisen bei der Erstellung von REST-APIs, dem Einsatz von Middleware zur Validierung von Zugriffsrechten und der Modellierung von Datenschemata in einer dokumentenorientierten Datenbank. Ferner demonstriert das Frontend den effektiven Einsatz der React Context API zur Vermeidung von Prop-Drilling bei der Weitergabe von Authentifizierungsdaten über die gesamte Komponentenstruktur hinweg.",
    imageUrl: "/projects/district37.png",
    documentUrl: "/abstracts/Project_Abstract_District37.pdf",
    githubUrl: "https://github.com/MusicToGetCodedOn/District37",
    liveUrl: null,
  },
  /*{
    id: "vortex",
    title: "Vortex",
    category: "Privat",
    tags: "Python,AI,TTS",
    description: "Intelligenter Sprachassistent inspiriert von JARVIS.",
    initialSituation:
      "Automatisierung von Systembefehlen und Sprachsteuerung für das persönliche Workspace-Setup.",
    technologies: "Python, SpeechRecognition, Text-to-Speech (TTS), OS APIs",
    implementation:
      "Prototypisierung eines Sprachassistenten mit Spracherkennungs-Algorithmen und Anbindung an lokale Steuerungs-Schnittstellen.",
    results:
      "Ein funktionaler Sprachassistent zur Ausführung von Befehlen und Abfrage von System-Informationen.",
    learnings:
      "Grundlagen der Sprachverarbeitung in Python und Steuerung von Betriebssystem-Schnittstellen.",
    imageUrl: "/projects/vortex.png",
    documentUrl: null,
    githubUrl: "https://github.com/MusicToGetCodedOn/Vortex",
    liveUrl: null,
  },*/
  {
    id: "pcmatch",
    title: "PCMatch",
    category: "Gibb",
    tags: "React,JavaScript,Frontend",
    description:
      "PCMatch ist eine React-basierte Webanwendung, die der Konfiguration und Zusammenstellung von PC-Hardwarekomponenten dient. Die Software richtet sich an Nutzer, die kompatible Bauteile wie Prozessoren, Mainboards und Grafikkarten aus einem strukturierten Datensatz filtern und zu einem vollständigen System zusammenfügen möchten.",
    initialSituation:
      "Die Entwicklung des Projekts basiert auf der Anforderung, strukturierte Hardwaredaten für den PC-Bau über eine grafische Benutzeroberfläche visuell erfassbar und konfigurierbar zu machen. Das Problem bestand darin, eine Lösung zu schaffen, die statische JSON-Datensätze zu verschiedenen Computerkonstruktionsteilen einliest und dynamische Interaktionen wie das Suchen und Auswählen ermöglicht. Ziel war die Implementierung einer Single-Page-Application, die eine modulare Navigation zwischen einer dedizierten Builder-Ansicht und einer Produktübersicht",
    technologies: "Das Projekt nutzt im Frontend React als grundlegende Bibliothek für die Erstellung der Benutzeroberfläche, während Vite als Build-Tool für die lokale Entwicklungsumgebung und die Kompilierung dient. Die Datenhaltung der Hardwarekomponenten erfolgt lokal in strukturierten JSON-Dateien. Das Styling der Anwendung wird modular über CSS-Modules abgewickelt, was eine komponentenbezogene Kapselung der Stile gewährleistet. Die Abhängigkeitsverwaltung erfolgt über den Node Package Manager, während ESLint für die statische Code-Analyse und Einhaltung von Code-Standards in die Konfiguration integriert ist. Für die Navigation innerhalb der Single-Page-Application kommt ein Routing-Konzept zum Einsatz, das zwischen den verschiedenen Hauptansichten wechselt.",
    implementation:
      "Die Architektur der Anwendung basiert auf einer komponentenbasierten Struktur, die Präsentationslogik strikt in wiederverwendbare UI-Elemente wie spezifische Hardware-Karten, Suchleisten und Bestätigungs-Modals unterteilt. Die Applikationszustände und die Formularlogik werden in Modulen wie dem BuildForm und der Buildsummary zentral verwaltet. Eine technische Hürde stellte die konsistente Kapselung der Stylesheets dar, welche durch den konsequenten Einsatz von CSS-Modules gelöst wurde, um globale Namenskonflikte zu vermeiden. Die statischen Hardwaredaten werden über dedizierte JSON-Dateien aus einem Datenverzeichnis importiert und in den jeweiligen Routen für die Builder- und Produktansichten dynamisch gerendert.",
    results:
      "Das finale System verfügt über eine funktionstüchtige Navigationsstruktur mit implementierten Routen für die Produktsuche, den PC-Konfigurator und eine abgeschlossene Zusammenfassung. Kernfunktionen wie die Darstellung spezifischer Bauteile von Mainboards bis hin zu Netzteil- und Speicherkomponenten wurden erfolgreich in eigenen Kartenkomponenten realisiert. Die Anwendung lädt und visualisiert die statischen JSON-Datensätze fehlerfrei innerhalb der entsprechenden Konfigurationsformulare.",
    learnings:
      "Die Verzeichnisstruktur des Repositories verdeutlicht etablierte Verfahren in der komponentenbasierten Frontend-Entwicklung mit React, insbesondere die strikte Kapselung von Routen, UI-Elementen und statischen Datenquellen. Der Code zeigt auf, wie durch den Einsatz von CSS-Modules das Styling wartbar gehalten wird und wie sich spezifische Hardware-Komponenten durch wiederverwendbare Karten-Layouts standardisieren lassen. Darüber hinaus illustriert das Projekt die physische Aufteilung einer Webanwendung in unabhängige Verzeichnisse für Assets, Daten, Routen und Kernkomponenten innerhalb einer modernen Vite-Build-Umgebung.",
    imageUrl: "/projects/pcmatch.png",
    documentUrl: "/abstracts/Project_Abstract_PCMatch.pdf",
    githubUrl: "https://github.com/MusicToGetCodedOn/PCMatch",
    liveUrl: null,
  },
  {
    id: "stalkr",
    title: "Stalkr",
    category: "Gibb",
    tags: "React,Docker,Node.js,Fullstack,Typescript",
    description:
      "Stalkr ist eine Webanwendung zur Verwaltung und Überwachung von Minecraft-Servern. Die Software richtet sich an Server-Administratoren und bietet eine grafische Benutzeroberfläche zur Steuerung des Server-Status, zur Verwaltung von Spieler-Whitelists sowie zur Bearbeitung von Server-Konfigurationen und NBT-Daten.",
    initialSituation:
      "Die Entwicklung des Projekts basiert auf der Anforderung, die Administration von dedizierten Minecraft-Servern über eine zentrale, webbasierte Benutzeroberfläche zugänglich zu machen. Das Problem bestand darin, isolierte Systemprozesse wie das Docker-Container-Management, das Auslesen von Server-Statistiken sowie die Verwaltung von Konfigurationsdateien und Whitelists in einer einheitlichen Applikation zu konsolidieren. Ziel war die Implementierung einer Client-Server-Architektur, welche eine geschützte Admin-Ansicht mit direktem Zugriff auf die Live-Konsole, Server-Eigenschaften und Spielerdaten bereitstellt.",
    technologies: "Das Projekt ist als Full-Stack-Applikation konzipiert und verwendet netzwerkübergreifend TypeScript für die Typsicherheit. Im Frontend kommt React als primäre UI-Bibliothek zum Einsatz, während Vite den Build-Prozess und die lokale Entwicklungsumgebung steuert. Die serverseitige Logik ist in Node.js implementiert und strukturiert sich in dedizierte Routen und Services. Für die Interaktion mit dem Host-System wird programmatisch ein Docker-Service genutzt, um die zugrundeliegenden Server-Container zu verwalten. Spezifische binäre Datenformate des Spiels werden über einen dedizierten NBT-Service verarbeitet, während die asynchrone Kommunikation zwischen Client und Server über eine zentrale API-Schnittstelle abgewickelt wird.",
    implementation:
      "Die Architektur folgt einer strikten Trennung zwischen einer Frontend-Applikation und einem serverseitigen Backend. Im Frontend ist die Präsentationslogik in wiederverwendbare UI-Elemente wie Spielerkarten, Server-Statistiken und Admin-spezifische Komponenten für Konfigurations-Editoren aufgeteilt. Die Navigationsstruktur unterscheidet primär zwischen öffentlichen Home-Ansichten, einer Login-Maske und einem geschützten Administrationsbereich. Backend-seitig wird eine Service-orientierte Architektur angewandt, welche die Geschäftslogik in spezialisierte Module für Authentifizierung, Docker-Interaktion, Minecraft-spezifische Aufgaben und UUID-Auflösung unterteilt. Die technische Integration der Live-Konsole und die dynamische Manipulation der Whitelist sowie der Server-Eigenschaften erforderten dedizierte Schnittstellen, die durch spezialisierte Routing-Module für Spieler, Server und Authentifizierung abgebildet werden.",
    results:
      "Das finale System stellt eine funktionstüchtige Verwaltungsplattform dar, die Client- und Server-Komponenten erfolgreich integriert. Kernfunktionen wie die Steuerung des Server-Status, das Auslesen einer textbasierten Live-Konsole sowie die direkte grafische Manipulation der Whitelist und der Server-Eigenschaften wurden in spezifischen Admin-Komponenten realisiert. Das Frontend kommuniziert über definierte API-Endpunkte mit den Backend-Services, um Spielerdaten abzurufen und die Docker-basierten Serverprozesse zu steuern.",
    learnings:
      "Die Verzeichnisstruktur des Repositories demonstriert etablierte Praktiken in der Full-Stack-Entwicklung mit TypeScript, insbesondere die klare Kapselung von Authentifizierungsmechanismen und spielspezifischen Diensten in getrennten Schichten. Der Code zeigt auf, wie Systemzugriffe auf externe Abhängigkeiten wie Docker und proprietäre Dateiformate wie NBT durch dedizierte Service-Klassen abstrahiert werden können, um die Skalierbarkeit und Wartbarkeit der API zu gewährleisten. Darüber hinaus illustriert die Architektur des Frontends eine strikte Trennung von seitenübergreifenden Elementen, ansichtsspezifischen Hauptseiten und modularen Administrationswerkzeugen innerhalb einer modernen React- und Vite-Build-Umgebung.",
    imageUrl: "/projects/stalkr.png",
    documentUrl: "/abstracts/Project_Abstract_Stalkr.pdf",
    githubUrl: "https://github.com/kiraa1q/stalkr",
    liveUrl: null,
  },
  {
    id: "heatcalculator",
    title: "HeatCalculator",
    category: "Gibb",
    tags: "Java,OOP,Frontend",
    description:
      "Schulprojekt zur Berechnung der Solarpanel-Leistung je nach Installationstyp.",
    initialSituation:
      "Berechnung des Energieertrags von Photovoltaikanlagen unter Berücksichtigung verschiedener Montagearten.",
    technologies: "Java, JavaFX, Object-Oriented Programming (OOP)",
    implementation:
      "Entwicklung einer Java-Anwendung mit objektorientierter Architektur zur Erfassung von Grid-, Roof- und Slope-Installationen.",
    results:
      "Präzises Berechnungstool zur Ermittlung von Effizienz und Leistungswerten von Solarpanels.",
    learnings:
      "Vertiefung objektorientierter Entwurfsmuster (OOP) und mathematischer Berechnungen in Java.",
    imageUrl: "/projects/heatcalculator.png",
    documentUrl: null,
    githubUrl: "https://git.gibb.ch/lpe149399/heatcalculatorfx",
    liveUrl: null,
  },
  {
    id: "docker-minecraft",
    title: "Docker Minecraft Server",
    category: "Gibb",
    tags: "Docker,Docker-Compose",
    description:
      "Infrastruktur-Projekt mit Live-3D-Webmap der Minecraft-Welt.",
    initialSituation:
      "Automatisierte Bereitstellung eines performanten Minecraft-Server-Setups inklusive Zusatzdiensten.",
    technologies: "Docker, Docker Compose, Linux, Bash Scripting",
    implementation:
      "Erstellung eines Docker-Compose-Setups zur Orchestrierung des Servers und Einbindung eines Live-3D-Renderers.",
    results:
      "Containerisiertes, portables Server-Setup mit interaktiver 3D-Webansicht der Spielwelt im Browser.",
    learnings:
      "Container-Orchestrierung, Volume-Management und Netzwerk-Isolation mit Docker Compose.",
    imageUrl: "/projects/docker-minecraft.png",
    documentUrl: null,
    githubUrl: "https://git.gibb.ch/lpe149399/modul347projektt2",
    liveUrl: null,
  },
  {
    id: "codecloud",
    title: "Code Cloud",
    category: "Ük",
    tags: "React Native,JavaScript,API,Mobile,Frontend",
    description:
      "Wetter-App mit dynamischem Hintergrund je nach Tageszeit (ÜK 335).",
    initialSituation:
      "Ansprechende mobile Visualisierung von Wetterdaten im Rahmen des überbetrieblichen Kurses ÜK 335.",
    technologies: "React Native, Expo, JavaScript, OpenWeatherMap API",
    implementation:
      "Entwicklung einer Cross-Platform Mobile App mit React Native, Anbindung an eine Open-Weather-API und dynamischen Theme-Wechseln.",
    results:
      "Funktionale Wetter-App, deren Layout sich automatisch an Tageszeiten anpasst.",
    learnings:
      "Grundlagen der mobilen App-Entwicklung mit React Native und Gerätesensor-/Zeit-Logiken.",
    imageUrl: "/projects/codecloud.png",
    documentUrl: null,
    githubUrl: null,
    liveUrl: null,
  },
];

for (const project of projects) {
  await prisma.project.upsert({
    where: { id: project.id },
    update: project,
    create: project,
  });
}

  const documents = [
    {
      id: "knw106",
      title: "KNW106 Zertifikat",
      category: "zertifikate",
      fileUrl: "/documents/KNW106_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw187",
      title: "KNW187 bwd Zertifikat",
      category: "zertifikate",
      fileUrl: "/private/documents/KNW187_bwd_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw210",
      title: "KNW210 Zertifikat",
      category: "zertifikate",
      fileUrl: "/private/documents/KNW210_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw294",
      title: "KNW294 Zertifikat",
      category: "zertifikate",
      fileUrl: "/private/documents/KNW294_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw295",
      title: "KNW295 Zertifikat",
      category: "zertifikate",
      fileUrl: "/private/documents/KNW295_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw335",
      title: "KNW335 Zertifikat",
      category: "zertifikate",
      fileUrl: "/private/documents/KNW335_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "kursbestaetigung-praxistraining",
      title: "Kursbestätigung Praxistraining",
      category: "zertifikate",
      fileUrl: "/private/documents/Kursbestätigung_Praxistraining_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "lebenslauf",
      title: "Lebenslauf (CV)",
      category: "lebenslauf",
      fileUrl: "/private/documents/Lebenslauf_Pérez_Loris.pdf",
      fileSize: "1.2 MB",
    },
    {
      id: "zeugnis-bwd-bm",
      title: "Zeugnis bwd Berufsmaturität (IM24A)",
      category: "zeugnisse",
      fileUrl:
        "/private/documents/Zeugnis_bwd_IM24A_Perez_Loris_Zeugnis_Berufsmaturität.pdf",
      fileSize: "850 KB",
    },
    {
      id: "zeugnis-gibb-informatik",
      title: "Zeugnis gibb Informatik (IM24A)",
      category: "zeugnisse",
      fileUrl:
        "/private/documents/Zeugnis_gibb_IM24A_Perez_Loris_Zeugnis_Informatik.pdf",
      fileSize: "850 KB",
    },
  ];
  for (const doc of documents) {
    await prisma.document.upsert({
      where: { id: doc.id },
      update: doc,
      create: doc,
    });
  }

  await prisma.language.deleteMany();

  const languages = [
    {
      name: "Deutsch",
      level: "Muttersprache",
      flagUrl: "/flags/deutsch.jpg",
      order: 1,
    },
    { name: "Englisch",
      level: "C1", 
      flagUrl: "/flags/englisch.jpg", 
      order: 2 },
    {
      name: "Französisch",
      level: "Gutes Verständnis",
      flagUrl: "/flags/franzoesisch.jpg",
      order: 3,
    },
    {
      name: "Italienisch",
      level: "Gutes Verständnis",
      flagUrl: "/flags/italienisch.jpg",
      order: 4,
    },
  ];

  for (const lang of languages) {
    await prisma.language.create({ data: lang });
  }

  console.log("Seeding mit Links und aufgeräumten Tags erfolgreich!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
