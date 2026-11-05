import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Full-screen image lightbox. Pass `src` (image url) and `alt`.
 * Renders nothing when `src` is falsy. Call `onClose()` to dismiss.
 */
export default function Lightbox({ src, alt, onClose }) {
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Keep the latest onClose without re-running the focus/scroll-lock effect
  // every time the parent re-renders.
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!src) return;

    lastFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab") {
        // Focus trap: keep Tab inside the dialog.
        const focusable = dialogRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
    };
  }, [src]);

  // Render at the document root so no ancestor stacking context (transforms,
  // filters) can leave the fixed navbar painted on top of the dialog.
  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-4xl w-full flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span id="lightbox-title" className="sr-only">
              {alt || "Certificate image"}
            </span>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-12 right-0 md:top-2 md:-right-12 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition"
            >
              <X size={22} />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85dvh] w-auto h-auto object-contain rounded-lg border border-white/10 shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
