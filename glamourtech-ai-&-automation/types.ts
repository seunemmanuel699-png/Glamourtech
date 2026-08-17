// Added React import to provide access to the React namespace for type definitions like ReactNode
import React from 'react';

export interface ServiceCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export interface Solution {
  id: string;
  title: string;
  problem: string;
  implementation: string;
  outcome: string;
  idealClient: string;
}

export interface Industry {
  name: string;
  description: string;
  image: string;
}
