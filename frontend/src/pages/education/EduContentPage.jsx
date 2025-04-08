import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EduContentPage = () => {
  const [contents, setContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edu-content`);
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContents = selectedCategory === 'all'
    ? contents
    : contents.filter(content => content.category === selectedCategory);

  const categories = ['all', 'Research', 'News', 'Guide', 'Tutorial', 'Report'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">E-Waste Education Hub</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-6">
              {loading ? (
                <div className="text-center text-gray-400">Loading...</div>
              ) : filteredContents.length === 0 ? (
                <div className="text-center text-gray-400">No content available</div>
              ) : (
                filteredContents.map(content => (
                  <Card key={content._id} className="bg-gray-800 border-gray-700 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-green-400">{content.title}</h2>
                          <div className="flex items-center space-x-4 text-gray-400 text-sm mt-2">
                            <span>{content.category}</span>
                            <span>•</span>
                            <span>{content.metadata.readTime} min read</span>
                            <span>•</span>
                            <span>{content.metadata.difficulty}</span>
                            <span>•</span>
                            <span>{new Date(content.publishDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-gray-300">{content.summary}</p>

                        {content.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-4">
                            {content.images.map((img, index) => (
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
                          {content.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-300">{paragraph}</p>
                          ))}
                        </div>

                        {content.references.length > 0 && (
                          <div className="border-t border-gray-700 pt-4">
                            <h3 className="text-lg font-semibold text-white mb-2">References</h3>
                            <ul className="list-disc list-inside text-gray-400">
                              {content.references.map((ref, index) => (
                                <li key={index}>
                                  <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-400 transition-colors"
                                  >
                                    {ref.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {content.footer && (
                          <div className="border-t border-gray-700 pt-4 mt-6">
                            <p className="text-gray-400 text-sm">{content.footer}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default EduContentPage;