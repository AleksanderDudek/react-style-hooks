import { useEffect, useState } from 'react';

// Define general type for useWindowResize hook
enum WindowSizes {
  'xSmall' = 540,
  'small' = 768,
  'medium' = 1050,
  'large' = 1336,
}

export type SizeObject = {
  isXSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
};

function determineSize(currentWindowWidth: number) {
  const determinedSizeObject: SizeObject = {
    isXSmall: false,
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isXLarge: false,
  };

  //is xlarge
  if (currentWindowWidth >= WindowSizes.large) {
    determinedSizeObject.isXLarge = true;
    return determinedSizeObject;
  }

  //is large
  if (
    currentWindowWidth < WindowSizes.large &&
    currentWindowWidth >= WindowSizes.medium
  ) {
    determinedSizeObject.isLarge = true;
    return determinedSizeObject;
  }

  //is medium
  if (
    currentWindowWidth < WindowSizes.medium &&
    currentWindowWidth >= WindowSizes.small
  ) {
    determinedSizeObject.isMedium = true;
    return determinedSizeObject;
  }

  //is small
  if (
    currentWindowWidth < WindowSizes.small &&
    currentWindowWidth >= WindowSizes.xSmall
  ) {
    determinedSizeObject.isSmall = true;
    return determinedSizeObject;
  }

  //is xSmall
  determinedSizeObject.isXSmall = true;
  return determinedSizeObject;
}

// Determine some block's size to have a feeling of what it should look like
export function determineBlockSize(currentBlockWidth: number): SizeObject {
  const determinedBlockSize = determineSize(currentBlockWidth);

  return determinedBlockSize;
}

// Determine some block's size to have a feeling of what it should look like
export function determineWindowSize(currentWindowWidth: number): SizeObject {
  const determinedWindowSize = determineSize(currentWindowWidth);

  return determinedWindowSize;
}

// Hook
export function useWindowResize(): SizeObject {
  const [sizeObject, setSizeObject] = useState<SizeObject>({
    isXSmall: false,
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isXLarge: false,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      const currentSizeObject = determineSize(window.innerWidth);
      setSizeObject(currentSizeObject);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return sizeObject;
}
