export type tButton = {
  id: string;
  name: string;
  type: string;
  value: string;
  variant?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};
