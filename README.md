# pravin.dev

> *Senior Software Engineer | Distributed Systems | Cloud Infrastructure*

Hey! 👋 Welcome to my little corner of the internet.

This repository hosts my personal portfolio website. It's designed to be a dual-purpose platform: a professional snapshot of my work (so I don't have to keep emailing PDFs) and a playground for small developer tools I build when I'm bored or need to solve a specific problem.

## 🛠 What's Under the Hood?

I kept the stack intentionally simple. No heavy hydration, no complex state management—just speed.

*   **Core:** Semantic HTML5 & Vanilla JavaScript (ES6+).
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (compiled via CLI).
*   **Hosting:** GitHub Pages.
*   **Vibe:** Dark mode, terminal-inspired, "developer-first".

## 🚀 Running Locally

If you want to fork this, fix a typo, or just see how the Tailwind v4 setup works, here's the drill:

1.  **Clone it:**
    ```bash
    git clone https://github.com/pravinkanna/pravinkanna.github.io.git
    cd pravinkanna.github.io
    ```

2.  **Install dependencies:**
    (It's basically just Tailwind and a few dev tools)
    ```bash
    npm install
    ```

3.  **Start Dev Mode:**
    This watches for changes in `src/input.css` or the HTML files and recompiles on the fly.
    ```bash
    npm run watch
    ```
    *Note: You'll need a simple static server to view it (like Live Server in VS Code or `python3 -m http.server`).*

4.  **Build for Production:**
    Minifies the CSS for the real world.
    ```bash
    npm run build
    ```

## 🧰 The Tools Section

I've added a `/tools` directory for standalone utilities. Currently includes:
*   **Wealth Journey:** A SIP/investment visualizer (because spreadsheets get boring).
*   **JSON Editor:** Quick formatting and minifying without sending data to a random server.
*   **MongoID Converter:** Extract timestamps from ObjectIDs without doing mental math.

## 📄 License

The content (bio, photos, text) is mine, but the code is [MIT](./LICENSE). Feel free to fork it, learn from it, or use it as a template—just please remember to swap out my name and face before you deploy! 😉
