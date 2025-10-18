export interface NewComment {
  comment: string;
}

export interface CommentResponse {
  id: number;
  comment: string;
  author: string;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author?: string;
  created_at: string;
  comments: CommentResponse[];
}

export interface ModalProps {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
