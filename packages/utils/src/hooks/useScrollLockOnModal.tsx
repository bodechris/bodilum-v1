import { useEffect, useRef } from 'react';

interface UseScrollLockOnModalOptions {
  isOpen: boolean;
  parentId?: string;
}
function useScrollLockOnModal(
  isOpen: UseScrollLockOnModalOptions['isOpen'],
  parentId: UseScrollLockOnModalOptions['parentId'] = 'app-root'
): void {
  const scrollPosRef = useRef<number>(0);

  useEffect(() => {
    const scrollParent = document.getElementById(parentId);
    if (!scrollParent) return;

    if (isOpen) {
      // Save current scroll position
      scrollPosRef.current = scrollParent.scrollTop;
      // Lock scroll
      scrollParent.style.overflow = 'hidden';
      // Maintain scroll position visually
      scrollParent.scrollTop = scrollPosRef.current;
    } else {
      // Unlock scroll
      scrollParent.style.overflow = '';
      // Restore scroll position
      scrollParent.scrollTop = scrollPosRef.current;
    }

    // Clean up if unmounting
    return () => {
      scrollParent.style.overflow = '';
    };
  }, [isOpen, parentId]);
}

export default useScrollLockOnModal;
