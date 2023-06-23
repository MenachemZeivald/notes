import React from 'react';

function useToggle(initValue) {
	if (typeof initValue !== 'boolean' && typeof initValue !== 'function') {
		alert('useToggle must be passed a boolean value');
	}
	const [value, setValue] = React.useState(initValue);
	const toggleValue = () => setValue(!value);
	return [value, toggleValue];
}

export default useToggle;
