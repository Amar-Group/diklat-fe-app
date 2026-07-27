"use client";

import { Modal, ModalHeader, ModalTitle, ModalBody, ModalClose } from "@/components/ui/modal";
import { Play } from "lucide-react";

// Placeholder YouTube video ID — ganti dengan video demo platform sebenarnya
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ";

interface DemoVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export function DemoVideoModal({ open, onClose }: DemoVideoModalProps) {
  return (
    <Modal open={open} onClose={onClose} className="max-w-3xl">
      <ModalHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
            <Play className="h-4 w-4 text-white fill-white" />
          </div>
          <ModalTitle className="text-lg font-display font-bold text-slate-800">
            Demo Platform Diklat
          </ModalTitle>
        </div>
        <ModalClose onClose={onClose} />
      </ModalHeader>
      <ModalBody className="p-0 sm:p-4">
        <div className="relative w-full overflow-hidden rounded-none sm:rounded-xl bg-black" style={{ paddingBottom: "56.25%" }}>
          {open && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Demo Platform Diklat Terintegrasi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
        <p className="text-xs text-slate-400 text-center mt-3 mb-1 px-4">
          Lihat bagaimana platform diklat terintegrasi dapat membantu perusahaan Anda mengelola pelatihan dengan lebih efisien.
        </p>
      </ModalBody>
    </Modal>
  );
}
