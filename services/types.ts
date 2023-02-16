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
