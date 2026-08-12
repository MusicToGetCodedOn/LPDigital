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
      "SoundScope ist eine Musik-Tracking-App zur Analyse von Spotify-Hörgewohnheiten und Metriken.",
    initialSituation:
      "Bedarf an tieferen Einblicken in das eigene Hörverhalten und Echtzeit-Metriken über das Standard-Spotify-Profil hinaus.",
    technologies: "React, Node.js, JavaScript, Express, Spotify Web API, MongoDB",
    implementation:
      "Entwicklung einer Web-Anwendung mit React im Frontend und Node.js im Backend, die über OAuth 2.0 an die Spotify Web API angebunden ist.",
    results:
      "Umfassende Visualisierung von Hördaten, Top-Künstlern und präferierten Genres.",
    learnings:
      "Vertiefung von OAuth 2.0 Authentication Flows und REST-API-Integrationen im Fullstack-Umfeld.",
    imageUrl: "/projects/soundscope.png",
    documentUrl: null,
    githubUrl: "https://github.com/MusicToGetCodedOn/Sound_Scope",
    liveUrl: null,
  },
  {
    id: "lpfinance",
    title: "LPFinance",
    category: "Gibb",
    tags: ".NET MAUI,C#,Frontend",
    description:
      "Elegante Buchhaltungs-Anwendung für Finanzen und Budgetierung aus dem Modul 322.",
    initialSituation:
      "Bedarf an einer nativen, schnellen Desktop-Anwendung zur persönlichen Finanzverwaltung ohne komplexe Cloud-Abhängigkeiten.",
    technologies: ".NET MAUI, C#, XAML",
    implementation:
      "Entwicklung einer modernen Benutzeroberfläche mit .NET MAUI für plattformübergreifende Desktop-Performance.",
    results:
      "Ein lokales Finanz-Dashboard mit strukturierter Spesenkontrolle, Ausgaben-Tracking und einfacher Budgetübersicht.",
    learnings:
      "Verständnis von nativer Desktop-Entwicklung mit XAML und C# sowie plattformspezifischen UI-Komponenten.",
    imageUrl: "/projects/lpfinance.png",
    documentUrl: null,
    githubUrl: "https://github.com/MusicToGetCodedOn/LPFinance",
    liveUrl: null,
  },
  {
    id: "gamebase",
    title: "Gamebase",
    category: "Gibb",
    tags: "React,Node.js,JavaScript,API,Fullstack",
    description:
      "Game-Tracking-Plattform nach dem Vorbild von IGDB mit Bewertungen und Spielelisten (Abschlussarbeit Modul 293).",
    initialSituation:
      "Verwaltung von eigenen Spielelisten und Entdecken neuer Spiele in einer zentralen Hub.",
    technologies: "React, JavaScript, Node.js, Twitch/IGDB API",
    implementation:
      "Frontend-Anwendung in React mit Integration der Twitch API / IGDB-Datenbank zur Anzeige von Spieledaten und Bewertungen.",
    results:
      "Eine interaktive Plattform zum Bewerten von Videospielen und Verwalten persönlicher Backlogs.",
    learnings:
      "Umgang mit komplexen externen Game-Datenbank-APIs sowie responsivem Frontend-Design.",
    imageUrl: "/projects/gamebase.png",
    documentUrl: null,
    githubUrl: "https://github.com/MusicToGetCodedOn/Gamebase-frontend",
    liveUrl: "https://gamebase-frontend.vercel.app/",
  },
  {
    id: "district37",
    title: "District37",
    category: "Privat",
    tags: "React,Node.js,JavaScript,MongoDB,Fullstack",
    description:
      "Barber-Website mit Online-Terminbuchung und geschütztem Admin-Dashboard.",
    initialSituation:
      "Ein Barbershop benötigte einen modernen Webauftritt mit Online-Terminvergabe und geschütztem Verwaltungsbereich.",
    technologies: "React, Node.js, Express, MongoDB, REST API",
    implementation:
      "Fullstack-Webanwendung mit React-Frontend, Node.js/Express-Backend und MongoDB als Datenbank.",
    results:
      "Echtzeit-Terminbuchungssystem, Preisübersicht und ein funktionales Admin-Dashboard.",
    learnings:
      "Planung und Umsetzung einer vollständigen Business-Logik inkl. Autorisierung im Backend.",
    imageUrl: "/projects/district37.png",
    documentUrl: null,
    githubUrl: "https://github.com/MusicToGetCodedOn/District37",
    liveUrl: null,
  },
  {
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
  },
  {
    id: "pcmatch",
    title: "PCMatch",
    category: "Gibb",
    tags: "React,JavaScript,Frontend",
    description:
      "Interaktive Webanwendung auf Basis von React und Vite zur Auswahl, zum Vergleich und zur Konfiguration von PC-Hardwarekomponenten.",
    initialSituation:
      "Die Zusammenstellung eines eigenen PCs oder das Upgrade bestehender Hardware ist oft komplex, unübersichtlich und fehleranfällig.",
    technologies: "React, TypeScript, Vite, Framer Motion, Tailwind CSS",
    implementation:
      "PCMatch bietet eine intuitive Benutzeroberfläche zur Exploration von Hardware-Spezifikationen kombiniert mit einem Konfigurationsassistenten unter Nutzung moderner Webtechnologien.",
    results:
      "Eine funktionale, reaktive Single-Page-Application mit flüssigen Animationen und optimiertem Build-Prozess durch Vite.",
    learnings:
      "Komplexe Zustandsverwaltung im Frontend sowie Erstellung flüssiger Benutzeroberflächen mit Framer Motion.",
    imageUrl: "/projects/pcmatch.png",
    documentUrl: null,
    githubUrl: "https://github.com/MusicToGetCodedOn/PCMatch",
    liveUrl: null,
  },
  {
    id: "stalkr",
    title: "Stalkr",
    category: "Gibb",
    tags: "React,Docker,Node.js,Fullstack,Typescript",
    description:
      "Minecraft Server-Dashboard mit Live-Weltkarte, Konsole und Spielerverwaltung.",
    initialSituation:
      "Vereinfachte Steuerung und Überwachung eines lokal gehosteten Minecraft-Servers über eine Weboberfläche.",
    technologies: "React, TypeScript, Node.js, Docker API, RCON Protocol",
    implementation:
      "Anbindung der Docker-Container-Schnittstelle an ein React-Dashboard mit Live-RCON-Konsole und Map-Integration.",
    results:
      "Zentrale Verwaltungsoberfläche für Docker-Minecraft-Instanzen mit Echtzeit-Statusüberwachung.",
    learnings:
      "Arbeit mit Socket-/RCON-Verbindungen, Docker Engine APIs und Container-Management.",
    imageUrl: "/projects/stalkr.png",
    documentUrl: null,
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
