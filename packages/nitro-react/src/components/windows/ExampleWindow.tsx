import { FC, useState } from 'react';
import { DraggableWindow } from './DraggableWindow';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { TextField } from '../ui/TextField';
import { Panel } from '../ui/Panel';

export const ExampleWindow: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });

  if (!isOpen) {
    return null;
  }

  return (
    <DraggableWindow
      id="example-window"
      title="Example Window"
      onClose={() => setIsOpen(false)}
      defaultX={50}
      defaultY={50}
      defaultWidth={400}
      defaultHeight={500}
    >
      <div className="p-4 space-y-4">
        <Panel variant="default">
          <p className="text-sm">
            This is a draggable window that demonstrates the theme system. You can move and resize it!
          </p>
        </Panel>

        <Card variant="outlined">
          <CardHeader>Form Example</CardHeader>
          <CardBody className="space-y-3">
            <TextField
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
            />
          </CardBody>
          <CardFooter>
            <Button variant="secondary" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Submit</Button>
          </CardFooter>
        </Card>

        <div className="space-y-2">
          <h3 className="font-bold text-sm">Button Variants</h3>
          <div className="flex flex-col gap-2">
            <Button variant="primary" fullWidth>Primary Button</Button>
            <Button variant="secondary" fullWidth>Secondary Button</Button>
            <Button variant="destructive" fullWidth>Destructive Button</Button>
            <Button variant="outline" fullWidth>Outline Button</Button>
            <Button variant="ghost" fullWidth>Ghost Button</Button>
          </div>
        </div>

        <Panel variant="accent">
          <p className="text-xs">
            Your window position is automatically saved when you move or resize it!
          </p>
        </Panel>
      </div>
    </DraggableWindow>
  );
};
