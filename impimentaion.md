# Pixgallery Implementation Plan

## Scope from the diagram
- User roles: Photographer, Organization.
- Onboarding: Sign up -> choose type -> verify info -> profile approved.
- Core modules: Profile, Event, Photo, Gallery/Sharing, Booking.
- Client flow: Browse -> profile/portfolio -> event gallery -> download -> book.
- Admin panel: user management, verification, event oversight, moderation, analytics, settings.
- Photo processing: auto upload, face grouping, smart sorting, duplicate detection, search/filter.
- Notifications: booking alerts, event updates, new photos, system notices.

## Phase 0 - Foundations
- Confirm requirements and success metrics.
- Choose stack and hosting (web, API, storage, background jobs, AI services).
- Set up CI/CD, environments, logging, and monitoring.

## Phase 1 - Identity and Onboarding
- Auth (email/SSO) and role selection.
- Profile creation for photographer or organization.
- Verification workflow with admin approval and audit log.

## Phase 2 - Core Data Model
- Entities: User, Profile, Organization, Event, Album, Photo, Gallery, Booking, Notification, VerificationRequest.
- Relationships: org <-> photographers, event -> albums -> photos, booking -> event -> photographer.

## Database Schema (High Level)

### users
- id (PK)
- email (unique)
- password_hash
- role (photographer, organization, admin)
- status (pending, active, suspended)
- created_at, updated_at

### profiles
- id (PK)
- user_id (FK -> users.id)
- display_name
- contact_email, contact_phone
- bio
- services_offered
- pricing_info
- portfolio_visibility
- created_at, updated_at

### organizations
- id (PK)
- user_id (FK -> users.id)
- org_name
- website
- address
- created_at, updated_at

### photographer_organizations
- id (PK)
- photographer_user_id (FK -> users.id)
- organization_id (FK -> organizations.id)
- role_title
- created_at

### events
- id (PK)
- owner_user_id (FK -> users.id)
- title
- description
- event_date
- location
- visibility (private, unlisted, public)
- share_code (unique)
- created_at, updated_at

### albums
- id (PK)
- event_id (FK -> events.id)
- title
- description
- created_at, updated_at

### photos
- id (PK)
- album_id (FK -> albums.id)
- uploader_user_id (FK -> users.id)
- drive_file_id (unique)
- drive_folder_id
- mime_type
- width, height
- taken_at
- tags (json)
- status (syncing, ready, failed)
- created_at, updated_at

### drive_sync_state
- id (PK)
- user_id (FK -> users.id)
- last_sync_token
- last_synced_at
- created_at, updated_at

### galleries
- id (PK)
- event_id (FK -> events.id)
- title
- is_public
- drive_folder_id
- created_at, updated_at

### bookings
- id (PK)
- photographer_user_id (FK -> users.id)
- client_user_id (FK -> users.id, nullable for guest)
- event_id (FK -> events.id, nullable)
- status (requested, confirmed, cancelled)
- scheduled_start
- scheduled_end
- created_at, updated_at

### verification_requests
- id (PK)
- user_id (FK -> users.id)
- status (pending, approved, rejected)
- reviewed_by (FK -> users.id)
- reviewed_at
- created_at

### notifications
- id (PK)
- user_id (FK -> users.id)
- type (booking_alert, event_update, new_photos, system)
- payload (json)
- read_at
- created_at

### audit_logs
- id (PK)
- actor_user_id (FK -> users.id)
- action
- target_type
- target_id
- metadata (json)
- created_at

### indexes and constraints
- users.email unique
- events.share_code unique
- photos.drive_file_id unique
- photos.status index
- bookings.photographer_user_id, bookings.status index

## Google Drive Architecture Notes
- Photos and albums live in Google Drive; Pixgallery stores metadata only.
- Use Drive API Changes + webhooks to keep `photos` and `drive_sync_state` in sync.
- Use cached thumbnails/previews in app storage/CDN for fast galleries.
- Access control uses Drive file permissions plus Pixgallery RBAC checks.

## Phase 3 - Profile and Portfolio
- Profile info, contact details, services, pricing, portfolio.
- Public profile page with portfolio previews.

## Phase 4 - Event Management
- Create event with details, settings, access/visibility.
- Shareable event page and QR.
- Event dashboard for uploads and gallery status.

## Phase 5 - Photo Management
- Google Drive integration for source photos and albums.
- Metadata sync (EXIF, tags) into Pixgallery DB.
- Cache thumbnails and optimized previews in app storage/CDN.

## Phase 6 - Gallery and Sharing
- Public gallery pages and curated photo selection.
- Optional watermarking.
- Share by link/QR and controlled downloads.

## Phase 7 - Booking Management
- Photographer listing and availability checks.
- Booking requests, confirmation, and cancellation.
- Manage bookings dashboard.

## Phase 8 - Client Experience
- Browse photographers and view profiles.
- View event galleries and download photos.
- Book photographer (guest or account flow).

## Phase 9 - Photo Processing and Intelligence
- Background processing for Drive sync and preview generation.
- Face recognition/grouping and smart sorting.
- Duplicate detection and search/filter.

## Phase 10 - Admin Panel
- User management and profile verification.
- Event oversight and content moderation.
- Reports, analytics, and system settings.

## Phase 11 - Notifications
- In-app and email alerts for bookings, events, and new photos.
- Notification preferences and templates.

## MVP Definition
- Roles + onboarding + profile approval.
- Event creation + photo upload + public gallery + download.
- Booking request + confirm.
- Basic admin moderation.
- Email notifications.

## Development Phases for Production Ready Release

### Phase A - Product and Architecture
- Finalize PRD, user journeys, and acceptance criteria.
- Define service boundaries, data ownership, and API contracts.
- Create UX flows, wireframes, and content strategy.

### Phase B - Core Platform Build
- Implement auth, RBAC, and profile verification.
- Build core entities and APIs (users, events, albums, photos, bookings).
- Deliver baseline web UI for photographer, organization, and client roles.

### Phase C - Media and Processing Pipeline
- Implement upload orchestration, metadata extraction, and storage rules.
- Add background jobs for transforms, thumbnails, and optimization.
- Integrate AI features (face grouping, smart sorting, duplicates) behind feature flags.

### Phase D - Sharing, Discovery, and Booking
- Public galleries, share links/QR, download controls.
- Photographer discovery and search.
- Booking flows with notifications and status tracking.

### Phase E - Admin, Moderation, and Analytics
- Admin tools for verification, event oversight, and moderation.
- Reporting dashboards and system health metrics.
- Operational tooling for support and incident response.

### Phase F - Quality, Security, and Compliance
- Automated tests: unit, integration, and end-to-end.
- Security review: auth hardening, rate limits, secrets management.
- Privacy controls: consent, retention policies, and audit logs.

### Phase G - Performance and Scalability
- Load testing, storage lifecycle policies, and CDN tuning.
- Database indexing, query optimization, and caching strategy.
- Job queue scaling and retry policies.

### Phase H - Production Readiness
- Observability: tracing, metrics, alerting, and dashboards.
- Disaster recovery: backups, restore drills, and failover plans.
- Runbooks, on-call workflows, and SLA definitions.

### Phase I - Launch and Post-Launch
- Beta rollout, feedback loops, and feature gating.
- Gradual rollout with monitoring and rollback plans.
- Post-launch bug triage and roadmap iteration.

## Risks and Mitigations
- Storage costs: compression, tiered storage, lifecycle rules.
- Privacy: signed URLs, access rules, watermarking, audit logs.
- AI accuracy: optional face grouping with user confirmation.
- Scale: CDN, async processing, and pagination.
