import React from 'react';
import classNames from 'classnames';
import { Link } from "gatsby";
import { Heading, LinkHandler } from 'src/sws-ui';

const AccordionWrapper = ({ heading, subheading, theme, linkText, linkUrl, row, children, faqsPage }) => {
	const classes = classNames(
		'accordion-wrapper',
		`accordion-wrapper--${theme}`,
		'col-center col-sm-center',
		row,
	);
	
	return (
		<React.Fragment>
			<div className={`accordion-wrapper--${theme} ${row} col-full col-sm-full`} />
			<div className={classes}>
				{(!faqsPage && (heading && subheading)) &&
					<Heading size="2">{heading}</Heading>
				}
				{children}
				{(linkText && linkUrl) &&
					<LinkHandler className="accordion__link" linkUrl={linkUrl} arrow={true}>{linkText}</LinkHandler>
				}
			</div>
		</React.Fragment>
	);
}

export default AccordionWrapper;