# Designer-Developer Community Platform

A social platform connecting UI/UX designers and frontend developers built with React Native Expo.

## Features

### Authentication
- Email/password login and registration
- Role selection (Designer, Developer, Both)
- Persistent user sessions

### Home Feed
- Combined feed of designs and builds
- Filter by category (All, Designs, Builds)
- Like and comment on posts
- Tap to view full post details

### Post Creation
- Designers can upload images or paste Figma URLs
- Developers can upload screenshots with live demo and GitHub links
- Add captions and tags to posts
- Role-based post creation UI

### User Profiles
- Profile picture, name, bio, skills, and role
- Portfolio section showing designs and builds separately
- Edit profile information
- Follower/following counts

### Explore & Discovery
- Search by username or tags
- Featured project section
- Trending tags
- Filter search results

### Notifications
- Like, comment, follow, and collaboration notifications
- Mark all as read functionality
- Real-time notification badges

### Settings
- Edit profile
- Toggle push and email notifications
- Help and support
- About section

## Tech Stack

- React Native (Expo SDK)
- Expo Router for navigation
- Context API for state management
- Lucide Icons
- TypeScript

## Project Structure

```
app/
├── (tabs)/          # Tab navigation screens
├── auth/            # Authentication screens
├── post/            # Post detail screen
├── settings.tsx     # Settings screen
├── edit-profile.tsx # Edit profile screen
└── _layout.tsx      # Root layout

components/          # Reusable UI components
constants/           # App constants (colors, etc)
context/             # Context providers (Auth)
data/                # Mock data
types/               # TypeScript type definitions
```

## Running the App

```bash
npm install
npm run dev
```

## Notes

- All data is mocked for MVP demo purposes
- Image uploads, likes, comments, and notifications are UI-only
- No backend integration in this version
