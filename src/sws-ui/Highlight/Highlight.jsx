import React from 'react';
import classNames from 'classnames';
import { Heading } from 'src/sws-ui';

const Highlight = ({ row, col, heading, className, children, align = 'flex', size = 2 }) => {
	let alignClasses;
	
	if (align === 'left') {
		alignClasses = 'col-1-5 col-md-center col-sm-center';
	}
	
	if (align === 'right') {
		alignClasses = 'col-8-12 col-md-center col-sm-center';
	}

	if (align === 'flex') {
		alignClasses = 'highlight--flex';
	}

	const classes = classNames(
		'highlight',
		alignClasses,
		className,
		row,
		col,
	);

	return (
		<article className={classes}>
			<Heading size={size}>{heading}</Heading>
			{children}
		</article>
	);
}

export default Highlight;