import { useState } from 'react';
import { DocumentUpload } from '@/components/DocumentUpload';
import { DocumentSummary } from '@/components/DocumentSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Zap, Shield, Clock } from 'lucide-react';

interface SummaryData {
  title: string;
  keyPoints: string[];
  riskLevel: 'low' | 'medium' | 'high';
  readingTime: string;
  summary: string;
  importantClauses: string[];
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (!file) {
      setSummaryData(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate API call - replace this with your Python backend integration
    setTimeout(() => {
      const mockSummary: SummaryData = {
        title: selectedFile.name.replace(/\.[^/.]+$/, ""),
        summary: "This Terms & Conditions document outlines the legal agreement between the service provider and users. It covers user responsibilities, service limitations, data usage policies, and liability disclaimers. The document includes standard clauses for intellectual property protection and dispute resolution procedures.",
        keyPoints: [
          "Users must be 18 years or older to use the service",
          "Service provider reserves the right to modify terms with 30 days notice",
          "User data is collected and stored according to privacy policy",
          "Limited liability clause protects service provider from certain damages",
          "Dispute resolution through binding arbitration is required"
        ],
        riskLevel: 'medium',
        readingTime: "8-12 minutes",
        importantClauses: [
          "The service provider shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.",
          "You retain ownership of your content, but grant us a worldwide, royalty-free license to use, modify, and distribute your content in connection with the service.",
          "Either party may terminate this agreement at any time with or without cause by providing written notice to the other party."
        ]
      };
      
      setSummaryData(mockSummary);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleNewDocument = () => {
    setSelectedFile(null);
    setSummaryData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary shadow-soft">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">T&C Document Analyzer</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Upload your Terms & Conditions documents and get instant, AI-powered summaries highlighting key points and potential risks.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!summaryData ? (
          <div className="max-w-4xl mx-auto">
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="shadow-soft border-accent/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Instant Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Get comprehensive summaries in seconds, not hours of manual reading.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-accent/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Risk Assessment</h3>
                  <p className="text-muted-foreground text-sm">
                    Identify potential risks and concerning clauses automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-accent/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Save Time</h3>
                  <p className="text-muted-foreground text-sm">
                    Focus on what matters most with AI-highlighted key points.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Upload Component */}
            <DocumentUpload
              onFileSelect={handleFileSelect}
              onAnalyze={handleAnalyze}
              selectedFile={selectedFile}
              isAnalyzing={isAnalyzing}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Document Analysis</h2>
              <Button
                variant="outline"
                onClick={handleNewDocument}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FileText className="h-4 w-4 mr-2" />
                Analyze New Document
              </Button>
            </div>

            {/* Summary Component */}
            <DocumentSummary
              summaryData={summaryData}
              isLoading={isAnalyzing}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;