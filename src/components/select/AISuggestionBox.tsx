import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, AlertTriangle, Share2, CheckCircle, ArrowRight } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { SUGGESTION_SYSTEM_PROMPT } from '@/lib/prompts';
import { allAppTypes } from '@/lib/data';
import { toast } from 'sonner';
interface AIResult {
  appId: string;
  features: string[];
}
interface AISuggestionBoxProps {
  onSuggestion: (appId: string) => void;
  onSelect: (result: AIResult) => void;
}
export function AISuggestionBox({ onSuggestion, onSelect }: AISuggestionBoxProps) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIResult | null>(null);
  const handleSubmit = async () => {
    if (!description.trim()) {
      setError('Please enter a description of your app idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    const userMessage = `
      ${SUGGESTION_SYSTEM_PROMPT}
      User's app description: "${description}"
    `;
    try {
      let aiResponseContent = '';
      await chatService.sendMessage(userMessage, undefined, (chunk) => {
        aiResponseContent += chunk;
      });
      // Wait a moment for the stream to fully close and state to sync on the backend
      await new Promise(resolve => setTimeout(resolve, 500));
      const latestMessagesResponse = await chatService.getMessages();
      if (latestMessagesResponse.success && latestMessagesResponse.data) {
        const lastMessage = latestMessagesResponse.data.messages[latestMessagesResponse.data.messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          aiResponseContent = lastMessage.content;
        }
      }
      if (!aiResponseContent) {
        throw new Error("AI response was empty.");
      }
      const jsonString = aiResponseContent.match(/\{[\s\S]*\}/)?.[0];
      if (!jsonString) {
        throw new Error("AI did not return a valid JSON object.");
      }
      const parsedResult: AIResult = JSON.parse(jsonString);
      const suggestedApp = allAppTypes.find(app => app.id === parsedResult.appId);
      if (!suggestedApp) {
        throw new Error(`AI suggested an invalid app type: ${parsedResult.appId}`);
      }
      setResult(parsedResult);
      onSuggestion(parsedResult.appId);
    } catch (e) {
      console.error("AI Suggestion Error:", e);
      setError(e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleShare = () => {
    if (!result) return;
    const suggestedApp = allAppTypes.find(app => app.id === result.appId);
    const shareText = `
My App Idea Suggestion from Vibe Estimate:
App Type: ${suggestedApp?.name || 'Unknown'}
Key Features:
${result.features.map(f => `- ${f}`).join('\n')}
Get your own estimate: ${window.location.origin}
    `;
    navigator.clipboard.writeText(shareText.trim())
      .then(() => toast.success("Suggestion copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard."));
  };
  const suggestedApp = result ? allAppTypes.find(app => app.id === result.appId) : null;
  return (
    <Card className="bg-card border mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI-Powered App Suggester
        </CardTitle>
        <CardDescription>
          Describe your app idea, and our AI will suggest a starting template and key features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., 'A social network for dog lovers to share photos and organize playdates.'"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          disabled={isLoading}
        />
        <Button onClick={handleSubmit} disabled={isLoading || !description.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Get Suggestion'
          )}
        </Button>
        {error && (
          <div className="flex items-center gap-2 text-red-600 p-3 bg-red-500/10 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}
        {result && suggestedApp && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>AI Suggestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-muted-foreground">Suggested App Type</h3>
                <p className="text-lg font-bold text-primary">{suggestedApp.name}</p>
                <p className="text-sm text-muted-foreground">{suggestedApp.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground">Recommended Features</h3>
                <ul className="mt-2 space-y-2">
                  {result.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Suggestion
                </Button>
                {result && (
                  <Button size="sm" onClick={() => onSelect(result)} className="group">
                    Use this Suggestion
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}