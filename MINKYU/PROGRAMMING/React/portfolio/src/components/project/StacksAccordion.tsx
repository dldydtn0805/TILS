import { Accordion, Card } from 'react-bootstrap';
import ContextAwareToggle from './ContextAwareToggle';
import { stackSetType } from '../../datas/Projects';
import '../../css/Project.css';
function StacksAccordion({ stackSet }: { stackSet: stackSetType[] }) {
  return (
    <Accordion className="stacks-accordion" alwaysOpen flush>
      {stackSet.map((set, index) => (
        <Card className="stack-card">
          <Card.Header>
            <ContextAwareToggle eventKey={index.toString()}>
              {set.name}
            </ContextAwareToggle>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                {set.stacks.map((stack) => (
                  <div>
                    <div className="stack-description">
                      <img src={stack.image} alt="" />
                      <p>
                        {stack.name} : {stack.description}
                      </p>
                    </div>
                    <div>
                      {stack.application.map((app) => (
                        <p>{app}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card.Header>
        </Card>
      ))}
    </Accordion>
  );
}

export default StacksAccordion;
