# Web Editing Standards publication validation report

Date: 2026-08-19
Validated input set: `web-editing-standards-validation-draft-1`  
Maintainer-reviewed publication set: `web-editing-standards-v1`
Result: Pass in project-maintainer validation; identifier harmonization revalidated

## Scope

This fresh pass validates the complete [`standards/v1/`](README.md) publication after implementation of the direction-specific profile fixture matrices. It checks the project's standardization aim, all eleven active material decisions, the selected terminology ledger, supporting and contradictory evidence, synthesis coverage, and the role- and direction-scoped adopter workflow.

The pass covers normative internal consistency, the requirements-versus-guidance boundary, schema/prose/fixture agreement, deterministic core execution, profile-claim packaging, direction-specific and capability-activated profile coverage, visible limitations and reassessment triggers, and publication-relative links and anchors.

## Results

| Validation axis | Result | Evidence |
| --- | --- | --- |
| Project aim and scope | Pass | The [core standard](standard.md) defines a vendor-neutral text-focused pending-revision model, canonical serialization, observable resolution, identity preservation, and structured loss without constraining UI, runtime architecture, or private storage. Sections 3 and 18 visibly bound the selected subset and exclusions. |
| Active material decisions | Pass | [Decision provenance](provenance.md) represents all eleven active decisions: boundary, terminology, assessment depth, accepted state and targets, identity and lifecycle, formatting, content and resolution, loss and conformance, serialization, initial profiles, and direction-specific profile evidence. Each points to a consistent normative result. |
| Selected terminology | Pass | Core Section 4 uses the ledger's distinctions among revision proposals, payloads, accepted state, projections, resolution, operations, histories, annotations, and comments. Source-specific labels appear only at explicit mapping boundaries. |
| Supporting and contradictory evidence | Pass | The [evidence index](evidence.md) retains representative primary-source support, counterexamples to broader claims, serialization alternatives, source-profile limits, uncertainty, and reassessment signals. The normative subset and limitations reflect those constraints. |
| Synthesis coverage | Pass | The primary document covers every required core section from purpose through maintenance; the three profiles cover pinned upstream boundaries, both directions, loss and refusal, report binding, conformance, matrices, and informative implementation notes; the index, evidence, provenance, and evaluation package make the publication independently navigable without tracker mechanics. |
| Normative versus informative boundary | Pass | The core identifies its normative references and informative examples. Every profile states that Sections 1–10 are normative and Section 11 is informative. The publication index and evaluation guide identify their own supporting status and defer to normative profile text if catalog drift occurs. |
| Schema, prose, and core fixtures | Pass | Both published JSON Schemas are valid Draft 2020-12 schemas. The published core runner passes all 13 groups, exercising strict parsing, canonical bytes, fingerprints, every proposal kind, projections, remapping, lifecycle, extensions, mapping outcomes, authorization, rollback, and closed vocabularies. |
| Direction-specific profile coverage | Pass | Catalog version 2 contains exactly six directions. Normative profile tables and catalog activation agree exactly. Universal safety cases apply to every claim; capability cases activate for every declared proposal kind; native-to-core source persistence is conditional; and every core-to-native direction unconditionally covers native save/reload, clean failure, rollback, and residual partial persistence. |
| Profile-claim reproducibility | Pass | Catalog/schema validation succeeds. The packaged self-test accepts full-capability and safety-only packages for all six directions (12 positive packages) and rejects 11 invalid packages, including one missing activated fixture for every direction, scope/capability mismatch, `not-run` required evidence, invalid persistence scope, unavailable capability, and catalog/profile drift. |
| Adopter workflow | Pass | The [publication adoption path](README.md#adoption-path) and [evaluation guide](evaluation/README.md) lead an adopter from a role-scoped core claim to one pinned profile, direction, capability set, measured boundary, activated fixture set, preserved evidence, and hash-bound manifest. Safety-only and proposal-mapping claims cannot be confused. |
| Limitations and reassessment | Pass | The core, publication index, evidence index, and profiles visibly limit rich structure, replacement mapping, formatting derivation, identity carriage, upstream versions, maintenance authority, and adoption claims. Concrete implementation and ecosystem signals trigger reassessment. |
| Publication integrity | Pass after mechanical correction | All four JSON assets parse strictly without duplicate members or non-JSON constants. Both published Python evaluators compile. Every relative Markdown file target and anchor across the publication resolves. The repository-root `.gitignore` excludes generated Python cache files from publication content. |

## Closure of the prior blocker

The interrupted validation pass found that one shared fixture set was applied to both directions of each profile. That made native-source-only cases mandatory for core-to-native claims and could not express partial proposal-kind capability.

The active [direction-specific fixture decision](decisions/25-define-direction-specific-profile-fixture-matrices.md) and its synthesis implementation close that issue without changing core semantics:

- each profile now publishes one explicit native-to-core matrix and one explicit core-to-native matrix;
- capability declarations use core proposal kinds and activate their exact requirements;
- a safety-only claim advertises no proposal-kind support;
- a required fixture must pass and cannot be satisfied by `not-run` or inapplicability;
- native-source persistence activates only for a native-to-core claim that explicitly includes it; and
- native output persistence and transaction-integrity evidence are unconditional for core-to-native claims.

The catalog validator mechanically compares every fixture identifier and activation with the normative profile tables, so the original shared-set defect would now fail validation.

## Mechanical correction

Validation initially added a publication-local ignore rule and removed generated cache files from the publication tree. Before closeout, the repository owner consolidated the same `__pycache__/` and `*.pyc` exclusions into the [repository-root `.gitignore`](../../.gitignore). This changes neither normative content nor executable behavior.

## Reproduction record

The following commands passed from the repository root:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 standards/v1/evaluation/run_conformance.py
PYTHONDONTWRITEBYTECODE=1 python3 standards/v1/evaluation/validate_profile_claim.py --check-catalog
PYTHONDONTWRITEBYTECODE=1 python3 standards/v1/evaluation/validate_profile_claim.py --self-test
PYTHONPYCACHEPREFIX=/tmp/wes-validation-pycache python3 -m py_compile standards/v1/evaluation/run_conformance.py standards/v1/evaluation/validate_profile_claim.py
```

The validation also used strict standard-library JSON parsing with duplicate-member rejection, Draft 2020-12 meta-schema checks, catalog/profile matrix correlation, and a local relative-link and GitHub-style heading-anchor check over the publication tree.

## Post-review identifier harmonization

After maintainer review, the project adopted one consistent consumer-facing and normative identity matching the repository: **Web Editing Standards** and `web-editing-standards`. The publication directory, document titles, schema filenames, schema descriptions, profile identifiers, claim-format selector, accepted-state fingerprint domain, evaluator paths, commands, and internal links were renamed together. No superseded project title, slug, or filename remains in the active tree.

Because the domain separator is part of the normative accepted-state fingerprint projection, the canonical fixture fingerprint and its exact JCS bytes were regenerated rather than treated as editorial text. The published core suite then passed 13/13 groups; the six-direction requirements catalog and claim schema validated; all 12 positive and 11 negative claim packages behaved as required; both published evaluators compiled; and relative links remained resolvable. The harmonization changes identifiers but does not alter the revision semantics, scope, conformance roles, or mapping behavior.

## Validation disposition

No missing fact or normative contradiction was identified by the project-maintainer validation. The publication satisfies the project's validation gate, and the subsequent identifier-harmonization requirement passed fresh executable and structural validation. This result is not approval or certification by any referenced vendor, open-source project, standards organization, or independent review body. It does not assert live native-adapter conformance, adoption prevalence, permanent stewardship, or universal round-trip success; the publication explicitly limits those claims and defines how future adapter evidence must be packaged.

## Closeout record

The release commit preserves the complete versioned project publication. Closeout retained the normative standard and schema, three mapping profiles, executable evaluation package, curated supporting and contradictory evidence, limitations and reassessment triggers, this validation record, and all twelve active material decision records under this publication directory. Operational tracking material and duplicate working assets were excluded after the publication passed the executable, schema, JSON, link, anchor, provenance, and naming checks recorded above.

The compacted repository state is identified by publication set and release tag `web-editing-standards-v1`. Repository-local agent skills and their lock file remain available locally but are excluded from the compacted tracked tree under the repository's root ignore policy.
