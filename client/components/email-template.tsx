import { Alert } from '@prisma/client';
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<Alert>> = ({
  title,
  severity,
  service
}) => (
  <div>
    <h1>{title}</h1>
    <p>{severity}</p>
    <p>{service}</p>
  </div>
);
