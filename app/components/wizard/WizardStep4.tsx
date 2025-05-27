import { useState } from 'react'
import { FormData } from '../../request/page'
import { DocumentArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep4({ formData, updateFormData }: Props) {
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/gif']
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB limit
    })
    
    updateFormData({ 
      contentFiles: [...formData.contentFiles, ...validFiles],
      hasContent: true
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = formData.contentFiles.filter((_, i) => i !== index)
    updateFormData({ 
      contentFiles: updatedFiles,
      hasContent: updatedFiles.length > 0
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Do you have existing content?
        </h2>
        <p className="text-gray-600">
          Upload any existing content like text, images, or documents. If you don't have content ready, our AI will help generate it for you.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <button
            onClick={() => updateFormData({ hasContent: true })}
            className={`flex-1 p-4 rounded-lg border-2 text-center transition-all duration-200 ${
              formData.hasContent
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-2xl mb-2">📁</div>
            <h3 className="font-semibold text-gray-900 mb-1">Yes, I have content</h3>
            <p className="text-sm text-gray-600">I'll upload my existing content</p>
          </button>

          <button
            onClick={() => updateFormData({ hasContent: false, contentFiles: [] })}
            className={`flex-1 p-4 rounded-lg border-2 text-center transition-all duration-200 ${
              !formData.hasContent
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-1">Generate with AI</h3>
            <p className="text-sm text-gray-600">Let AI create content for me</p>
          </button>
        </div>

        {formData.hasContent && (
          <div>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <DocumentArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF (max 10MB each)
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                <DocumentArrowUpIcon className="w-5 h-5" />
                Choose Files
              </label>
            </div>

            {formData.contentFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Uploaded Files ({formData.contentFiles.length})
                </h4>
                <div className="space-y-2">
                  {formData.contentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded flex items-center justify-center">
                          📄
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!formData.hasContent && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-medium text-blue-800 mb-2">
              🤖 AI Content Generation
            </h3>
            <p className="text-blue-700 text-sm mb-3">
              Our AI will create professional content for your website based on your business information, including:
            </p>
            <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
              <li>Compelling homepage copy</li>
              <li>About us section</li>
              <li>Service/product descriptions</li>
              <li>Contact page content</li>
              <li>SEO-optimized text</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
