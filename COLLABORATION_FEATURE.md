# Request Collaboration Feature

## Overview
The "Request Collaboration" feature allows developers to request collaboration with designers on their design posts. This facilitates the connection between designers and developers on the platform.

## Implementation Details

### Location
- **PostCard Component**: Displays on design posts in the home feed
- **Post Details Screen**: Displays when viewing a design post in detail

### Visual Design
- **Button Style**: Premium bordered button with Barlow font
- **Colors**:
  - Default: Orange/gold background (#fff5e6) with primary color border
  - Requested: Green background (#e6ffe6) with success color border
- **Icon**: Handshake icon from Lucide React Native
- **Font**: Barlow SemiBold (700 weight)

### User Flow

1. **Designers Post**
   - Designers upload UI/UX designs to the platform

2. **Developers Browse**
   - Developers browse designs in the feed or explore section
   - Only developers (role: 'developer' or 'both') can request collaboration

3. **Request Collaboration**
   - Developer taps "Request Collaboration" button
   - Confirmation alert appears asking to confirm
   - Upon confirmation:
     - Button changes to "Request Sent" with success styling
     - Success notification shown
     - State reverts after 3 seconds
   - Designers receive collaboration notification

4. **Access Control**
   - Only users with role 'developer' or 'both' can send requests
   - Non-developers see an alert: "Only developers can request collaboration on designs"
   - Button only appears on design-type posts

### Mock Data
All collaboration requests are currently mocked. In a real implementation with Supabase:
- Requests would be stored in a `collaboration_requests` table
- Notifications would trigger for the designer
- Status could be tracked (pending, accepted, declined)

### Files Modified
1. **types/index.ts**
   - Added `CollaborationRequest` interface

2. **components/PostCard.tsx**
   - Added collaboration request state management
   - Added button logic and styling
   - Integrated Handshake icon

3. **app/post/[id].tsx**
   - Added collaboration request state management
   - Added button to post detail view
   - Added alert confirmations

4. **constants/colors.ts**
   - Added `fonts` export with Barlow font mappings

5. **app/_layout.tsx**
   - Integrated Barlow font loading via expo-font
   - Added font loading and splash screen management

### Styling Features
- Clean, intuitive design with Barlow font
- State-based visual feedback
- Smooth transitions and clear messaging
- Accessible color contrast
- Role-based visibility
