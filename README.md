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

- `ACCEPTED`: taken word for word from Notion. Change it only when Notion changes.
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

## Drafts that involve Project

Each row names the Project spec IDs (FR, PR) the file serves, who proposed it and who must agree.

| File | Status | Serves | Proposed by | Must agree |
| --- | --- | --- | --- | --- |
| `events/project/generation_requested.v1.schema.json` | DRAFT | FR-27, FR-27.1, PR-16 | project | ai_codegen |
| `events/project/generation_cancelled.v1.schema.json` | DRAFT | PR-16 | project | ai_codegen |
| `events/ai_codegen/generation_completed.v1.schema.json` | DRAFT | PR-9, PR-16 | project | ai_codegen (owner) |
| `events/account/user_status_changed.v1.schema.json` | DRAFT | PR-21 | project | account (owner) |
| `proto/webblock/project/v1/project_owner.proto` | DRAFT | PR-22 | project | notification |
| `events/project/source_published.v1.schema.json` | DRAFT | PR-19 | provisioning | project (owner) |
| `events/project/project_deleted.v1.schema.json` | DRAFT | PR-20 | provisioning | project (owner) |
| `events/project/owner_status_changed.v1.schema.json` | DRAFT | PR-21 | provisioning | project (owner) |
| `proto/webblock/project/v1/repository.proto` | DRAFT | PR-18 | provisioning | project (owner) |
| `events/provisioning/publish_completed.v1.schema.json` | OWNED BY provisioning | FR-37, PR-9 | provisioning | none |
| `access/actions.v1.json` and its schema | DRAFT | FR-32 | project | provisioning |

Project's answers to the files Provisioning proposed:

- `source_published.v1`, `project_deleted.v1`, `owner_status_changed.v1`: Project accepts them as written. They stay
  DRAFT until Project emits them and both sides move their pinned commit.
- `repository.proto`: accepted as written, with four open points listed at the top of the file: the host in
  `clone_url`, no commit SHA in the answer, the reason for an unknown or deleted project, and the mesh caller.
- `publish_completed.v1`: Project wants to consume it for FR-37 (the first release that goes live moves a project
  from `draft` to `active`, if the owner rules that a publish means a live release), through its own queue
  `project.publish_completed.v1` bound to `provisioning.events`.
  Project would deduplicate on `event_key`, since each send carries a new `message_id`. This needs Notion
  "Web Block architecture" 4.4 and 5.2 to list Project as a consumer, and read permission on `provisioning.events`
  for Project's broker user.

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
