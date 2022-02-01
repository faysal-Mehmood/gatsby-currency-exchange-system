import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

const Button = ({ arrow, color = 'yellow', children, to }) => {
	const classes = classNames(
		'btn',
		'bold',
		`btn--${color}`,
		{
			'btn--arrow': arrow,
		}
	);

	return (
		<Link className={classes} to={to}>{children}</Link>
	);
}

export default Button;