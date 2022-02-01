import React from 'react';
import classNames from 'classnames';

const Heading = ({ size = 1, row, col, className, children }) => {
	const HeadingElement = `h${size}`;

	const classes = classNames(
		className,
		row,
		col,
	);

	return (
		<HeadingElement className={classes}>{children}</HeadingElement>
	);
}

export default Heading;