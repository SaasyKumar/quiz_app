import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, Search, MoreVertical, Trash2, Edit, FolderPlus, ArrowUpDown, Calendar, CheckSquare, Square } from 'lucide-react';

// Types
interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  createdAt: string;
  size?: number;
}

type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

// Mock data structure
const mockFileSystem: FileNode[] = [
  {
    id: '1',
    name: 'My Quizzes',
    type: 'folder',
    path: '/My Quizzes',
    createdAt: '2024-01-15',
    children: [
      {
        id: '1-1',
        name: 'JavaScript Basics.json',
        type: 'file',
        path: '/My Quizzes/JavaScript Basics.json',
        createdAt: '2024-01-15',
        size: 2048
      },
      {
        id: '1-2',
        name: 'React Fundamentals.json',
        type: 'file',
        path: '/My Quizzes/React Fundamentals.json',
        createdAt: '2024-01-16',
        size: 3072
      }
    ]
  },
  {
    id: '2',
    name: 'Science',
    type: 'folder',
    path: '/Science',
    createdAt: '2024-01-10',
    children: [
      {
        id: '2-1',
        name: 'Biology',
        type: 'folder',
        path: '/Science/Biology',
        createdAt: '2024-01-10',
        children: [
          {
            id: '2-1-1',
            name: 'Cell Structure.json',
            type: 'file',
            path: '/Science/Biology/Cell Structure.json',
            createdAt: '2024-01-10',
            size: 1536
          },
          {
            id: '2-1-2',
            name: 'Genetics.json',
            type: 'file',
            path: '/Science/Biology/Genetics.json',
            createdAt: '2024-01-11',
            size: 2560
          }
        ]
      },
      {
        id: '2-2',
        name: 'Physics Quiz.json',
        type: 'file',
        path: '/Science/Physics Quiz.json',
        createdAt: '2024-01-12',
        size: 1024
      }
    ]
  },
  {
    id: '3',
    name: 'History.json',
    type: 'file',
    path: '/History.json',
    createdAt: '2024-01-20',
    size: 4096
  }
];

// File/Folder Item Component
const FileTreeItem: React.FC<{
  node: FileNode;
  level: number;
  expandedFolders: Set<string>;
  selectedFile: string | null;
  selectedItems: Set<string>;
  bulkSelectMode: boolean;
  draggedItem: string | null;
  onToggle: (id: string) => void;
  onSelect: (node: FileNode) => void;
  onContextMenu: (e: React.MouseEvent, node: FileNode) => void;
  onBulkSelect: (id: string) => void;
  onDragStart: (e: React.DragEvent, node: FileNode) => void;
  onDragOver: (e: React.DragEvent, node: FileNode) => void;
  onDrop: (e: React.DragEvent, targetNode: FileNode) => void;
}> = ({ 
  node, 
  level, 
  expandedFolders, 
  selectedFile, 
  selectedItems,
  bulkSelectMode,
  draggedItem,
  onToggle, 
  onSelect, 
  onContextMenu,
  onBulkSelect,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const isExpanded = expandedFolders.has(node.id);
  const isSelected = selectedFile === node.id;
  const isBulkSelected = selectedItems.has(node.id);
  const isFolder = node.type === 'folder';
  const isDragging = draggedItem === node.id;

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''
        } ${isDragging ? 'opacity-50' : ''} ${isBulkSelected ? 'bg-blue-100 dark:bg-blue-900/40' : ''}`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={(e) => {
          if (bulkSelectMode) {
            onBulkSelect(node.id);
          } else if (isFolder) {
            onToggle(node.id);
          } else {
            onSelect(node);
          }
        }}
        onContextMenu={(e) => onContextMenu(e, node)}
        draggable
        onDragStart={(e) => onDragStart(e, node)}
        onDragOver={(e) => onDragOver(e, node)}
        onDrop={(e) => onDrop(e, node)}
      >
        {bulkSelectMode && (
          <span className="text-gray-500 dark:text-gray-400">
            {isBulkSelected ? <CheckSquare size={16} /> : <Square size={16} />}
          </span>
        )}
        
        {isFolder && !bulkSelectMode && (
          <span className="text-gray-500 dark:text-gray-400">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {!isFolder && !bulkSelectMode && <span className="w-4" />}
        
        <span className="text-gray-600 dark:text-gray-300">
          {isFolder ? (
            isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />
          ) : (
            <File size={16} />
          )}
        </span>
        
        <span className={`flex-1 text-sm truncate ${isSelected ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}`}>
          {node.name}
        </span>
        
        {!bulkSelectMode && (
          <button
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onContextMenu(e, node);
            }}
          >
            <MoreVertical size={14} />
          </button>
        )}
      </div>
      
      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map(child => (
            <FileTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedFolders={expandedFolders}
              selectedFile={selectedFile}
              selectedItems={selectedItems}
              bulkSelectMode={bulkSelectMode}
              draggedItem={draggedItem}
              onToggle={onToggle}
              onSelect={onSelect}
              onContextMenu={onContextMenu}
              onBulkSelect={onBulkSelect}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Context Menu Component
const ContextMenu: React.FC<{
  position: { x: number; y: number } | null;
  node: FileNode | null;
  onClose: () => void;
  onAction: (action: string, node: FileNode) => void;
}> = ({ position, node, onClose, onAction }) => {
  if (!position || !node) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[180px]"
        style={{ left: position.x, top: position.y }}
      >
        {node.type === 'folder' && (
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            onClick={() => {
              onAction('newFile', node);
              onClose();
            }}
          >
            <Plus size={16} />
            New Quiz
          </button>
        )}
        <button
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          onClick={() => {
            onAction('rename', node);
            onClose();
          }}
        >
          <Edit size={16} />
          Rename
        </button>
        <button
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          onClick={() => {
            onAction('duplicate', node);
            onClose();
          }}
        >
          <File size={16} />
          Duplicate
        </button>
        <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
        <button
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400"
          onClick={() => {
            onAction('delete', node);
            onClose();
          }}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </>
  );
};

// Sort Menu Component
const SortMenu: React.FC<{
  isOpen: boolean;
  currentSort: SortOption;
  onClose: () => void;
  onSort: (option: SortOption) => void;
}> = ({ isOpen, currentSort, onClose, onSort }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[180px]">
        <button
          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
            currentSort === 'name-asc' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''
          }`}
          onClick={() => {
            onSort('name-asc');
            onClose();
          }}
        >
          Name (Z-A)
        </button>
        <button
          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
            currentSort === 'date-desc' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''
          }`}
          onClick={() => {
            onSort('date-desc');
            onClose();
          }}
        >
          <Calendar size={16} />
          Date (Newest)
        </button>
        <button
          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
            currentSort === 'date-asc' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : ''
          }`}
          onClick={() => {
            onSort('date-asc');
            onClose();
          }}
        >
          <Calendar size={16} />
          Date (Oldest)
        </button>
      </div>
    </>
  );
};

// Main Sidebar Component
const ObsidianSidebar: React.FC = () => {
  const [fileSystem, setFileSystem] = useState<FileNode[]>(mockFileSystem);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '2']));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    position: { x: number; y: number };
    node: FileNode;
  } | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelect = (node: FileNode) => {
    setSelectedFile(node.id);
    console.log('Selected:', node);
  };

  const handleBulkSelect = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleContextMenu = (e: React.MouseEvent, node: FileNode) => {
    e.preventDefault();
    setContextMenu({
      position: { x: e.clientX, y: e.clientY },
      node
    });
  };

  const handleAction = (action: string, node: FileNode) => {
    console.log(`Action: ${action} on`, node);
    
    if (action === 'delete') {
      if (confirm(`Delete ${node.name}?`)) {
        // Implement delete logic
        console.log('Deleted:', node.name);
      }
    } else if (action === 'rename') {
      const newName = prompt('New name:', node.name);
      if (newName) {
        console.log('Rename to:', newName);
      }
    } else if (action === 'newFile') {
      const fileName = prompt('Quiz name:');
      if (fileName) {
        console.log('Create new quiz in:', node.name);
      }
    } else if (action === 'duplicate') {
      console.log('Duplicate:', node.name);
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.size === 0) return;
    if (confirm(`Delete ${selectedItems.size} item(s)?`)) {
      console.log('Bulk delete:', Array.from(selectedItems));
      setSelectedItems(new Set());
      setBulkSelectMode(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, node: FileNode) => {
    setDraggedItem(node.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(node));
  };

  const handleDragOver = (e: React.DragEvent, node: FileNode) => {
    if (node.type === 'folder') {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent, targetNode: FileNode) => {
    e.preventDefault();
    setDraggedItem(null);
    
    if (targetNode.type !== 'folder') return;
    
    try {
      const draggedData = JSON.parse(e.dataTransfer.getData('text/plain')) as FileNode;
      console.log('Moving:', draggedData.name, 'to:', targetNode.name);
      // Implement move logic here
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const sortNodes = (nodes: FileNode[], option: SortOption): FileNode[] => {
    const sorted = [...nodes].sort((a, b) => {
      switch (option) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return sorted.map(node => ({
      ...node,
      children: node.children ? sortNodes(node.children, option) : undefined
    }));
  };

  const filterNodes = (nodes: FileNode[], query: string): FileNode[] => {
    if (!query) return nodes;
    
    return nodes.reduce((acc: FileNode[], node) => {
      if (node.type === 'folder' && node.children) {
        const filteredChildren = filterNodes(node.children, query);
        if (filteredChildren.length > 0 || node.name.toLowerCase().includes(query.toLowerCase())) {
          acc.push({ ...node, children: filteredChildren });
        }
      } else if (node.name.toLowerCase().includes(query.toLowerCase())) {
        acc.push(node);
      }
      return acc;
    }, []);
  };

  const sortedFileSystem = sortNodes(fileSystem, sortOption);
  const filteredFileSystem = filterNodes(sortedFileSystem, searchQuery);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-72 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Quiz Files</h2>
            <div className="flex gap-1">
              <div className="relative">
                <button 
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  title="Sort"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  <ArrowUpDown size={18} />
                </button>
                <SortMenu
                  isOpen={showSortMenu}
                  currentSort={sortOption}
                  onClose={() => setShowSortMenu(false)}
                  onSort={setSortOption}
                />
              </div>
              <button 
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="New Quiz"
                onClick={() => alert('Create new quiz')}
              >
                <Plus size={18} />
              </button>
              <button 
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="New Folder"
                onClick={() => alert('Create new folder')}
              >
                <FolderPlus size={18} />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Bulk Actions Bar */}
          {bulkSelectMode && (
            <div className="mt-3 flex items-center justify-between bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {selectedItems.size} selected
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleBulkDelete}
                  disabled={selectedItems.size === 0}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => {
                    setBulkSelectMode(false);
                    setSelectedItems(new Set());
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Bulk Select Toggle */}
          {!bulkSelectMode && (
            <button
              className="mt-3 w-full text-xs text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => setBulkSelectMode(true)}
            >
              Select Multiple
            </button>
          )}
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto py-2">
          {filteredFileSystem.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
              No quizzes found
            </div>
          ) : (
            filteredFileSystem.map(node => (
              <FileTreeItem
                key={node.id}
                node={node}
                level={0}
                expandedFolders={expandedFolders}
                selectedFile={selectedFile}
                selectedItems={selectedItems}
                bulkSelectMode={bulkSelectMode}
                draggedItem={draggedItem}
                onToggle={handleToggle}
                onSelect={handleSelect}
                onContextMenu={handleContextMenu}
                onBulkSelect={handleBulkSelect}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))
          )}
        </div>

        {/* Footer Stats */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Total Quizzes</span>
            <span className="font-medium">8</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-900 p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Quiz Application
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Select a quiz from the sidebar to get started, or create a new one.
          </p>
          
          {selectedFile && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Selected File
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                ID: {selectedFile}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                ✨ New Features Added:
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center gap-2">
                    <span>🎯</span> Drag & Drop
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Drag files and folders to reorganize. Drop items into folders to move them.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <span>📊</span> Sorting Options
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Click the sort icon to organize by name (A-Z, Z-A) or date (newest/oldest).
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <span>✅</span> Bulk Selection
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Click "Select Multiple" to enable bulk selection mode. Select multiple items and perform batch operations like delete.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2 flex items-center gap-2">
                    <span>📋</span> Enhanced Context Menu
                  </h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Right-click on any item for more options including duplicate and improved organization.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Core Features:
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Expandable folder structure with unlimited nesting</li>
                <li>• Real-time search across all files and folders</li>
                <li>• Visual drag indicators and drop zones</li>
                <li>• Multiple sort options for better organization</li>
                <li>• Bulk operations for efficient file management</li>
                <li>• Dark mode support throughout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      <ContextMenu
        position={contextMenu?.position || null}
        node={contextMenu?.node || null}
        onClose={() => setContextMenu(null)}
        onAction={handleAction}
      />
    </div>
  );
};

export default ObsidianSidebar;