import { MessagesInbox } from '@/components/messages-inbox';

export function ArtisanMessages() {
  return (
    <MessagesInbox
      role="artisan"
      emptyTitle="No Client Chats"
      emptyDescription="Direct messages and booking conversations with clients will show up here. Accept booking requests to start chatting!"
    />
  );
}
