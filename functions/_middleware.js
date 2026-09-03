// Cloudflare Pages Edge Middleware for Password Protection

const VALID_PASSPHRASES = [
  "I wanna invest!",
  "iwannainvest!",
  "I wanna invest",
  "take my money!",
  "takemymoney!",
  "take my money",
  "investnow!",
  "shut up and take my money!",
  "watch trees grow",
  "watch-trees-grow",
  "Money actually grows on trees",
  "money actually grows on trees",
  "money-grows-on-trees",
  "trees pay dividends",
  "trees-pay-dividends",
  "canopy is capital",
  "canopy-is-capital"
];

const AUTH_COOKIE_NAME = "arbor_invest_auth";
const AUTH_COOKIE_VALUE = "authenticated_arbor_investor_2026";

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Handle Login Form Submission (POST)
  if (request.method === "POST" && url.pathname === "/_login") {
    try {
      const bodyText = await request.text();
      const params = new URLSearchParams(bodyText);
      const passphrase = (params.get("passphrase") || "").trim();

      if (VALID_PASSPHRASES.includes(passphrase) || VALID_PASSPHRASES.includes(passphrase.toLowerCase())) {
        // Set Auth Cookie and Redirect to Cover Slide
        return new Response(null, {
          status: 302,
          headers: {
            "Location": "/",
            "Set-Cookie": `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`, // 30 days
          },
        });
      } else {
        return new Response(renderLoginPage("Invalid passphrase. Try: I wanna invest!"), {
          status: 401,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
    } catch (e) {
      return new Response(renderLoginPage("An error occurred during authentication."), {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  }

  // Handle Logout (Optional)
  if (url.pathname === "/_logout") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
        "Set-Cookie": `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; Secure; Max-Age=0`,
      },
    });
  }

  // Check if Cookie is Valid
  const cookieHeader = request.headers.get("Cookie") || "";
  const isAuthenticated = cookieHeader.includes(`${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}`);

  if (isAuthenticated) {
    // User is authenticated -> Pass through to static asset (Slidev Deck)
    return context.next();
  }

  // Unauthenticated -> Render Arbor Branded Password Gate
  return new Response(renderLoginPage(), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function renderLoginPage(errorMsg = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Arbor Insight — Investor Presentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-aztec: #161D1C;
      --green-light: #DAE98A;
      --green-dark: #0B5149;
      --accent-orange: #F05002;
      --text-white: #F3F3F2;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
      background-color: var(--bg-aztec);
      color: var(--text-white);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      background-color: rgba(11, 81, 73, 0.25);
      border: 1px solid rgba(218, 233, 138, 0.3);
      border-radius: 1rem;
      padding: 2.5rem 2rem;
      max-width: 420px;
      width: 100%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: rgba(240, 80, 2, 0.2);
      border: 1px solid rgba(240, 80, 2, 0.4);
      color: var(--accent-orange);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-white);
      letter-spacing: -0.025em;
      margin-bottom: 0.25rem;
    }
    p.sub {
      font-size: 0.875rem;
      color: var(--green-light);
      font-weight: 500;
      margin-bottom: 2rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input[type="password"] {
      width: 100%;
      padding: 0.875rem 1rem;
      background-color: rgba(22, 29, 28, 0.9);
      border: 1px solid rgba(11, 81, 73, 0.8);
      border-radius: 0.5rem;
      color: var(--text-white);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus {
      border-color: var(--green-light);
    }
    button {
      width: 100%;
      padding: 0.875rem 1rem;
      background-color: var(--green-light);
      color: var(--bg-aztec);
      border: none;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
    }
    button:hover {
      background-color: #e5f299;
    }
    button:active {
      transform: scale(0.98);
    }
    .error {
      background-color: rgba(240, 80, 2, 0.15);
      border: 1px solid rgba(240, 80, 2, 0.5);
      color: #ff8a65;
      padding: 0.625rem;
      border-radius: 0.375rem;
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
    .footer {
      margin-top: 2rem;
      font-size: 0.75rem;
      color: rgba(243, 243, 242, 0.4);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Confidential Pitch Deck</div>
    <h1>ARBOR INSIGHT</h1>
    <p class="sub">Geospatial Intelligence Engine</p>
    
    ${errorMsg ? `<div class="error">${errorMsg}</div>` : ""}

    <form action="/_login" method="POST">
      <input type="password" name="passphrase" placeholder="Enter passphrase" required autofocus autocomplete="current-password">
      <button type="submit">Access Investor Deck &rarr;</button>
    </form>

    <div class="footer">
      Protected Access • Arbor Insight Inc. (Delaware C-Corp)
    </div>
  </div>
</body>
</html>`;
}
