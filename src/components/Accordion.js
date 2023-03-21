import React, { useState } from 'react';

function Accordion({ items }) {
  // strange HOOK syntax 
  /**
   * activeState = piece of state (1st term)
   * setActiveIndex = Function to change this piece of state (2nd term)
   * null = initial value for this piece of state 
   */
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(nextIndex);
    }
  }

  const renderedItems = items.map((item, index) => {
    const isExpanded = (index === expandedIndex) ? 'active' : '';

    // ` - backticks used for string templating preferred
    return (
      <React.Fragment key={item.title}>
        <div 
          className={`title ${isExpanded}`}
          onClick={() => handleClick(index)}
          >
          <i className="dropdown icon"></i>
          {item.title} 
        </div>
        <div className={`content ${isExpanded}`}>
          {isExpanded && <div>{item.content}</div>}
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">
    {renderedItems}
  </div>;
}

export default Accordion;