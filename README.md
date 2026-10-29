# web-block-contracts

## What this is

The shared contracts of the Web Block services, in one place. It holds the gRPC protos under `proto/`, the JSON Schemas
of the events under `events/`, and the action list of CheckAccess under `access/`. The layout follows the Notion page
"Web Block architecture", section 3.7. It holds no code. Each service copies what it needs from a pinned commit.

```text
proto/webblock/<service>/v1/*.proto
events/envelope.v1.schema.json
events/<service>/<event>.v1.schema.json
events/examples/valid/*.json
events/examples/invalid/*.json
access/actions.v1.json
access/actions.v1.schema.json
```

## Owners

Each file belongs to one service. Only that service changes it.

| File | Owner |
| --- | --- |
| `events/envelope.v1.schema.json` | all services (Notion 4.1) |
| `proto/webblock/project/v1/*.proto`, `events/project/*`, `access/*` | project |
| `proto/webblock/payment/v1/*.proto`, `events/payment/*` | payment |
| `events/provisioning/*` | provisioning |
| `events/ai_codegen/*` | ai_codegen |
| `events/account/*` | account |

## Status headers

The first line of each proto, and the start of each schema's `description`, gives its status. A data file such as
`access/actions.v1.json` has the status of its schema.

- `ACCEPTED`: taken word for word from Notion, or accepted word for word by the owner and the named consumer. Change
  it only by the rules of "How to ask for a change".
- `OWNED BY <service>`: the owner wrote it and keeps it.
- `DRAFT, proposed by <service>, waits for <owner>`: another service wrote it so work can start. The owner may change it
  or accept it. When the owner accepts it, the header becomes `ACCEPTED`.
- `DRAFT, proposed by <owner>, waits for <service>`: the owner wrote it and the named consumer or caller must
  agree. When that service agrees, the header becomes `ACCEPTED`.

## Event rules

- Every event body carries the envelope fields in snake_case: `schema_version`, `message_id`, `message_type`,
  `occurred_at`, `correlation_id`, `project_id`.
- Each event schema repeats the envelope fields, so one file checks one message. No schema allows extra properties.
- `message_type` is `<service>.<event>.v<n>`. The AMQP `type` equals it.
- A new field that a reader may ignore keeps the version. Any other change is a new file with the next version.
- Open point: `account.user_status_changed.v1` is about a user, not a project, so its draft has no `project_id`.
  The envelope schema requires `project_id`; Notion "Web Block architecture" 4.1 sends it "when there is one".
  The envelope's owners decide which rule holds.

## Examples

`events/examples/valid` holds at least one valid message for each event. Each file in `events/examples/invalid` differs
from one valid file in exactly one property. Its name says the rule it breaks, for example
`source-published-39-char-sha.json`. Every invalid example fails its schema alone, without any other check.

## What each service needs from the others

One row per need. File paths are short: a `.proto` path is under `proto/webblock/`, an event path is under `events/`
without `.schema.json`. "Gap" rows have no file yet; the gap list below says what is missing. Project, Provisioning and
Payment exist today; Account, AI Codegen and Notification are not built, so their files are the spec they will be built
to.

### What Project and Provisioning need

IDs are the consumer's own spec IDs (Project's or Provisioning's numbering).

| Consumer | Provider | Kind | File | Status | Consumer IDs |
| --- | --- | --- | --- | --- | --- |
| project | payment | gRPC | `payment/v1/admission.proto` `AdmitWebsite` | DRAFT | FR-11, PR-15 |
| project | payment | gRPC | `payment/v1/admission.proto` `ReleaseWebsiteAdmission` | DRAFT | FR-12, PR-15 |
| project | payment | gRPC | `payment/v1/admission.proto` `AdmitGenerationAttempt` | DRAFT | FR-26, PR-7 |
| project | payment | gRPC | `payment/v1/entitlement.proto` | DRAFT | none yet (UI) |
| project | payment | gRPC | `payment/v1/client_entitlement.proto` | DRAFT | none yet (UI) |
| project | provisioning | event | `provisioning/publish_completed.v1` | OWNED BY provisioning; gap G1 | FR-37, PR-9 |
| project | ai_codegen | event | `ai_codegen/generation_completed.v1` | DRAFT | PR-9, PR-16 |
| project | ai_codegen | gRPC | none: read a run, list a request's runs | gap G2 | PR-9 |
| project | ai_codegen | HTTPS | none: hand over the generated source | gap G3 | PR-9 |
| project | account | event | `account/user_status_changed.v1` | DRAFT | PR-21 |
| provisioning | project | gRPC | `project/v1/access.proto` | ACCEPTED | FR-3, FR-5, FR-8, TR-20 |
| provisioning | project | data | `access/actions.v1.json` (full path) | DRAFT | FR-3, FR-13, FR-37 to FR-41 |
| provisioning | project | gRPC | `project/v1/repository.proto` | DRAFT | FR-9, FR-54, TR-20 |
| provisioning | project | event | `project/source_published.v1` | DRAFT | FR-9, FR-10, TR-22 |
| provisioning | project | event | `project/project_deleted.v1` | DRAFT | FR-28, TR-22 |
| provisioning | project | event | `project/owner_status_changed.v1` | DRAFT | FR-29, FR-54 |
| provisioning | payment | gRPC | `payment/v1/entitlement.proto` | DRAFT | FR-26, FR-27, FR-47, FR-49 |
| provisioning | payment | event | `payment/hosting_entitlement_ended.v1` | DRAFT | FR-26, FR-30 |
| provisioning | payment | event | `payment/hosting_entitlement_restored.v1` | DRAFT | FR-27, FR-30 |

The Payment methods of `admission.proto` and `client_entitlement.proto` are gRPC (owner ruling C1); Project's HTTP
calls of `payment-contract.md` sections 2.1 to 2.5 move to them. Deleting a website frees its slot in the client's
current plan (owner ruling A2).

### What the others need from Project and Provisioning

These consumers have no spec of their own here, so the IDs are the provider's (Project's or Provisioning's).

| Consumer | Provider | Kind | File | Status | Provider IDs |
| --- | --- | --- | --- | --- | --- |
| ai_codegen | project | event | `project/generation_requested.v1` | DRAFT | FR-27, FR-27.1, PR-16 |
| ai_codegen | project | event | `project/generation_cancelled.v1` | DRAFT | PR-16 |
| ai_codegen | project | gRPC | none: codegen input (REST built) | gap G4 | FR-29, PR-16, PR-22 |
| ai_codegen | project | gRPC | none: scaffold | gap G5 | PR-22 |
| ai_codegen | project | gRPC | none: thread owner check | gap G6 | PR-22 |
| notification | project | gRPC | `project/v1/project_owner.proto` | DRAFT | PR-22 |
| notification | project | event | `project/source_published.v1` | DRAFT | PR-19 |
| notification | provisioning | event | `provisioning/publish_completed.v1` | OWNED BY provisioning | FR-42, PR-19 |
| notification | provisioning | event | none: release failed | gap G7 | none |
| payment | project | event | `project/source_published.v1` | DRAFT | PR-19 |
| payment | project | event | `project/project_deleted.v1` | DRAFT | PR-20 |
| payment | provisioning | event | `provisioning/publish_completed.v1` | OWNED BY provisioning | FR-42, PR-19 |
| site portal | project | gRPC | `project/v1/access.proto`, `manage_site` | ACCEPTED; gap G8 | FR-32, PR-14 |

Not in this repository: the Keycloak token rules (Project's `authentication-contract.md`, Project FR-1, FR-2,
Provisioning FR-1, FR-2) and the shared catalog database (Notion "6 · Shared catalog", Project FR-35, PR-17).
Links that involve neither Project nor Provisioning, such as Payment to Account `GetSignupTime` and Notification to
Account `GetUserContact`, get their rows when those teams write their files.

### Gaps

- G1, Project reads `publish_completed` (FR-37): the file is enough. Notion 4.4 and 5.2 must list Project as a
  consumer, with queue `project.publish_completed.v1` on `provisioning.events` and read right for Project's broker
  user.
- G2, Project reads a run and a request's runs: the transport (owner question C3: Notion gRPC `GetGenerationRun` and
  `ListGenerationRuns`, Project's note REST), the run status values and the error list. The fields are known from
  Project's `service-communication.md` 2.4.
- G3, the generated source reaches Project: push or pull (owner question C4). Notion 5.1 and open point 6: AI calls
  Project with a method not named yet. Project's note: a presigned URL, SHA-256, a `source_archive` gzip tar overlay
  and a `check_report`.
- G4, AI Codegen reads the frozen input over gRPC: the transport (owner question C2). REST is built (Project FR-29);
  Notion 3.7 names `project/v1/codegen_input.proto`. Missing: how `captured_input` travels so that its hash rule (JCS,
  SHA-256) still holds.
- G5, AI Codegen reads the scaffold: Notion names a streamed `GetScaffold`; the chunk shape, digest and errors are not
  written, and it is not built (J4).
- G6, AI Codegen checks who owns a chat thread: `CheckThreadOwner` has no fields, no errors and no Project FR.
- G7, Notification hears that a release failed: Notion "platform-db-v6" says the events are not defined yet; no fields
  and no Provisioning ID.
- G8, a site portal checks `manage_site`: sites run on another cluster, so Notion 9 point 3 proposes a small public
  REST endpoint instead of the mesh. The action is in `access/actions.v1.json` (DRAFT); the REST form has no file.

### Project's answers to the files Provisioning proposed

- `source_published.v1`, `project_deleted.v1`, `owner_status_changed.v1`: Project accepts them as written. They stay
  DRAFT until Project emits them and both sides move their pinned commit.
- `repository.proto`: accepted as written, with four open points listed at the top of the file: the host in
  `clone_url`, no commit SHA in the answer, the reason for an unknown or deleted project, and the mesh caller.
- `publish_completed.v1`: Project consumes it for FR-37: the first release that goes live moves a project from
  `draft` to `active`. Project records each `message_id` once; a repeat for the same release with a new `message_id`
  changes nothing, since only a `draft` project moves. The missing Notion rows are gap G1.

## How to ask for a change

Any team may ask any service for something here, Project and Provisioning included.

1. Write a branch with a new DRAFT file, or a change to another service's file, and open a merge request in this
   repository. A new file starts with `DRAFT, proposed by <your service>, waits for <owner>`, follows the naming and
   event rules above, and passes the checks (valid and invalid examples for an event, `protoc` for a proto). Add or
   change its row in "What each service needs from the others", with your own spec IDs.
2. The owning service reviews it. It accepts it word for word, and the header becomes `ACCEPTED`; or it answers in the
   merge request with what must change. Only the owner changes its own files.
3. A breaking change is a new file with the next version (`.v2`, package `v2`) next to the old one. An accepted `.v1`
   is never edited, except to add a field a reader may ignore.
4. A service pins a full commit SHA and moves it on purpose (see "How a service pins it").

## Action list

`access/actions.v1.json` names every action that `AccessService/CheckAccess` accepts. Each action has `name`, `write`
and `admin_allowed`. `write` is true when the action changes state and false for a get or list action. `admin_allowed`
is true when a caller may let an admin through without asking Project. `access/actions.v1.schema.json` checks the file.
Names are unique.

## How a service pins it

A service never reads this repository live. It keeps the full commit SHA it uses in its own `contracts.lock` file. A
script copies the files it needs from `events/`, `proto/` and `access/` at that commit and generates code from the
protos. A check fails when the copy differs from the pinned commit. To take a change, a service moves its SHA and runs
its sync again, in one reviewed change.
