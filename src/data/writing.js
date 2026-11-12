const writing = [
  {
    "id": "rules-not-ml",
    "project": "PDG",
    "title": "Why PDG scores risk with rules, not a model",
    "summary": "No labeled data meant a model would give a confident number backed by nothing real. Here is what I built instead, and what it costs.",
    "source": "PDG docs/adr/0006 and 0007",
    "body": [
      "When I started PDG, the obvious move was to train a model to score how risky an app or event is. I decided against it for the first version, for one reason: there was no labeled data. I had no collection of confirmed-malicious and confirmed-benign apps that matched what this product's users would actually see. A model trained on borrowed or synthetic data would still output a confident number, and that number would be backed by nothing real.",
      "Instead, every event is scored by independent, versioned rules. Each rule reports whether it matched, a weight, and the evidence it used. The score is the sum of the matched weights, clamped to 0–100 and mapped to a severity band. A separate confidence value drops when expected evidence is missing, such as signing-certificate data. Every rule evaluation is stored, not just the final score, so a verdict can be reconstructed later.",
      "The same thinking applies to the AI features. The Claude API runs only after the engine has already computed score, severity and confidence, only from the backend, and only on that finished result plus its evidence. It never sees credentials or account data. A manipulated response can at worst produce a confusing explanation; it cannot change the severity a user sees. If the API is down or no key is configured, a template explanation takes over.",
      "The cost is real: rules will not catch genuinely novel attacks the way a well-trained model might. I would revisit machine learning once real labeled outcomes exist to train against. Until then I would rather ship a score I can fully explain."
    ]
  },
  {
    "id": "refresh-tokens",
    "project": "PDG",
    "title": "Refresh tokens: rotation, reuse detection and where to keep them",
    "summary": "Short-lived JWTs are fast but can't be revoked. Moving revocation to the refresh token fixes that, and where you store it matters as much.",
    "source": "PDG docs/adr/0004 and 0005",
    "body": [
      "Short-lived JWT access tokens are fast to verify because no database lookup is needed, but they cannot be revoked. PDG puts revocation on the refresh token instead. Access tokens last about 15 minutes. Refresh tokens are opaque values stored hashed in Postgres, so each session can be listed and revoked on its own.",
      "Refresh tokens rotate on every use. If one is used a second time, for example because it was stolen and both the attacker and the real user try it, PDG revokes the whole session chain instead of quietly issuing new tokens. A stolen token goes from \"works silently forever\" to \"detectable, and it shuts the session down\".",
      "For the web client, where the token lives matters as much. The access token stays in memory only, and the refresh token travels in an HttpOnly, Secure, SameSite=Strict cookie. An XSS bug can no longer steal a long-lived refresh token, and Strict also covers CSRF on the refresh and logout endpoints without a separate token scheme.",
      "The lesson that stuck: the rotation logic had to be written separately for Android, the Windows agent and the browser extension, and the same rotation-persistence bug turned up independently in all three during review. Security logic that is reimplemented per client needs its own tests per client."
    ]
  },
  {
    "id": "browser-vault",
    "project": "AI Privacy Guardian",
    "title": "Encrypting a password vault in the browser",
    "summary": "The server should never be able to read a saved password. How the vault and the breach check keep secrets on the device.",
    "source": "web/src/lib/vaultCrypto.ts and pwnedPasswords.ts",
    "body": [
      "In AI Privacy Guardian's vault, the server should never be able to read a saved password. So encryption happens in the browser with the Web Crypto API, before anything is uploaded.",
      "The master password goes through PBKDF2 with SHA-256 and 100,000 iterations, using a random 16-byte salt, to derive a 256-bit AES-GCM key. Each entry is encrypted with that key and a fresh random 12-byte IV. The server stores only ciphertext and the values needed to decrypt it with the master password, which it never receives.",
      "The breach check follows the same principle. The password is hashed with SHA-1 in the browser and only the first five characters are sent to the Have I Been Pwned range API. The browser compares the returned suffixes itself, so neither the password nor its full hash leaves the page.",
      "Two honest limits. 100,000 iterations is what the code uses today, while current OWASP guidance for PBKDF2 with SHA-256 is 600,000, so raising it is on my list. And this protects stored data from the server, not from malware or an XSS bug in the page itself."
    ]
  },
  {
    "id": "hash-prefix",
    "project": "PhishGuard",
    "title": "Checking URLs without telling the server which one",
    "summary": "A phishing blocklist that never learns what you browse: hash prefixes, exact matching and opt-in extras.",
    "source": "phishguard-server/README.md and phishguard/store/PRIVACY.md",
    "body": [
      "A phishing blocklist is useful, but the obvious design, sending every URL you visit to a server and asking whether it is bad, means the server learns your browsing history. PhishGuard's server never sees a hostname.",
      "The extension hashes the hostname with SHA-256 and sends only the first 16 bits, four hex characters. The server returns every blocklisted hash that shares that prefix, and the extension compares the full hashes locally. Many unrelated hosts share any given prefix, so the server cannot tell which site was visited. The blocklist itself stores hashes, not hostnames.",
      "Two more choices keep the promise honest. Matching is on exact hostnames, and feed entries on big shared domains such as google.com or link shorteners are skipped, because otherwise blocking one page would block everything on that host. And the domain-age check is a separate opt-in, because it has to send domain names and the RDAP lookup sees them too.",
      "The limits are written down rather than hidden: a 16-bit prefix still narrows things a little, and the RDAP step reveals domains to rdap.org unless you self-host a bootstrap."
    ]
  }
];

export default writing;
