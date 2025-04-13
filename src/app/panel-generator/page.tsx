'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const TEMPLATES = [
  { 
    id: 'Banner',
    image: '/big-1.png',
    title: 'Stream Panel 1',
    description: 'Perfect for streamers or for any use.',
    downloadName: 'panel1'
  },
  { 
    id: 'Free Case',
    image: '/big-free-case.png',
    title: 'Stream Panel 2',
    description: 'Perfect for streamers or for any use.',
    downloadName: 'panel2'
  },
  { 
    id: 'Profile Banner',
    image: '/profile-banner.png',
    title: 'Profile Banner',
    description: 'For Discord, Twitter profile banner.',
    downloadName: 'profile'
  },
  { 
    id: 'Overlay 1',
    image: '/overlay-1.png',
    title: 'Stream Overlay 1',
    description: 'Perfect fit for a stream overlay.',
    downloadName: 'overlay1'
  },
  { 
    id: 'Overlay 2',
    image: '/overlay-2.png',
    title: 'Stream Overlay 2',
    description: 'Perfect fit for a stream overlay.',
    downloadName: 'overlay2'
  },
];

export default function BannerGenerator() {
  const [code, setCode] = useState('');
  const [generatedImages, setGeneratedImages] = useState<{ [key: string]: string }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value.toUpperCase();
    if (newCode.length <= 11) {
      setCode(newCode);
    }
  };

  const generateAllImages = () => {
    const canvas = canvasRef.current;
    if (!canvas || !code) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newGeneratedImages: { [key: string]: string } = {};

    TEMPLATES.forEach(template => {
      const image = new Image();
      image.src = template.image;
      
      image.onload = () => {
        // Set canvas size to match template image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw template image
        ctx.drawImage(image, 0, 0);

        // Configure text style
        const isProfileBanner = template.id === 'Profile Banner';
        const isOverlay1 = template.id === 'Overlay 1';
        const isOverlay2 = template.id === 'Overlay 2';
        ctx.font = isProfileBanner ? '170px "Flama"' : 
                   (isOverlay1 || isOverlay2) ? '30px "Flama"' : 
                   '120px "Flama"';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate position
        let x = canvas.width / 2;
        let y = canvas.height - 100;

        // Specific positioning for different templates
        if (isOverlay1) {
          x = canvas.width - 190; // 190px from right corner
          y = 102; // 102px from top
        } else if (isOverlay2) {
          x = canvas.width - 369; // 369px from right corner
          y = 102; // 102px from top
        } else if (isProfileBanner) {
          y = canvas.height / 2;
        }

        // Draw text in uppercase
        ctx.fillText(code.toUpperCase(), x, y);

        // Convert to data URL
        newGeneratedImages[template.id] = canvas.toDataURL('image/png');
        setGeneratedImages(prev => ({ ...prev, [template.id]: newGeneratedImages[template.id] }));
      };
    });
  };

  const downloadImage = (templateId: string) => {
    const image = generatedImages[templateId];
    if (!image) return;

    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const link = document.createElement('a');
    link.href = image;
    link.download = `${code.toLowerCase()}_${template.downloadName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyImage = async (templateId: string) => {
    const image = generatedImages[templateId];
    if (!image) return;

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      setCopiedId(templateId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy image to clipboard');
    }
  };

  // Load Flama font
  useEffect(() => {
    const loadFont = async () => {
      try {
        const font = new FontFace(
          'Flama',
          `url(/fonts/Flama.otf) format('opentype')`
        );
        await font.load();
        document.fonts.add(font);
      } catch (err) {
        console.error('Error loading font:', err);
      }
    };
    loadFont();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-[#00FF00] hover:text-[#00FF00]/80 transition-colors bg-black border border-[#00FF00] rounded px-4 py-2"
          >
            <span>←</span>
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#00FF00] text-center">Banner Design Generator</h1>
          <div className="w-[100px]"></div> {/* Spacer matching button width */}
        </div>

        <div className="bg-black border border-[#00FF00] rounded-lg p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="Enter your code here"
                  maxLength={11}
                  className="w-full bg-black border-2 border-[#00FF00] focus:border-[#00FF00] outline-none rounded px-4 py-2 text-white transition-colors"
                />
                <div className="text-right text-sm text-[#00FF00] mt-1">
                  {code.length}/11 characters
                </div>
              </div>
              <button 
                onClick={generateAllImages}
                className="bg-[#00FF00] text-black px-6 py-2 rounded hover:bg-[#00FF00]/90 transition-colors font-medium"
              >
                Generate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEMPLATES.map((template) => (
                <div key={template.id} className="flex flex-col gap-4">
                  <div className="bg-[#111] p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-[#00FF00] mb-2">{template.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{template.description}</p>
                    {generatedImages[template.id] ? (
                      <>
                        <div 
                          className="cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setPreviewImage(generatedImages[template.id])}
                        >
                          <img
                            src={generatedImages[template.id]}
                            alt={template.title}
                            className="w-full rounded-lg shadow-lg mb-4"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => downloadImage(template.id)}
                            className="flex-1 bg-[#00FF00] text-black px-4 py-2 rounded text-sm hover:bg-[#00FF00]/90 transition-colors font-medium"
                          >
                            Download
                          </button>
                          <button 
                            onClick={() => copyImage(template.id)}
                            className={`flex-1 bg-[#00FF00] text-black px-4 py-2 rounded text-sm hover:bg-[#00FF00]/90 transition-colors font-medium ${copiedId === template.id ? 'animate-pulse' : ''}`}
                          >
                            {copiedId === template.id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full rounded-lg shadow-lg opacity-50"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Full-size preview popup */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 text-white hover:text-[#00FF00] text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 