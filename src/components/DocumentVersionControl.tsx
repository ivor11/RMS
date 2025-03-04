import React, { useState, useRef} from 'react';

interface Version {
  id: number;
  name: string;
  content: string;
  timestamp: string;
  author: string;
}

const DocumentVersionControl: React.FC = () => {
  const initialContent = 'Initial Document Content';
  const [documentContent, setDocumentContent] = useState(initialContent);
  const [versions, setVersions] = useState<Version[]>([
    {
      id: 0,
      name: 'Initial Version',
      content: initialContent,
      timestamp: new Date().toLocaleString(),
      author: 'System',
    },
  ]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [newVersionName, setNewVersionName] = useState('');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewVersionName, setPreviewVersionName] = useState<string>('No version selected');
  const versionNameInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDocumentContent(e.target.value);
  };

  const handleVersionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVersionName(e.target.value);
  };

  const handleSaveVersion = () => {
    const newVersion: Version = {
      id: versions.length,
      name: newVersionName || `Version ${versions.length + 1}`,
      content: documentContent,
      timestamp: new Date().toLocaleString(),
      author: 'Current User',
    };
    setVersions([...versions, newVersion]);
    setCurrentVersionIndex(versions.length);
    setNewVersionName('');
  };

  const handleRevertVersion = (versionIndex: number) => {
    if (versionIndex >= 0 && versionIndex < versions.length) {
      setCurrentVersionIndex(versionIndex);
      setDocumentContent(versions[versionIndex].content);
       setPreviewContent(versions[versionIndex].content);
       setPreviewVersionName(versions[versionIndex].name)
    }
  };

  const handlePreviewVersion = (version: Version) => {
    setPreviewContent(version.content);
    setPreviewVersionName(version.name)
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mt-8 m-2 max-w-6xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Document Version Control</h2>
      <div className="flex">
        {/* Editor Section */}
        <div className="w-1/2 pr-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2 h-96"
            rows={5}
            value={documentContent}
            onChange={handleContentChange}
          />
            <div className="mb-2">
                    <input
                        id="version-name"
                        type="text"
                        ref={versionNameInputRef}
                      placeholder={`Version ${versions.length + 1}`}
                        className="w-full p-3 border border-gray-300 rounded-md text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
                       value={newVersionName}
                        onChange={handleVersionNameChange}
                    />
                </div>
          <div className="flex justify-end items-center">
            <button
              onClick={handleSaveVersion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Save New Version
            </button>
          </div>
        </div>

        {/* Version History Section */}
        <div className="w-1/2 pl-4 border-l border-gray-300 flex flex-col">
           {/* Version Preview Section */}
            <div className="mt-0 border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Version Preview</h3>
                  <h4 className="text-md font-medium text-gray-700 mb-2">Previewing: {previewVersionName}</h4>
                <div className="bg-gray-50 border border-gray-300 rounded-md p-3 overflow-y-auto">
                   <p className='whitespace-pre-line text-gray-800'>{previewContent}</p>
                </div>
            </div>
          <div className='flex-1'>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Version History</h3>
                  <ul className="space-y-2">
                      {versions.map((version, index) => (
                          <li
                              key={version.id}
                              className={`flex justify-between items-center bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition-colors duration-200 ${index === currentVersionIndex ? 'border-2 border-blue-400' : ''}`}
                          >
                              <div className="flex flex-col">
                                  <span className="font-medium text-gray-600">{version.name}</span>
                                  <span className="text-gray-500 text-sm">{`${version.timestamp} - By: ${version.author}`}</span>
                              </div>
                              <div className="flex">
                                  <button
                                      onClick={() => handleRevertVersion(index)}
                                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 mr-1"
                                  >
                                      Revert
                                  </button>
                                    <button onClick={() => handlePreviewVersion(version)} className='bg-gray-400 hover:bg-gray-500 text-white font-semibold py-1 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300'>Preview</button>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVersionControl;
