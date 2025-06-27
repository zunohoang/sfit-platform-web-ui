'use client';

import { useState, useRef } from 'react';
import {
  XMarkIcon,
  CameraIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  onSave: (avatarFile: File | null) => void;
}

export default function AvatarUploadModal({
  isOpen,
  onClose,
  currentAvatar,
  onSave
}: AvatarUploadModalProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(selectedFile);
    onClose();
  };

  const handleClose = () => {
    setPreview(currentAvatar || null);
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Cập nhật ảnh đại diện</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mx-auto mb-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                  <CameraIcon className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-8 bg-[#267452] text-white p-2 rounded-full hover:bg-[#1f5e42] transition-colors duration-200"
            >
              <CameraIcon className="w-4 h-4" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary"
          >
            Chọn ảnh mới
          </button>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            className="btn-secondary flex-1"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <CheckIcon className="w-4 h-4 mr-2" />
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
