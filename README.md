# prog1-2023-shell
This repo branch contains the shell for program 1 from cg class 2023 at nc state (ray tracing ellipsoids).

## Running locally

This project loads scene data (`ellipsoids.json`, `lights.json`, `triangles.json`, etc.) via
`fetch()`/`XMLHttpRequest`, which browsers block under the `file://` protocol due to CORS
restrictions. Opening `index.html` by double-clicking it will **not** work — the JSON loads
will silently fail. Instead, serve the folder with the VS Code "Live Server" extension:

1. Install the "Live Server" extension in VS Code (by Ritwick Dey), if not already installed.
2. Right-click `index.html` in the VS Code file explorer.
3. Select "Open with Live Server".
4. This opens the page at a local address (usually `http://127.0.0.1:5500`) with CORS-safe
   `fetch()` access to any JSON files in the project folder.

`index.html` sits at the project root so Live Server serves it correctly by default.
