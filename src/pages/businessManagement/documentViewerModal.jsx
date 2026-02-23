import React from 'react';
import { X, Download, CheckCircle, XCircle } from 'lucide-react';

const DocumentViewerModal = ({ isOpen, onClose, document, onVerify, onReject }) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-brand-dark p-4 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-white font-bold text-lg">{document.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              document.status === 'Verified' ? 'bg-green-500 text-white' : 
              document.status === 'Missing' ? 'bg-gray-500 text-white' : 
              'bg-yellow-500 text-white'
            }`}>
              {document.status}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body - The Document Viewer */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto flex items-center justify-center">
          {document.status === 'Missing' ? (
             <div className="text-gray-400 font-bold flex flex-col items-center">
                <XCircle size={48} className="mb-2 opacity-50"/>
                No Document Uploaded
             </div>
          ) : (
            /* Replace src with document.url in real app */
            <img 
              src="https://via.placeholder.com/800x600?text=Document+Preview" 
              alt="Document" 
              className="max-w-full max-h-full object-contain shadow-lg border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* Footer - Actions */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white shrink-0">
          
          <button className="flex items-center gap-2 text-gray-600 hover:text-brand-dark font-bold text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <Download size={18} /> Download
          </button>

          <div className="flex gap-3">
             {document.status !== 'Missing' && (
                <>
                  <button 
                    onClick={() => { onReject(document); onClose(); }}
                    className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg font-bold text-sm transition"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                  <button 
                    onClick={() => { onVerify(document); onClose(); }}
                    className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg font-bold text-sm shadow-md transition"
                  >
                    <CheckCircle size={18} /> Verify Document
                  </button>
                </>
             )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default DocumentViewerModal;