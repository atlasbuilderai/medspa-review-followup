# MedSpa Review Follow-Up — MVP Spec

## MVP Objective
Ship a demoable, narrow product that lets a med spa upload client contacts, send review requests, follow up automatically, and track basic send activity.

## Must-Have Features
### 1. Account
- sign up / log in
- business name
- email

### 2. Review Settings
- Google review link
- business display name
- default message templates

### 3. Campaigns
- create campaign
- campaign name
- choose message channel (SMS, email, or both later)
- follow-up delay setting

### 4. Contact Input
- CSV upload
- manual contact add

Contact fields:
- first name
- phone
- email
- source / optional note

### 5. Send Flow
- send initial review request
- optional scheduled follow-up
- basic status tracking

### 6. Dashboard
- contacts uploaded
- messages sent
- follow-ups sent
- simple campaign list

### 7. Compliance Basics
- unsubscribe / stop language where needed
- basic opt-out handling

## High-Priority Upgrades Immediately After MVP
- Google rating snapshot in dashboard
- total review count in dashboard
- review growth trend over time
- click tracking per campaign
- med spa-specific template library
- simple performance reporting layer

## Non-Goals
- no inbox
- no review monitoring dashboard
- no multi-location support at MVP
- no agency management at MVP
- no AI features
- no listings management
- no website widgets

## Suggested MVP Stack
- web app
- auth
- hosted DB
- background jobs / scheduled follow-up
- SMS provider and/or email provider

## Recommended MVP Sequence
1. auth + settings
2. contacts upload
3. campaign creation
4. send initial review request
5. schedule and send follow-up
6. basic dashboard

## Definition of Done
A med spa owner can:
1. log in
2. paste or upload customer contacts
3. save their Google review link
4. send a request
5. trigger one follow-up
6. see simple results
