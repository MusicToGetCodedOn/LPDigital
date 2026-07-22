const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // 1. Admin User Seeding
  const username = process.env.PORTFOLIO_USERNAME || "admin";
  const rawPassword =
    process.env.PORTFOLIO_PASSWORD || "meinSicheresPasswort123";
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
      shortDesc:
        "SoundScope ist eine Musik-Tracking-App zur Analyse von Spotify-Hörgewohnheiten und Metriken.",
      problem:
        "Bedarf an tieferen Einblicken in das eigene Hörverhalten und Echtzeit-Metriken über das Standard-Spotify-Profil hinaus.",
      solution:
        "Entwicklung einer Web-Anwendung mit React im Frontend und Node.js im Backend, die über OAuth 2.0 an die Spotify Web API angebunden ist.",
      result:
        "Umfassende Visualisierung von Hördaten, Top-Künstlern und präferierten Genres.",
      imageUrl: "/projects/soundscope.png",
      githubUrl: "https://github.com/MusicToGetCodedOn/Sound_Scope",
      liveUrl: null,
    },
    {
      id: "lpfinance",
      title: "LPFinance",
      category: "Gibb",
      tags: ".NET MAUI,C#,Frontend ",
      shortDesc:
        "Elegante Buchhaltungs-Anwendung für Finanzen und Budgetierung, welche ich vom Modul 322 aus gemacht habe.",
      problem:
        "Bedarf an einer nativen, schnellen Desktop-Anwendung zur persönlichen Finanzverwaltung ohne komplexe Cloud-Abhängigkeiten.",
      solution:
        "Entwicklung einer modernen Benutzeroberfläche mit .NET MAUI für plattformübergreifende Performance.",
      result:
        "Ein lokales Finanz-Dashboard mit strukturierter Spesenkontrolle, Ausgaben-Tracking und einfacher Budgetübersicht.",
      imageUrl: "/projects/lpfinance.png",
      githubUrl: "https://github.com/MusicToGetCodedOn/LPFinance",
      liveUrl: null,
    },
    {
      id: "gamebase",
      title: "Gamebase",
      category: "Gibb",
      tags: "React,Node.js,JavaScript,API,Fullstack",
      shortDesc:
        "Game-Tracking-Plattform nach dem Vorbild von IGDB mit Bewertungen und Spielelisten. Dieses Projekt ist aus der Abschlussarbeit des Moduls 293",
      problem:
        "Verwaltung von eigenen Spielelisten und Entdecken neuer Spiele in einer zentralen Hub.",
      solution:
        "Frontend-Anwendung in React mit Integration der Twitch API / IGDB-Datenbank zur Anzeige von Spieledaten und Bewertungen.",
      result:
        "Eine interaktive Plattform zum Bewerten von Videospielen und Verwalten persönlicher Backlogs.",
      imageUrl: "/projects/gamebase.png",
      githubUrl: "https://github.com/MusicToGetCodedOn/Gamebase-frontend",
      liveUrl: "https://gamebase-frontend.vercel.app/",
    },
    {
      id: "district37",
      title: "District37",
      category: "Privat",
      tags: "React,Node.js,JavaScript,MongoDB,Fullstack",
      shortDesc:
        "eine fast vollständige Barber-Website mit Terminbuchung und Admin-Dashboard.",
      problem:
        "Ein Barbershop benötigte einen modernen Webauftritt mit Online-Terminvergabe und geschütztem Verwaltungsbereich.",
      solution:
        "Fullstack-Webanwendung mit React-Frontend, Node.js/Express-Backend und MongoDB als Datenbank.",
      result:
        "Echtzeit-Terminbuchungssystem, Preisübersicht und ein funktionales Admin-Dashboard.",
      imageUrl: "/projects/district37.png",
      githubUrl: "https://github.com/MusicToGetCodedOn/District37",
      liveUrl: null,
    },
    {
      id: "vortex",
      title: "Vortex",
      category: "Privat",
      tags: "Python,AI,TTS",
      shortDesc: "Intelligenter Sprachassistent inspiriert von JARVIS.",
      problem:
        "Automatisierung von Systembefehlen und Sprachsteuerung für das persönliche Workspace-Setup.",
      solution:
        "Prototypisierung eines Sprachassistenten mit Spracherkennungs-Algorithmen und Anbindung an lokale Steuerungs-Schnittstellen.",
      result:
        "Ein funktionaler Sprachassistent zur Ausführung von Befehlen und Abfrage von System-Informationen.",
      imageUrl: "/projects/vortex.png",
      githubUrl: "https://github.com/MusicToGetCodedOn/Vortex",
      liveUrl: null,
    },
    {
      id: "pcmatch",
      title: "PCMatch",
      category: "Gibb",
      tags: "React,JavaScript,Frontend",
      shortDesc:
        "PCMatch ist eine moderne, interaktive Webanwendung auf Basis von React und Vite, die Nutzer dabei unterstützt, PC-Hardwarekomponenten auszuwählen, zu vergleichen und miteinander zu konfigurieren.",
      problem:
        "Die Zusammenstellung eines eigenen PCs oder das Upgrade bestehender Hardware ist oft komplex, unübersichtlich und fehleranfällig. Einsteiger sowie fortgeschrittene Nutzer stehen vor der Herausforderung, aus einer Vielzahl von Komponenten die richtigen Teile auszuwählen und deren Kompatibilität (z. B. Vermeidung von Bottlenecks) sicherzustellen.",
      solution:
        "PCMatch bietet eine intuitive Benutzeroberfläche zur Exploration von Hardware-Spezifikationen kombiniert mit einem intelligenten Konfigurationsassistenten. Unter Einsatz moderner Webtechnologien wie React, TypeScript, Framer Motion und React Router entsteht eine performante, dynamische Plattform, die den Zusammenstellungsprozess vereinfacht und zugänglich macht.",
      result:
        "Eine funktionale, reaktive Single-Page-Application mit flüssigen Animationen, klaren Navigationsstrukturen und einem optimierten Development- bzw. Build-Prozess durch Vite und ESLint, die Benutzern eine mühelose Hardware-Konfiguration ermöglicht.",
      imageUrl: "/projects/pcmatch.png",
      githubUrl: "https://github.com/MusicToGetCodedOn/PCMatch",
      liveUrl: null,
    },
    {
      id: "stalkr",
      title: "Stalkr",
      category: "Gibb",
      tags: "React,Docker,Node.js,Fullstack,Typescript",
      shortDesc:
        "Minecraft Server-Dashboard mit Live-Weltkarte, Konsole und Spielerverwaltung.",
      problem:
        "Vereinfachte Steuerung und Überwachung eines lokal gehosteten Minecraft-Servers über eine Weboberfläche.",
      solution:
        "Anbindung der Docker-Container-Schnittstelle an ein React-Dashboard mit Live-RCON-Konsole und Map-Integration.",
      result:
        "Zentrale Verwaltungsoberfläche für Docker-Minecraft-Instanzen mit Echtzeit-Statusüberwachung.",
      imageUrl: "/projects/stalkr.png",
      githubUrl: "https://github.com/kiraa1q/stalkr",
      liveUrl: null,
    },
    {
      id: "heatcalculator",
      title: "HeatCalculator",
      category: "Gibb",
      tags: "Java,OOP,Frontend ",
      shortDesc:
        "Schulprojekt zur Berechnung der Solarpanel-Leistung je nach Installationstyp.",
      problem:
        "Berechnung des Energieertrags von Photovoltaikanlagen unter Berücksichtigung verschiedener Montagearten.",
      solution:
        "Entwicklung einer Java-Anwendung mit objektorientierter Architektur zur Erfassung von Grid-, Roof- und Slope-Installationen.",
      result:
        "Präzises Berechnungstool zur Ermittlung von Effizienz und Leistungswerten von Solarpanels.",
      imageUrl: "/projects/heatcalculator.png",
      githubUrl: "https://git.gibb.ch/lpe149399/heatcalculatorfx",
      liveUrl: null,
    },
    {
      id: "docker-minecraft",
      title: "Docker Minecraft Server",
      category: "Gibb",
      tags: "Docker,Docker-Compose",
      shortDesc: "Infrastruktur-Projekt mit Live-3D-Webmap der Minecraft-Welt.",
      problem:
        "Automatisierte Bereitstellung eines performanten Minecraft-Server-Setups inklusive Zusatzdiensten.",
      solution:
        "Erstellung eines Docker-Compose-Setups zur Orchestrierung des Servers und Einbindung eines Live-3D-Renderers.",
      result:
        "Containerisiertes, portables Server-Setup mit interaktiver 3D-Webansicht der Spielwelt im Browser.",
      imageUrl: "/projects/docker-minecraft.png",
      githubUrl: "https://git.gibb.ch/lpe149399/modul347projektt2",
      liveUrl: null,
    },
    {
      id: "codecloud",
      title: "Code Cloud",
      category: "Ük",
      tags: "React Native,JavaScript,API,Mobile,Frontend",
      shortDesc: "Wetter-App mit dynamischem Hintergrund je nach Tageszeit.",
      problem:
        "Ansprechende mobile Visualisierung von Wetterdaten im Rahmen des überbetrieblichen Kurses ÜK 335.",
      solution:
        "Entwicklung einer Cross-Platform Mobile App mit React Native, Anbindung an eine Open-Weather-API und dynamischen Theme-Wechseln.",
      result:
        "Funktionale Wetter-App, deren Layout sich automatisch an Tageszeiten anpasst.",
      imageUrl: "/projects/codecloud.png",
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
      fileUrl: "/documents/KNW187_bwd_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw210",
      title: "KNW210 Zertifikat",
      category: "zertifikate",
      fileUrl: "/documents/KNW210_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw294",
      title: "KNW294 Zertifikat",
      category: "zertifikate",
      fileUrl: "/documents/KNW294_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw295",
      title: "KNW295 Zertifikat",
      category: "zertifikate",
      fileUrl: "/documents/KNW295_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "knw335",
      title: "KNW335 Zertifikat",
      category: "zertifikate",
      fileUrl: "/documents/KNW335_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "kursbestaetigung-praxistraining",
      title: "Kursbestätigung Praxistraining",
      category: "zertifikate",
      fileUrl: "/documents/Kursbestätigung_Praxistraining_Pérez_Loris.pdf",
      fileSize: "1.0 MB",
    },
    {
      id: "lebenslauf",
      title: "Lebenslauf (CV)",
      category: "lebenslauf",
      fileUrl: "/documents/Lebenslauf_Pérez_Loris.pdf",
      fileSize: "1.2 MB",
    },
    {
      id: "zeugnis-bwd-bm",
      title: "Zeugnis bwd Berufsmaturität (IM24A)",
      category: "zeugnisse",
      fileUrl:
        "/documents/Zeugnis_bwd_IM24A_Perez_Loris_Zeugnis_Berufsmaturität.pdf",
      fileSize: "850 KB",
    },
    {
      id: "zeugnis-gibb-informatik",
      title: "Zeugnis gibb Informatik (IM24A)",
      category: "zeugnisse",
      fileUrl:
        "/documents/Zeugnis_gibb_IM24A_Perez_Loris_Zeugnis_Informatik.pdf",
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
