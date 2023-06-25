import React from 'react';

function useToggle(initValue) {
	if (typeof initValue !== 'boolean' && typeof initValue !== 'function') {
		// throw new Error('useToggle must be passed a boolean or function');
		console.error('useToggle must be passed a boolean or function');
	}
	const [value, setValue] = React.useState(initValue);
	const toggleValue = () => setValue(!value);
	return [value, toggleValue];
}

export default useToggle;
