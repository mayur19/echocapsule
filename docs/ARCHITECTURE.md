# Architecture

EchoCapsule separates collecting, sealed and open states.

- Every request recalculates effective state using server time.
- Sealing encrypts final card versions and commits their hashes in one transaction.
- Waiting responses use strict metadata allowlists.
- Opening decrypts only for authorized responses and verifies plaintext against the sealed hash.
- The instance secret never belongs in source control or logs.

The first slice proves lifecycle and cryptographic boundaries in memory. Persistent transactions, accounts, invitations and media-key handling follow next.

