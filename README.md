# EchoCapsule

**A shared message across time.** Collect private contributions from a group, seal them together
and return when the chosen reveal moment arrives.

EchoCapsule is an open-source platform for collaborative digital time capsules. Participants add
messages before a deadline; sealing encrypts final card versions and creates a deterministic
manifest; authorized members can reveal and verify cards only after the configured open time.

> **Project status: early foundation.** Server-time lifecycle transitions, authenticated
> encryption, deterministic manifests and verified reveal are implemented and tested. The
> remaining work is tracked in the [ticket index](docs/TICKETS.md): approximately 10% of the
> planned product is complete.

The seal is enforced by the application. An instance operator with storage and secret access may
be able to inspect content. The project does not claim a mathematical time lock or zero-knowledge
storage.

## Project status

| Area | Status | Tickets |
| --- | --- | --- |
| Repository standards, MIT license and continuous checks | Implemented | Foundation |
| Collecting, sealed and open lifecycle | Implemented | Foundation |
| Private per-author contribution replacement | Implemented | Foundation |
| Authenticated encryption at seal | Implemented | Foundation |
| Deterministic manifest and verified reveal | Implemented | Foundation |
| Accounts, durable vault and key operations | Pending | EC-101 – EC-103 |
| Capsule creation, lifecycle and membership | Pending | EC-104 – EC-107 |
| Prompts, cards and encrypted attachments | Pending | EC-108 – EC-113 |
| Transactional sealing and verification | Pending | EC-114 – EC-116 |
| Waiting room and reveal experiences | Pending | EC-117 – EC-121 |
| Predictions, replies, archive and export | Pending | EC-122 – EC-125 |
| Public sharing, safety and release readiness | Pending | EC-126 – EC-130 |

## Quick start

Requirements: Node.js 22 or later and npm.

    npm install
    CAPSULE_SECRET=replace-with-a-long-local-secret npm run dev

Open:

- Web: <http://localhost:3106>
- Health endpoint: <http://localhost:3106/api/health>

Use a stable local secret between restarts. Losing the configured secret makes sealed data
unrecoverable once durable storage is connected.

## Demo access (development only)

No account system or credentials exist yet. Capsule creation and safe status inspection are exposed
for local foundation testing. Contribution and reveal membership are currently exercised through
the domain tests; authenticated membership is tracked by EC-101, EC-106 and EC-107.

## Commands

| Command | What it does |
| --- | --- |
| npm run dev | Start the local server with file watching |
| npm test | Run lifecycle, encryption and request tests |
| npm run typecheck | Check strict TypeScript |
| npm run build | Compile the production server into dist |
| npm start | Run the compiled server |

## Tech stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript in strict mode on Node.js 22+ |
| API | Express 5 with zod request validation |
| Data model | PostgreSQL forward migration for capsules, cards and manifests |
| Security | Node authenticated encryption and SHA-256 content commitments |
| Web | Accessible static foundation page served by Express |
| Tests | Vitest and Supertest with an injectable clock |
| Checks | GitHub Actions for type checks, tests and sensitive-data scanning |

## Repository layout

    echocapsule/
    ├── src/
    │   ├── app.ts             capsule creation and safe-status boundary
    │   ├── domain.ts          lifecycle, encryption and reveal rules
    │   └── server.ts          configured process entry point
    ├── test/                  timing, encryption and request tests
    ├── migrations/            capsule, membership, card and manifest schema
    ├── public/                initial capsule landing page
    ├── docs/
    │   ├── ARCHITECTURE.md    lifecycle and key-handling boundaries
    │   ├── ROADMAP.md         milestone sequence
    │   └── TICKETS.md         complete implementation index
    └── .github/               checks and issue template

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Delivery roadmap](docs/ROADMAP.md)
- [Implementation ticket index](docs/TICKETS.md)
- [Product requirements](https://github.com/mayur19/echocapsule/issues/1)
- [Public issue tracker](https://github.com/mayur19/echocapsule/issues)

## Known limitations

- Capsules are held in process memory and clear on restart.
- Accounts, invitations, prompts, media and durable transactions are pending.
- The HTTP surface does not expose contribution or reveal routes yet.
- Hosted sequence, future replies and keepsake export are not built.
- Long-term retention depends on instance backups and key preservation.

## Contributing, security and license

- [Contributing guide](CONTRIBUTING.md): workflow and verification expectations.
- [Security policy](SECURITY.md): private vulnerability reporting.
- [Community conduct](CODE_OF_CONDUCT.md).
- Licensed under the [MIT License](LICENSE).

