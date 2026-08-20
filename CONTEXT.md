# Web Editor Revisions

This project defines portable interchange semantics for pending revisions in text-focused Web editors and their document-format boundaries.

## Language

**Web Editor Revisions**:
The project and specification name for the complete versioned publication.
_Avoid_: General Web editing terminology

**Revision proposal**:
An independently reviewable lifecycle record that represents a pending document change and may retain its accepted or rejected outcome.
_Avoid_: Suggestion, tracked change, edit operation

**Accepted document state**:
The authoritative document content against which pending revision proposals are interpreted.
_Avoid_: Base document, current version

**Interchange document**:
A portable document containing an accepted document state and its revision proposals under one model and serialization profile.
_Avoid_: Editor state, history log

**Mapping profile**:
A direction-specific contract between the core interchange model and a pinned native document or editor boundary.
_Avoid_: Universal adapter, format support
