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

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home:
    | {
        screen: string;
        params: { login?: string; email: string; password: string };
      }
    | undefined;
};

export type TabsParamList = {
  PostsScreen: { login?: string; email: string; password: string } | undefined;
  CreatePost: any;
  Profile: any;
  Login: undefined;
};

export type PostsStackParamList = {
  Posts: { login: string; email?: string; password: string };
  Comments: { postId: string };
  Map: { postId: string };
};

export type LocationType = {
  latitude: number;
  longitude: number;
};

export interface IProps {
  id: string;
  img: { uri: string };
  title: string;
  comments?: number;
  location: string;
  likes?: number;
  mapLocation?: LocationType | null;
}
