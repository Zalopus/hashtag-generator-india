'use client';

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Heart, Copy, Trash2, Edit, Plus, Instagram, Facebook, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

interface SavedHashtagSet {
  _id: string;
  name: string;
  hashtags: string[];
  platform: 'facebook' | 'instagram' | 'youtube';
  category: string;
  createdAt: string;
}

export default function SavedPage() {
  return (
    <AuthProvider>
      <SavedContent />
    </AuthProvider>
  );
}

function SavedContent() {
  const { user } = useAuth();
  const [savedHashtags, setSavedHashtags] = useState<SavedHashtagSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    if (user) {
      fetchSavedHashtags();
    }
  }, [user]);

  const fetchSavedHashtags = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/hashtags/save', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavedHashtags(data.savedHashtags);
      } else {
        toast.error('Failed to load saved hashtags');
      }
    } catch (error) {
      console.error('Error fetching saved hashtags:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hashtag set?')) return;
    
    try {
      const response = await fetch(`/api/hashtags/save?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        setSavedHashtags(savedHashtags.filter(set => set._id !== id));
        toast.success('Hashtag set deleted successfully');
      } else {
        toast.error('Failed to delete hashtag set');
      }
    } catch (error) {
      console.error('Error deleting hashtag set:', error);
      toast.error('Network error');
    }
  };

  const handleCopy = async (hashtags: string[]) => {
    const hashtagText = hashtags.map(tag => `#${tag}`).join(' ');
    try {
      await navigator.clipboard.writeText(hashtagText);
      toast.success('Hashtags copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy hashtags');
    }
  };

  const handleEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editingName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    // Here you would typically make an API call to update the name
    // For now, we'll just update the local state
    setSavedHashtags(savedHashtags.map(set => 
      set._id === id ? { ...set, name: editingName } : set
    ));
    
    setEditingId(null);
    setEditingName('');
    toast.success('Hashtag set updated successfully');
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-600';
      case 'facebook':
        return 'from-blue-600 to-blue-800';
      case 'youtube':
        return 'from-red-500 to-red-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h1>
            <p className="text-gray-600 mb-8">
              Please login to view and manage your saved hashtag sets.
            </p>
            <a
              href="/login"
              className="btn-primary"
            >
              Login Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Saved Hashtags
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
              {' '}Collections
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your favorite hashtag sets and organize them for easy access
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your saved hashtags...</p>
          </div>
        ) : savedHashtags.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Saved Hashtags Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start generating hashtags and save your favorite sets for quick access later.
            </p>
            <a
              href="/"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Generate Hashtags</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedHashtags.map((hashtagSet) => (
              <div
                key={hashtagSet._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {editingId === hashtagSet._id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full text-lg font-bold text-gray-900 border border-gray-300 rounded px-2 py-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit(hashtagSet._id);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {hashtagSet.name}
                      </h3>
                    )}
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r ${getPlatformColor(hashtagSet.platform)} text-white`}>
                        {getPlatformIcon(hashtagSet.platform)}
                        <span className="capitalize">{hashtagSet.platform}</span>
                      </div>
                      <span className="capitalize">{hashtagSet.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(hashtagSet._id, hashtagSet.name)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit name"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(hashtagSet._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hashtags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {hashtagSet.hashtags.slice(0, 8).map((hashtag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                      >
                        #{hashtag}
                      </span>
                    ))}
                    {hashtagSet.hashtags.length > 8 && (
                      <span className="text-sm text-gray-500">
                        +{hashtagSet.hashtags.length - 8} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    {hashtagSet.hashtags.length} hashtags • {new Date(hashtagSet.createdAt).toLocaleDateString()}
                  </span>
                  
                  <button
                    onClick={() => handleCopy(hashtagSet.hashtags)}
                    className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy All</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {savedHashtags.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{savedHashtags.length}</div>
                <div className="text-sm text-gray-600">Saved Sets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {savedHashtags.reduce((total, set) => total + set.hashtags.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Hashtags</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {new Set(savedHashtags.map(set => set.platform)).size}
                </div>
                <div className="text-sm text-gray-600">Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(savedHashtags.map(set => set.category)).size}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
