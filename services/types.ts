export interface IState {
  email: string;
  login?: string;
  password: string;
  avatar?: any;
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

export type ActionType = {
  type: string;
  payload: boolean;
};

export type LocationType = {
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type TabsParamList = {
  PostsScreen: undefined;
  CreatePost: undefined;
  Profile: undefined;
};

export type PostsStackParamList = {
  Posts: undefined;
  Comments: { postId: string; pictureURL: string };
  Map: { location: LocationType };
};

export interface IComment {
  userId: string;
  commentId?: string;
  login: string;
  author: string;
  content: string;
  posted: string;
}

export interface IPost {
  userId: string;
  postId?: string;
  img: string;
  title: string;
  location: string;
  mapLocation: LocationType | null;
  likes?: number;
  comments?: IComment[];
}
