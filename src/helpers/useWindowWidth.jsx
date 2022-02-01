import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const isClient = typeof window === 'object';

  function getWidth() {
		return isClient ? window.innerWidth : undefined
	}

	const [windowWidth, setWindowWidth] = useState(getWidth);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function handleResize() {
			setWindowWidth(getWidth());
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);

	}, []);

	console.log('window width is: ' + windowWidth)
	return windowWidth;
}