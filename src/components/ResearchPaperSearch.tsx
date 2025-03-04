import React, { useState } from 'react';

interface Paper {
  title: string;
  abstract: string;
  authors: string[];
  url: string;
  journal: string;
}

const ResearchPaperSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Paper[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setResults([]);

        try {
          const apiUrl = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=5`;
          const response = await fetch(apiUrl);

          if (!response.ok) {
             throw new Error(`API request failed with status ${response.status}`);
          }

           const data = await response.json();
          if(data.message && data.message.items){
            const papers = data.message.items.map((item: any) => ({
                title: item.title ? item.title[0] : 'No Title',
                abstract: item.abstract || 'No Abstract', //some dont have abstract
                authors: item.author ? item.author.map((author: any) => `${author.given} ${author.family}`) : [],
                 url: item.URL,
                journal: item['container-title'] ? item['container-title'][0] : 'No Journal'
            }))
              setResults(papers)
            }else{
               setError('No results found. Please try a different query');
             }

        } catch (err: any) {
          setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl mt-8 m-2 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Research Paper Search</h2>
            <div className="mb-6 flex flex-col sm:flex-row items-center">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Enter your search query..."
                    className="p-3 border border-gray-300 rounded-md mr-0 mb-2 sm:mb-0 sm:mr-2 flex-1 text-black bg-white focus:ring-2 focus:ring-blue-200"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {results.length > 0 && (
                <div className="mt-6 space-y-4">
                    {results.map((paper, index) => (
                        <div key={index} className="bg-gray-50 rounded-md shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{paper.title}</h3>
                            <p className="text-gray-600 mb-1"><strong>Authors:</strong> {paper.authors.join(', ') || 'No authors listed'}</p>
                             <p className='text-gray-700 mb-2'><strong>Journal:</strong> {paper.journal}</p>
                              {paper.abstract !== 'No Abstract' && <details>
                                  <summary className='text-blue-500 cursor-pointer mb-1'>Abstract</summary>
                                  <div className="text-gray-800 mt-2" dangerouslySetInnerHTML={{ __html: paper.abstract }} />
                            </details>}
                            <a href={paper.url} target='_blank' rel='noopener noreferrer' className='text-blue-500 block mt-2 hover:underline'>Read More</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResearchPaperSearch;
