export interface IState {
  email: string;
  login: string;
  password: string;
}

export interface IPasswordSettings {
  isVisible: boolean;
  text: "Показать" | "Скрыть";
}

export interface IReducerState {
  email: boolean;
  login: boolean;
  password: boolean;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Comment: undefined;
};

export type TabsParamList = {
  PostsScreen: undefined;
  CreatePost: any;
  Profile: any;
  Login: undefined;
};

export type PostsStackParamList = {
  Posts: { login: string; email?: string; password: string };
  Comments: { postId: string };
  Map: { postId: string };
};

export interface IProps {
  id: string;
  img: any;
  title: string;
  comments: number;
  location: string;
  likes?: number;
}
