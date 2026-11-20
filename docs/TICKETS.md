# Implementation ticket index

Full issue descriptions include acceptance criteria, dependencies and verification notes.

- [ ] EC-101 | Foundation | backend,security | Add username accounts and revocable sessions | Establish capsule membership without public private identifiers.
- [ ] EC-102 | Foundation | backend,database | Implement transactional PostgreSQL vault | Persist lifecycle, encrypted cards and manifests atomically.
- [ ] EC-103 | Foundation | security,devops | Implement secret validation and recovery runbook | Fail closed on missing keys and verify backup restoration.
- [ ] EC-104 | Capsules | backend,frontend | Build capsule creation wizard | Validate audience, timezone, deadline and reveal schedule.
- [ ] EC-105 | Capsules | backend,database | Implement lifecycle and time-change audit | Enforce collecting, sealed, open, archived and cancelled transitions.
- [ ] EC-106 | Membership | backend,security | Implement hashed invitation links | Enforce expiration, use limits, revocation and exact role.
- [ ] EC-107 | Membership | backend,frontend | Build participant management | Handle removal and explicit contribution disposition before seal.
- [ ] EC-108 | Prompts | backend,database | Implement revisioned prompts | Preserve prompt snapshots referenced by submitted cards.
- [ ] EC-109 | Prompts | frontend | Build prompt gallery and editor | Cover accepted card types, required state and per-person limits.
- [ ] EC-110 | Contributions | backend,frontend | Build text and future-question cards | Provide owner-only drafts, revisions and explicit submission.
- [ ] EC-111 | Contributions | backend,security | Add encrypted image and audio attachments | Use per-file keys, type checks, quotas and authorized download.
- [ ] EC-112 | Contributions | backend,testing | Enforce pre-open card privacy | Owners see only safe counts, type and storage metadata.
- [ ] EC-113 | Contributions | frontend | Build personal draft and submission preview | Show exactly what will enter the seal.
- [ ] EC-114 | Sealing | backend,database | Implement atomic final-version manifest | Freeze membership, prompts and card versions in one transaction.
- [ ] EC-115 | Sealing | backend,security | Implement authenticated card encryption | Remove plaintext working copies only after successful commit.
- [ ] EC-116 | Sealing | backend,testing | Build deterministic manifest verification | Detect missing, changed and reordered sealed content.
- [ ] EC-117 | Waiting | backend,frontend | Build metadata-safe waiting room | Show countdown, counts and commitments without leaking content.
- [ ] EC-118 | Waiting | backend | Add idempotent local reminders | Respect capsule and viewer timezones without external delivery claims.
- [ ] EC-119 | Opening | backend,testing | Enforce open boundary on every reveal request | Reject early, repeated and unauthorized opens.
- [ ] EC-120 | Opening | frontend | Build accessible reveal gallery | Verify each card and support late participants.
- [ ] EC-121 | Opening | backend,frontend | Implement hosted reveal cursor | Resolve concurrent advances and degrade to gallery mode.
- [ ] EC-122 | After reveal | backend,frontend | Add prediction resolution | Preserve original picks and record playful outcomes separately.
- [ ] EC-123 | After reveal | backend,frontend | Add revisioned future replies | Pair then-versus-now content without changing sealed cards.
- [ ] EC-124 | Archive | backend,frontend | Build open capsule library and freeze | Support filters, feature order and read-only archive.
- [ ] EC-125 | Export | backend,testing | Generate verified portable keepsake | Include readable index, JSON, authorized media and checksums.
- [ ] EC-126 | Public sharing | backend,security | Add explicit post-open publication review | Keep opening separate from public visibility.
- [ ] EC-127 | Safety | backend | Implement reports, cancellation and removal requests | Preserve private group history while controlling public access.
- [ ] EC-128 | Quality | testing | Automate timing, membership, seal and export journeys | Cover failure rollback, restarts and concurrent reveal.
- [ ] EC-129 | Quality | security | Complete encryption and metadata threat review | Inspect logs, backups, error paths and operator boundaries.
- [ ] EC-130 | Release | accessibility,devops | Finish accessibility and deployment readiness | Provide key operations, health checks, runbook and responsive polish.

