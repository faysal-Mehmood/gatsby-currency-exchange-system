import React from 'react';
import { Link } from 'gatsby'
import classNames from 'classnames';

const LinkHandler = ({ linkText, linkUrl, title, className, arrow = false, external, children }) => {
	const classes = classNames(
		'link',
		arrow && 'link--arrow',
		className
	);

	return (
		(external ? 
			<a className={classes} href={linkUrl} title={title} target="_blank" rel="noopener noreferrer">{linkText}{children}</a>
		:
			<Link className={classes} to={linkUrl} title={title}>{linkText}{children}</Link>
		)
	);
}

export default LinkHandler;