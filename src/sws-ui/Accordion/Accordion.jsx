import React, { useState } from 'react';
import classNames from 'classnames';
import { Heading } from "src/sws-ui";

const AccordionItem = ({ item, theme }) => {
	const [active, setActive] = useState(false);

	const handleClick = () => {
		setActive(!active);
	}

	const classes = classNames(
		"accordion__item",
		`accordion__item--${theme}`
	)

	return (
		<article className={classes}>
			<p className="accordion__item-heading" onClick={() => handleClick()}>{item.heading}</p>
			{active && item.content}
		</article>
	)
} 

const Accordion = ({ accordionItems, row, theme, heading }) => {
	const classes = classNames(
		"accordion",
		`accordion--${theme}`,
		'col-center col-sm-center',
		row
	);

	return (
		<section className={classes}>
			{heading && <Heading className="faq__heading" size="2">{heading}</Heading>}
			{accordionItems.map((item, index) => {
				return <AccordionItem key={index} item={item} theme={theme} />
			})}
		</section>
	);
}

export default Accordion;