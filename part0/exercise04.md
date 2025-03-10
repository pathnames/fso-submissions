sequenceDiagram
    participant browser
    participant server

    browser->>server: POST /exampleapp/new_note
    Note right of browser: { "note": "note_data" }
    server-->>browser: 302 Found \nLocation: /exampleapp/notes
    browser->>server: GET /exampleapp/notes
    server-->>browser: 200 OK (HTML content)
    
    browser->>server: GET /exampleapp/main.css
    server-->>browser: 200 OK (CSS file)
    
    browser->>server: GET /exampleapp/main.js
    server-->>browser: 200 OK (JavaScript file)
    
    browser->>server: GET /exampleapp/data.json
    server-->>browser: 200 OK (Notes data in JSON)
    
    browser->>server: GET /favicon.ico
    server-->>browser: 404 Not Found
