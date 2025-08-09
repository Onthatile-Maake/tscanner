import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  selectedFile: File | null;
  isAnalyzing: boolean;
}

export const DocumentUpload = ({ onFileSelect, onAnalyze, selectedFile, isAnalyzing }: DocumentUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.txt')) {
        onFileSelect(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or text file.",
          variant: "destructive",
        });
      }
    }
  }, [onFileSelect, toast]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const removeFile = useCallback(() => {
    onFileSelect(null as any);
  }, [onFileSelect]);

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-accent/20">
        <CardContent className="p-8">
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${isDragOver 
                ? 'border-primary bg-primary/5 scale-105' 
                : 'border-muted-foreground/25 hover:border-accent/50 hover:bg-accent/5'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gradient-primary rounded-full">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Upload Your Document
                </h3>
                <p className="text-muted-foreground">
                  Drag and drop your Terms & Conditions document here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF and text files
                </p>
              </div>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Choose File
              </Button>
              <input
                id="file-input"
                type="file"
                accept=".pdf,.txt,text/plain,application/pdf"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedFile && (
        <Card className="shadow-soft border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onAnalyze}
                  disabled={isAnalyzing}
                  className="bg-gradient-primary hover:opacity-90 text-white shadow-soft"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};