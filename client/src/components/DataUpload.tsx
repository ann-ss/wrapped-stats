/* Kinetic Maximalism: Playful file upload interface with drag-and-drop */

import { motion } from "framer-motion";
import { Upload, FileJson, X, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DataUploadProps {
  onDataLoaded: (data: any) => void;
  onClose: () => void;
}

export default function DataUpload({ onDataLoaded, onClose }: DataUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Check file type
    if (!file.name.endsWith('.json')) {
      setUploadStatus("error");
      setErrorMessage("Please upload a JSON file");
      toast.error("Invalid file type. Please upload a .json file");
      return;
    }

    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setUploadStatus("error");
      setErrorMessage("File is too large (max 1MB)");
      toast.error("File is too large. Maximum size is 1MB");
      return;
    }

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate data structure
      if (!validateData(data)) {
        setUploadStatus("error");
        setErrorMessage("Invalid data format. Please check the documentation.");
        toast.error("Invalid JSON structure");
        return;
      }

      setUploadStatus("success");
      toast.success("Data loaded successfully!");
      
      // Wait a moment before closing to show success state
      setTimeout(() => {
        onDataLoaded(data);
        onClose();
      }, 1000);
      
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage("Failed to parse JSON file");
      toast.error("Invalid JSON format");
    }
  };

  const validateData = (data: any): boolean => {
    // Check required fields
    if (!data.title || !data.subtitle || !Array.isArray(data.slides)) {
      return false;
    }

    // Check slides array
    if (data.slides.length === 0 || data.slides.length > 20) {
      return false;
    }

    // Validate each slide
    // TODO move validIcons to lib/dataUtils as source of truth
    const validIcons = ["clock", "music", "sparkles", "trending", "heart", "award", "trophy", "star", "calendar", "image", "plane", "message", "heartbreak", "steps", "utensils", "phone"];
    
    for (const slide of data.slides) {
      if (!slide.type) return false;
      
      // Validate based on slide type
      if (slide.type === "stat") {
        if (!slide.title || slide.value === undefined) return false;
        if (!slide.icon || !validIcons.includes(slide.icon)) {
          toast.error("Invalid slide icon ${slide.icon}, replacing with sparkles");
        }
        // backgroundIndex and customPhoto are optional
      } else if (slide.type === "top-ranking") {
        if (!slide.title || !Array.isArray(slide.items)) return false;
        for (const item of slide.items) {
          if (typeof item.rank !== "number" || !item.title || item.value === undefined) return false;
        }
      } else if (slide.type === "timeline") {
        if (!slide.title || !Array.isArray(slide.events)) return false;
        for (const event of slide.events) {
          if (!event.date || !event.title) return false;
        }
      } else if (slide.type === "photo-carousel") {
        if (!slide.title || !Array.isArray(slide.photos)) return false;
      } else {
        return false; // Unknown slide type
      }
    }

    return true;
  };

  const downloadExample = () => {
    const exampleData = {
      title: "Your Year in Stats",
      subtitle: "2025 Wrapped",
      slides: [
        {
          type: "stat",
          title: "Total Listening Time",
          value: "52,847",
          subtitle: "minutes of pure vibes",
          icon: "clock",
          backgroundIndex: 0
        },
        {
          type: "stat",
          title: "Top Genre",
          value: "Indie Pop",
          subtitle: "You're a trendsetter",
          icon: "music",
          backgroundIndex: 1
        }
      ]
    };

    const blob = new Blob([JSON.stringify(exampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-border"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileJson className="w-8 h-8 text-primary" />
            <h2 className="font-display text-3xl text-holographic">Upload Your Data</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
            isDragging
              ? "border-primary bg-primary/10 scale-105"
              : "border-border hover:border-primary/50"
          } ${
            uploadStatus === "success" ? "border-green-500 bg-green-500/10" :
            uploadStatus === "error" ? "border-red-500 bg-red-500/10" : ""
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploadStatus === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Upload className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <p className="font-body text-lg text-foreground mb-2">
                  Drag and drop your JSON file here
                </p>
                <p className="text-muted-foreground text-sm">or</p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="lg"
                className="font-display bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
              >
                Browse Files
              </Button>
            </motion.div>
          )}

          {uploadStatus === "success" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="space-y-4"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <p className="font-display text-xl text-green-500">
                Data loaded successfully!
              </p>
            </motion.div>
          )}

          {uploadStatus === "error" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="space-y-4"
            >
              <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
              <div>
                <p className="font-display text-xl text-red-500 mb-2">
                  Upload Failed
                </p>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
              </div>
              <Button
                onClick={() => {
                  setUploadStatus("idle");
                  setErrorMessage("");
                }}
                variant="outline"
              >
                Try Again
              </Button>
            </motion.div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-4">
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-display text-sm text-foreground mb-2">
              📋 Data Format Requirements
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 font-body">
              <li>• JSON file with title, subtitle, and slides array</li>
              <li>• Maximum 10 slides per presentation</li>
              <li>• Each slide needs: type, title, value, icon, backgroundIndex</li>
              <li>• Available icons: clock, music, sparkles, trending, heart, award</li>
            </ul>
          </div>

          <Button
            onClick={downloadExample}
            variant="outline"
            className="w-full font-display"
          >
            Download Example JSON
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
