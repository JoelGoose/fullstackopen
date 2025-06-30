Exercise 0.4 New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server->>browser: URL redirect to /exampleapp/notes, HTML Document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: /exampleapp/main.css file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server->browser: /exampleapp/main.js file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: /exampleapp/data.json file
```

Exercise 0.5 Single app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: HTML Document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: /exampleapp/main.css file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->browser: /exampleapp/spa.js file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: /exampleapp/data.json file
```

Exercise 0.6 New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: POST /exampleapp/new_note_spa
    server->>browser: responds "note created"
