import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";

interface ChatMessage {
  message: string;
  response: string;
  timestamp: string;
}

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const { data: chatHistory, isLoading: isLoadingHistory } = useQuery<
    ChatMessage[]
  >({
    queryKey: ["/api/chat/history"],
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/chat", { message });
      return res.json();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    chatMutation.mutate(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <Card className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 pr-4">
          {isLoadingHistory ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory?.map((chat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="bg-primary/10 rounded-lg p-3 flex-1">
                      {chat.message}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 flex-1">
                      {chat.response}
                    </div>
                  </div>
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about investment advice..."
            disabled={chatMutation.isPending}
          />
          <Button type="submit" disabled={chatMutation.isPending}>
            {chatMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
