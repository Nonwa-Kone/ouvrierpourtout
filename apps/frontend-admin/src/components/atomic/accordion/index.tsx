import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionBtn = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const AccordionContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  overflow: hidden;
`;

export const Accordion: React.FC<{
  children: React.ReactNode;
  label: string;
  opened?: boolean;
}> = ({ children, label, opened = false }) => {
  const [open, setOpen] = useState<boolean>(opened);

  return (
    <AccordionContainer>
      <AccordionBtn onClick={() => setOpen((s: boolean) => !s)}>
        <span>{label}</span>
        <ChevronDown
          style={{
            transition: 'all .3s',
            transform: `rotate(${open ? '180deg' : '0'})`,
          }}
        />
      </AccordionBtn>
      <AccordionContent
        style={{
          maxHeight: open ? 9999 : 0,
          transition: open
            ? 'all 0.5s cubic-bezier(1, 0, 1, 0)'
            : 'all 0.5s cubic-bezier(0, 1, 0, 1)',
          borderTopWidth: open ? 1 : 0,
        }}
      >
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};

export const AccordionCollapse: React.FC<{
  children: React.ReactNode;
  label: string;
  open: boolean;
  onOpen: () => void;
}> = ({ children, label, open, onOpen }) => {
  return (
    <AccordionContainer>
      <AccordionBtn onClick={onOpen}>
        <span>{label}</span>
        <ChevronDown
          style={{
            transition: 'all .3s',
            transform: `rotate(${open ? '180deg' : '0'})`,
          }}
        />
      </AccordionBtn>
      <AccordionContent
        style={{
          maxHeight: open ? 9999 : 0,
          transition: open
            ? 'all 0.5s cubic-bezier(1, 0, 1, 0)'
            : 'all 0.5s cubic-bezier(0, 1, 0, 1)',
          borderTopWidth: open ? 1 : 0,
        }}
      >
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};
