# EchoCapsule

EchoCapsule is an open-source platform for collaborative digital time capsules and scheduled reveals.

## Implemented foundation

- server-time collection, seal and open transitions;
- private per-author contributions;
- authenticated encryption at seal;
- deterministic content commitments and capsule manifest;
- membership-gated reveal with integrity verification;
- initial schema, HTTP validation and tests.

The seal is enforced by the application. An instance operator with storage and secret access may be able to inspect content. This project does not claim a mathematical time lock or zero-knowledge storage.

## Run locally

```sh
npm install
CAPSULE_SECRET=replace-with-a-long-local-secret npm run dev
npm test
```

Open http://localhost:3106. Losing the configured secret makes sealed data unrecoverable.

## License

MIT

