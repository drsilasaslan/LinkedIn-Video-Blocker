# LinkedIn-Video-Blocker

Eine Chrome-Erweiterung, die Video-Posts auf LinkedIn komplett ausblendet für ein ablenkungsfreies Erlebnis.

## Funktionen

- Blendet Posts mit Videos komplett aus dem LinkedIn-Feed aus
- Einfach zu aktivieren und deaktivieren über die Popup-Oberfläche
- Funktioniert mit dynamisch geladenen Inhalten
- Erkennt verschiedene Arten von LinkedIn-Video-Posts
- Zeigt Posts wieder an, wenn der Blocker deaktiviert wird

## Installation

1. Laden Sie die Erweiterung herunter oder klonen Sie dieses Repository
2. Öffnen Sie Chrome und navigieren Sie zu `chrome://extensions/`
3. Aktivieren Sie den "Entwicklermodus" oben rechts
4. Klicken Sie auf "Entpackte Erweiterung laden"
5. Wählen Sie den Ordner mit der heruntergeladenen Erweiterung aus

## Nutzung

Klicken Sie einfach auf das LinkedIn Video Blocker-Symbol in Ihrer Chrome-Symbolleiste und aktivieren Sie den Blocker mit einem Klick auf die Schaltfläche. Die Erweiterung blendet dann alle Posts mit Videos im LinkedIn-Feed aus.

## Bugs
- **Langsame Ladezeiten**: Manchmal kann es vorkommen, dass Filme oder Inhalte etwas länger zum Laden benötigen.
- **Automatisches Laden der neuesten Beiträge**: In einigen Fällen werden die neuesten Beiträge nicht automatisch geladen. Falls das passiert, kann man einfach auf **"Weitere Beiträge anzeigen"** klicken, um die neuesten Inhalte manuell zu laden.
- **Unregelmäßiges Auftreten**: Diese Probleme treten nicht immer auf, sondern nur gelegentlich. Insgesamt funktioniert die Erweiterung jedoch stabil und zuverlässig.

## Technische Details

Die Erweiterung nutzt folgende Technologien und Methoden:

- **DOM-Manipulation**: Erkennt und entfernt Video-Posts aus dem LinkedIn-Feed
- **MutationObserver**: Überwacht dynamisch geladene Inhalte für kontinuierliche Filterung
- **Multiple Erkennungsmethoden**: Identifiziert Video-Posts anhand verschiedener DOM-Strukturen und Attribute
- **Chrome Storage API**: Speichert den Aktivierungsstatus der Erweiterung

## Projektstruktur

```
LinkedIn-Video-Blocker/
├── manifest.json       # Erweiterungskonfiguration
├── popup.html         # Popup-UI
├── popup.js          # Popup-Logik
├── content.js        # Hauptlogik für Videoerkennung und -filterung
├── blocker.css       # CSS für ausgeblendete Posts
└── images/           # Icons und Grafiken
```

## Entwicklung

Um an diesem Projekt mitzuarbeiten:

1. Forken Sie das Repository
2. Nehmen Sie Ihre Änderungen vor
3. Erstellen Sie einen Pull Request

## Lizenz

MIT
