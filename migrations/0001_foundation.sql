CREATE TABLE capsules (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL,
  title text NOT NULL,
  contribution_deadline timestamptz NOT NULL,
  open_at timestamptz NOT NULL,
  state text NOT NULL,
  manifest_hash text,
  sealed_at timestamptz,
  opened_at timestamptz,
  CHECK(contribution_deadline < open_at)
);
CREATE TABLE capsule_memberships (
  capsule_id uuid NOT NULL REFERENCES capsules(id),
  account_id uuid NOT NULL,
  role text NOT NULL,
  status text NOT NULL,
  PRIMARY KEY(capsule_id, account_id)
);
CREATE TABLE cards (
  id uuid PRIMARY KEY,
  capsule_id uuid NOT NULL REFERENCES capsules(id),
  author_id uuid NOT NULL,
  encrypted_payload text,
  nonce text,
  auth_tag text,
  content_hash text,
  status text NOT NULL
);
CREATE TABLE seal_manifest_items (
  capsule_id uuid NOT NULL REFERENCES capsules(id),
  card_id uuid NOT NULL REFERENCES cards(id),
  content_hash text NOT NULL,
  PRIMARY KEY(capsule_id, card_id)
);

