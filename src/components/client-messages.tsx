import { MessagesInbox } from '@/components/messages-inbox';

interface ClientMessagesProps {
  onBrowsePress?: () => void;
}

export function ClientMessages({ onBrowsePress }: ClientMessagesProps) {
  return (
    <MessagesInbox
      role="client"
      emptyTitle="Your Inbox is Empty"
      emptyDescription="Chats with artisans about quotes, pricing, and project updates will appear here when you start a conversation."
      emptyActionLabel={onBrowsePress ? 'Browse Artisans' : undefined}
      onEmptyActionPress={onBrowsePress}
    />
  );
}
