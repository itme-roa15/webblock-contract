# web-block-contracts

## What this is

The shared contracts of the Web Block services, in one place. It holds the gRPC protos under `proto/` and the JSON Schemas of the events under `events/`. The layout follows the Notion page "Web Block architecture", section 3.7. It holds no code. Each service copies what it needs from a pinned commit.

```text
proto/webblock/<service>/v1/*.proto
events/envelope.v1.schema.json
events/<service>/<event>.v1.schema.json
events/examples/valid/*.json
events/examples/invalid/*.json
```

## Owners

Each file belongs to one service. Only that service changes it.

| File | Owner |
| --- | --- |
| `events/envelope.v1.schema.json` | all services (Notion 4.1) |
| `proto/webblock/project/v1/*.proto`, `events/project/*` | project |
| `proto/webblock/payment/v1/*.proto`, `events/payment/*` | payment |
| `events/provisioning/*` | provisioning |

## Status headers

The first line of each proto, and the start of each schema's `description`, gives its status.

- `ACCEPTED`: taken word for word from Notion. Change it only when Notion changes.
- `OWNED BY <service>`: the owner wrote it and keeps it.
- `DRAFT, proposed by <service>, waits for <owner>`: another service wrote it so work can start. The owner may change it or accept it. When the owner accepts it, the header becomes `ACCEPTED`.

## Event rules

- Every event body carries the envelope fields in snake_case: `schema_version`, `message_id`, `message_type`, `occurred_at`, `correlation_id`, `project_id`.
- Each event schema repeats the envelope fields, so one file checks one message. No schema allows extra properties.
- `message_type` is `<service>.<event>.v<n>`. The AMQP `type` equals it.
- A new field that a reader may ignore keeps the version. Any other change is a new file with the next version.

## Examples

`events/examples/valid` holds at least one valid message for each event. Each file in `events/examples/invalid` differs from one valid file in exactly one property. Its name says the rule it breaks, for example `source-published-39-char-sha.json`. Every invalid example fails its schema alone, without any other check.

## How a service pins it

A service never reads this repository live. It keeps the full commit SHA it uses in its own `contracts.lock` file. A script copies `events/` and `proto/` from that commit and generates code from the protos. A check fails when the copy differs from the pinned commit. To take a change, a service moves its SHA and runs its sync again, in one reviewed change.
