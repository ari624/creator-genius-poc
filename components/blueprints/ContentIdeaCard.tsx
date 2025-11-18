'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Check, X, Edit, Package } from 'lucide-react';
import { BPContentIdea } from '@/lib/types';

interface ContentIdeaCardProps {
  idea: BPContentIdea;
  onApprove: () => void;
  onReject: () => void;
  onEdit: () => void;
}

export default function ContentIdeaCard({
  idea,
  onApprove,
  onReject,
  onEdit,
}: ContentIdeaCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      // Swiped right - approve
      onApprove();
    } else if (info.offset.x < -threshold) {
      // Swiped left - reject
      onReject();
    } else if (info.offset.y < -threshold) {
      // Swiped up - edit
      onEdit();
    }
  };

  return (
    <motion.div
      className="absolute w-full max-w-2xl cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            IDEA #{idea.idea_number}
          </h3>
          <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            {idea.post_type.replace(/-/g, ' ').toUpperCase()}
          </span>
        </div>

        <div className="space-y-6">
          {/* Internal Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              📌 Internal Title
            </label>
            <p className="text-gray-800 font-mono bg-gray-50 px-4 py-2 rounded-lg">
              {idea.internal_title}
            </p>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              🎯 Topic
            </label>
            <p className="text-gray-800">{idea.topic}</p>
          </div>

          {/* Clickbait Overlay */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              ⚡ Clickbait Overlay
            </label>
            <p className="text-2xl font-bold text-gray-900">
              {idea.clickbait_overlay}
            </p>
          </div>

          {/* Hook Sentence */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              🎤 Hook Sentence
            </label>
            <p className="text-lg text-gray-800 italic">
              "{idea.hook_sentence}"
            </p>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              🔑 Keywords
            </label>
            <div className="flex flex-wrap gap-2">
              {idea.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Products Mentioned */}
          {idea.products_mentioned && idea.products_mentioned.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                <Package className="inline w-4 h-4 mr-1" />
                Products Mentioned
              </label>
              <div className="space-y-2">
                {idea.products_mentioned.map((product, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-gray-800">• {product.name}</span>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      (link)
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Context Notes */}
          {idea.context_notes && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                📝 Context/Script Notes
              </label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap text-sm">
                  {idea.context_notes}
                </p>
              </div>
            </div>
          )}

          {/* Sub-Niche */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">
              Sub-Niche: {idea.sub_niche || 'Not specified'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={onReject}
            className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 rounded-2xl hover:bg-red-200 transition-colors"
          >
            <X className="w-5 h-5" />
            Reject
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-2xl hover:bg-yellow-200 transition-colors"
          >
            <Edit className="w-5 h-5" />
            Edit
          </button>
          <button
            onClick={onApprove}
            className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-600 rounded-2xl hover:bg-green-200 transition-colors"
          >
            <Check className="w-5 h-5" />
            Approve
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Swipe left to reject, right to approve, up to edit
        </div>
      </div>
    </motion.div>
  );
}
