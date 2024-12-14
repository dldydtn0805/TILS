import { AccordionContext, useAccordionButton } from 'react-bootstrap';
import { useContext } from 'react';
import { Context } from 'vm';

interface ContextAwareToggleProps {
  children: React.ReactNode;
  eventKey: string;
  callback?: (eventKey: string) => void;
}

function ContextAwareToggle({
  children,
  eventKey,
  callback,
}: ContextAwareToggleProps) {
  const { activeEventKey } = useContext(AccordionContext);
  const COLOR1 = 'black';
  const COLOR2 = 'white';

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? COLOR1 : COLOR2 }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default ContextAwareToggle;
