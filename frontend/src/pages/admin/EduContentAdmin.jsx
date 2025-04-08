import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EduContentAdmin = () => {
  const [contents, setContents] = useState([]);
  const [currentContent, setCurrentContent] = useState({
    title: '',
    content: '',
    summary: '',
    category: 'Guide',
    tags: [],
    images: [],
    references: [],
    footer: '',
    metadata: {
      readTime: 0,
      difficulty: 'Beginner',
      featured: false
    }
  });
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/edu-content');
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentContent(prev => ({
          ...prev,
          images: [...prev.images, { url: reader.result, caption: '' }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/edu-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentContent)
      });
      if (response.ok) {
        fetchContents();
        setCurrentContent({
          title: '',
          content: '',
          summary: '',
          category: 'Guide',
          tags: [],
          images: [],
          references: [],
          footer: '',
          metadata: {
            readTime: 0,
            difficulty: 'Beginner',
            featured: false
          }
        });
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">E-Waste Education Content Management</h1>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      className="bg-gray-700 border-gray-600 text-white"
                      value={currentContent.title}
                      onChange={(e) => setCurrentContent({ ...currentContent, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Category</Label>
                    <Select
                      value={currentContent.category}
                      onValueChange={(value) => setCurrentContent({ ...currentContent, category: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Research', 'News', 'Guide', 'Tutorial', 'Report'].map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Summary</Label>
                  <Textarea
                    className="bg-gray-700 border-gray-600 text-white"
                    value={currentContent.summary}
                    onChange={(e) => setCurrentContent({ ...currentContent, summary: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Content</Label>
                  <Textarea
                    className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
                    value={currentContent.content}
                    onChange={(e) => setCurrentContent({ ...currentContent, content: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Images</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {currentContent.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img.url} alt="" className="w-full h-32 object-cover rounded-lg" />
                        <Input
                          className="mt-2 bg-gray-700 border-gray-600 text-white text-sm"
                          placeholder="Caption"
                          value={img.caption}
                          onChange={(e) => {
                            const newImages = [...currentContent.images];
                            newImages[index].caption = e.target.value;
                            setCurrentContent({ ...currentContent, images: newImages });
                          }}
                        />
                      </div>
                    ))}
                    <div
                      className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
                      onClick={() => document.getElementById('imageUpload').click()}
                    >
                      <span className="text-gray-500">+ Add Image</span>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Read Time (minutes)</Label>
                    <Input
                      type="number"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={currentContent.metadata.readTime}
                      onChange={(e) => setCurrentContent({
                        ...currentContent,
                        metadata: { ...currentContent.metadata, readTime: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Difficulty</Label>
                    <Select
                      value={currentContent.metadata.difficulty}
                      onValueChange={(value) => setCurrentContent({
                        ...currentContent,
                        metadata: { ...currentContent.metadata, difficulty: value }
                      })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                          <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Footer</Label>
                  <Textarea
                    className="bg-gray-700 border-gray-600 text-white"
                    value={currentContent.footer}
                    onChange={(e) => setCurrentContent({ ...currentContent, footer: e.target.value })}
                  />
                </div>

                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleSubmit}
                >
                  Save Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-green-400">{currentContent.title}</h2>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm mt-2">
                      <span>{currentContent.category}</span>
                      <span>•</span>
                      <span>{currentContent.metadata.readTime} min read</span>
                      <span>•</span>
                      <span>{currentContent.metadata.difficulty}</span>
                    </div>
                  </div>

                  <p className="text-gray-300">{currentContent.summary}</p>

                  {currentContent.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {currentContent.images.map((img, index) => (
                        <div key={index}>
                          <img src={img.url} alt="" className="w-full h-48 object-cover rounded-lg" />
                          {img.caption && (
                            <p className="text-gray-400 text-sm mt-2">{img.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    {currentContent.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-300">{paragraph}</p>
                    ))}
                  </div>

                  {currentContent.footer && (
                    <div className="border-t border-gray-700 pt-4 mt-6">
                      <p className="text-gray-400 text-sm">{currentContent.footer}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EduContentAdmin;