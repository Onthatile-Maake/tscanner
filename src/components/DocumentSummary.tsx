import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface SummaryData {
  title: string;
  keyPoints: string[];
  riskLevel: 'low' | 'medium' | 'high';
  readingTime: string;
  summary: string;
  importantClauses: string[];
}

interface DocumentSummaryProps {
  summaryData: SummaryData | null;
  isLoading: boolean;
}

export const DocumentSummary = ({ summaryData, isLoading }: DocumentSummaryProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="shadow-soft border-accent/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Analyzing your document...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!summaryData) {
    return null;
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Low Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Medium Risk</Badge>;
      case 'high':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />High Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-soft border-accent/20">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">{summaryData.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Reading time: {summaryData.readingTime}</p>
              </div>
            </div>
            {getRiskBadge(summaryData.riskLevel)}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{summaryData.summary}</p>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="shadow-soft border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Key Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <ul className="space-y-3">
              {summaryData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Important Clauses */}
      <Card className="shadow-soft border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Important Clauses</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-4">
              {summaryData.importantClauses.map((clause, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg border border-accent/20">
                  <p className="text-foreground text-sm leading-relaxed">{clause}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};